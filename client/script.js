import { questions } from '../UtilFiles/quizQuestions.js';
import { validatePlayerName } from '../UtilFiles/validatePlayerName.js';
import { saveScoreToDb, fetchHighScores } from '../server/dbase.js'; // Assuming fetchHighScores is in the same file

// DOM elements
let currentQuestion = 0;
let score = 0;
let currentPlayerName = ''; 
const currentDate = new Date(); // Initialize the current date for score saving

function startQuiz() {
    const playerName = document.getElementById('player-name').value.trim();

    try {
        validatePlayerName(playerName);
        currentPlayerName = playerName; 

        document.getElementById('name-prompt').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');

        loadQuestion();
        displayGreeting();
        setupNextButton();
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

function setupNextButton() {
    document.getElementById('next-btn').addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            endQuiz();
        } else {
            loadQuestion();
            document.getElementById('next-btn').classList.add('hidden');
        }
    });
}

function displayGreeting() {
    const quizContainer = document.getElementById('quiz-container');
    const myName = document.getElementById('myName');

    myName.textContent = `Hello, ${currentPlayerName}!`;
    myName.style.marginBottom = '30px';
    myName.style.marginTop = '-5px';
    myName.style.color = 'green';
    quizContainer.insertBefore(myName, quizContainer.firstChild);
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    for (let i = 0; i < question.options.length; i++) {
        const button = document.createElement('button');
        button.textContent = question.options[i];
        button.className = 'option-btn';
        button.onclick = () => checkAnswer(i);
        optionsContainer.appendChild(button);
    }

    document.getElementById('next-btn').classList.add('hidden');
}

function checkAnswer(selectedOption) {
    const correct = questions[currentQuestion].correct;
    if (selectedOption === correct) {
        score++;
    }
    document.getElementById('next-btn').classList.remove('hidden');
}

function endQuiz() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('hidden');

    const percentage = (score / questions.length) * 100;
    document.getElementById('result-text').textContent = `${currentPlayerName}, you scored ${score} out of ${questions.length} (${percentage.toFixed(2)}%)`;

    // Save score to the database
    saveScoreToDb(currentPlayerName, score, questions.length, currentDate); // Pass the current date

    displayHighScores();
}

function displayHighScores() {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '<h3>High Scores</h3>';

    // Fetch high scores from the database here
    fetchHighScores().then(highScores => {
        highScores.forEach((scoreData, index) => {
            const scoreElement = document.createElement('div');
            scoreElement.className = 'score-item';
            const date = new Date(scoreData.date).toLocaleDateString();
            scoreElement.textContent = `${index + 1}. ${scoreData.name} - ${scoreData.score} points (${date})`;
            scoresList.appendChild(scoreElement);
        });
    }).catch(error => {
        console.error('Error fetching high scores:', error);
    });
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById('name-prompt').classList.remove('hidden');
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('player-name').value = '';
}

function init() {
    document.getElementById('start-btn').addEventListener('click', startQuiz);
    document.getElementById('restart-btn').addEventListener('click', resetQuiz);
}

document.addEventListener('DOMContentLoaded', init);
