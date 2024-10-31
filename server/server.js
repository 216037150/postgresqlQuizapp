import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 

dotenv.config();

const { Client } = pkg;

const client = new Client({
    user: process.env.DB_USER || 'Siyabonga',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'quiz_app_db',
    password: process.env.DB_PASSWORD || 'Siya@100',
    port: process.env.DB_PORT || 5432
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function connectDb() {
    try {
        await client.connect();
        console.log('Connected to the quiz_app database');
    } catch (error) {
        console.error('Error connecting to the database:', error.stack);
        process.exit(1);
    }
}
connectDb();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../client')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.use('/UtilFiles', express.static(path.join(__dirname, '../UtilFiles')));
app.use(express.json());

async function saveScoreToDb(name, score, totalQuestions, currentDate) {
    const percent = (score / totalQuestions) * 100;
    const query = `
        INSERT INTO quiz_score (name, score, percent, date)
        VALUES ($1, $2, $3, $4)
    `;

    await client.query(query, [name, score, percent, currentDate]);
    console.log('Score saved successfully!');
}

async function fetchHighScores() {
    try {
        const result = await client.query('SELECT * FROM quiz_score ORDER BY score DESC LIMIT 10');
        return result.rows;
    } catch (error) {
        console.error('Error fetching high scores:', error);
        throw new Error('Failed to fetch high scores');
    }
}

app.post('/save-score', async (req, res) => {
    const { name, score, totalQuestions } = req.body;
    if (!name || !score || !totalQuestions) {
        return res.status(400).json({ error: 'Name, score, and totalQuestions are required' });
    }

    const currentDate = new Date().toISOString().split('T')[0];

    try {
        await saveScoreToDb(name, score, totalQuestions, currentDate);
        res.status(201).json({ message: 'Score saved successfully!' });
    } catch (error) {
        console.error('Error saving score to database:', error);
        res.status(500).json({ error: 'Failed to save score', details: error.message });
    }
});

app.get('/high-scores', async (req, res) => {
    try {
        const highScores = await fetchHighScores();
        res.json(highScores);
    } catch (error) {
        console.error('Error fetching high scores:', error);
        res.status(500).send('Error fetching high scores');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { saveScoreToDb, fetchHighScores };
