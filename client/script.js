import { questions } from '../UtilFiles/quizQuestions.js';
import { validatePlayerName } from '../UtilFiles/validatePlayerName.js';
import { saveScoreToDb } from '../server/scores.js'; 
import {fetchHighScores} from '../server/server.js'; 

// Quiz variables
let currentQuestion = 0;
let score = 0;
let currentPlayerName = ''; 
const currentDate = new Date();

function startQuiz() {
    const playerName = document.getElementById('player-name').value.trim();

    console.log('Start button clicked'); 

    if (!playerName) {
        alert('Please enter a username before starting the quiz.');
        return; 
    }

    try {
        validatePlayerName(playerName);
        currentPlayerName = playerName;

        document.getElementById('name-prompt').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');

        loadQuestion();
        displayGreeting();
        setupNextButton();
    } catch (error) {
        alert(error.message);
    }
}

// Load each question
function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-btn';
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    document.getElementById('next-btn').classList.add('hidden');
}

function displayGreeting() {
    document.getElementById('myName').textContent = `Hello, ${currentPlayerName}!`;
}

function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestion].correct) {
        score++;
    }
    document.getElementById('next-btn').classList.remove('hidden');
}

async function endQuiz() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('hidden');
    document.getElementById('result-text').textContent = `${currentPlayerName}, you scored ${score} out of ${questions.length}`;

    await saveScoreToDb(currentPlayerName, score, questions.length, currentDate); // Await the score saving
    displayHighScores();
}

// Display high scores
async function displayHighScores() {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '<h3>High Scores</h3>';

    try {
        const highScores = await fetchHighScores();
        highScores.forEach((scoreData, index) => {
            const scoreElement = document.createElement('div');
            scoreElement.className = 'score-item';
            scoreElement.textContent = `${index + 1}. ${scoreData.name} - ${scoreData.score} points (${new Date(scoreData.date).toLocaleDateString()})`;
            scoresList.appendChild(scoreElement);
        });
    } catch (error) {
        console.error('Error fetching high scores:', error);
        alert('Failed to load high scores. Please try again later.'); // Notify user on error
    }
}

// Initialize event listeners
function init() {
    document.getElementById('start-btn').addEventListener('click', startQuiz);
    document.getElementById('restart-btn').addEventListener('click', resetQuiz);
}

// Reset quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('name-prompt').classList.remove('hidden');
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('player-name').value = '';
}

document.addEventListener('DOMContentLoaded', init);
