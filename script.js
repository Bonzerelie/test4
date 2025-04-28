const notes = ['c3', 'cs3', 'd3', 'ds3', 'e3', 'f3', 'fs3', 'g3', 'gs3', 'a3', 'as3', 'b3',
               'c4', 'cs4', 'd4', 'ds4', 'e4', 'f4', 'fs4', 'g4', 'gs4', 'a4', 'as4', 'b4',
               'c5', 'cs5', 'd5', 'ds5', 'e5', 'f5', 'fs5', 'g5', 'gs5', 'a5', 'as5', 'b5',
               'c6'];

let correctCount = 0;
let incorrectCount = 0;
let totalCount = 0;

let currentNote = '';
let currentAnswer = '';

const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const referenceButton = document.getElementById('referenceButton');
const noteButtons = document.querySelectorAll('.noteButton');
const feedback = document.getElementById('feedback');
const correctCountElement = document.getElementById('correctCount');
const incorrectCountElement = document.getElementById('incorrectCount');
const totalCountElement = document.getElementById('totalCount');
const accuracyElement = document.getElementById('accuracy');

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);
referenceButton.addEventListener('click', playReference);

noteButtons.forEach(button => {
    button.addEventListener('click', () => checkAnswer(button));
});

function startGame() {
    totalCount = 0;
    correctCount = 0;
    incorrectCount = 0;
    updateStats();
    nextQuestion();
    startButton.disabled = true;
    nextButton.disabled = false;
}

function nextQuestion() {
    totalCount++;
    currentNote = getRandomNote();
    playNoteAudio(currentNote);
    currentAnswer = getNoteName(currentNote);
    feedback.textContent = ''; // Clear previous feedback
    updateStats();
}

function getRandomNote() {
    const randomIndex = Math.floor(Math.random() * notes.length);
    return notes[randomIndex];
}

function playNoteAudio(note) {
    const audio = new Audio(`audio/${note}.mp3`);
    audio.play();
}

function getNoteName(note) {
    const noteMapping = {
        'c': 'C', 'cs': 'C#/Db', 'd': 'D', 'ds': 'D#/Eb', 'e': 'E', 'f': 'F',
        'fs': 'F#/Gb', 'g': 'G', 'gs': 'G#/Ab', 'a': 'A', 'as': 'A#/Bb', 'b': 'B'
    };
    const noteName = note.slice(0, -1); // Remove the octave number
    return noteMapping[noteName];
}

function checkAnswer(button) {
    if (button.textContent === currentAnswer) {
        correctCount++;
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
    } else {
        incorrectCount++;
        feedback.textContent = `Incorrect! It was ${currentAnswer}.`;
        feedback.className = 'feedback incorrect';
    }
    updateStats();
    nextButton.disabled = false;
    disableButtons();
}

function disableButtons() {
    noteButtons.forEach(button => {
        button.disabled = true;
    });
}

function enableButtons() {
    noteButtons.forEach(button => {
        button.disabled = false;
    });
}

function playReference() {
    const referenceAudio = new Audio('audio/c4.mp3');
    referenceAudio.play();
}

function updateStats() {
    correctCountElement.textContent = correctCount;
    incorrectCountElement.textContent = incorrectCount;
    totalCountElement.textContent = totalCount;
    accuracyElement.textContent = totalCount === 0 ? '0%' : ((correctCount / totalCount) * 100).toFixed(2) + '%';
}
