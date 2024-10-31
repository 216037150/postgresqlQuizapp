import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
    user: 'siyabonga',   
    host: 'localhost',     
    database: 'quiz_app_db', 
    password: 'Siya@100', 
    port: 5432,
});

async function connectDb() {
    await db.connect();
}

async function closeDb() {
    await db.end();
}

async function saveScoreToDb(name, score, totalQuestions) {
    try {
        await connectDb();
        const percent = (score / totalQuestions) * 100; 

        const currentDate = new Date().toISOString().split('T')[0]; 

        const query = `
            INSERT INTO Players (Name, score, percent, date) 
            VALUES ($1, $2, $3, $4)
        `;
        await db.query(query, [name, score, percent, currentDate]); 

        console.log('Score saved successfully!');
    } catch (err) {
        console.error('Error saving score to database:', err.stack);
    } finally {
        await closeDb();
    }
}

export { saveScoreToDb };
