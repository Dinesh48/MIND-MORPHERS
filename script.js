let currentQuestionIndex = 0;
let userName = '';
let userAnswers = new Array(10).fill(null);

const questions = [
    { question: 'Who is the ghost?', options: ['Leo', 'Rolex', 'Vikram', 'Santhanam', 'Dilli'], correctAnswer: 2 },
    { question: 'When leo flashback has been happened??', options: ['1995', '1999', '1997', '1994', '1996'], correctAnswer: 1 },
    { question: 'How many kilograms of cocaine has been seized while the trichy drug bust?', options: ['500kgs', '400kgs', '700kgs', '400kgs', '900kgs'], correctAnswer: 4 },
    { question: 'When vikram became commander to the black squad?', options: ['1987', '1986', '1985', '1989', '1983'], correctAnswer: 0 },
    { question: 'Which gun dilli used to attack gang', options: ['M249', 'Gatling', 'M134', 'Kord', 'M60',], correctAnswer: 2 },
    { question: 'How many years rolex spent to build his syndicate', options: ['26 years', '24 years', '28 years', '27 years', '25 years'], correctAnswer: 3 },
    { question: 'Who created "Datura" drug?', options: ['Rolex', 'Antony', 'Santhanam', 'Harold', 'Leo'], correctAnswer: 3 },
    { question: 'What is the name of parthiban"s"cafe?', options: ['Wild Cafee', 'Wild Tea', 'Wild Beans', 'Wild Coffee', 'Wild Cafe'], correctAnswer: 2 },
    { question: 'Which substances supplid by santhanam & his gang ', options: ['Erythroxima', 'Rohypnol', 'Datura', 'Erythroxylam', 'Cocaine'], correctAnswer: 3 },
    { question: 'Who is the most powerful character in LCU?', options: ['Amar', 'Rolex', 'Vikram', 'Leo', 'Dilli'], correctAnswer: 3 }
];

function startQuiz() {
    userName = document.getElementById('username').value.trim();
    if (!userName) {
        alert('Please enter your name');
        return;
    }
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('quizPage').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    const questionContainer = document.getElementById('questionContainer');

    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map((option, index) => `
            <label>
                <input type="radio" name="answer" value="${index}" ${userAnswers[currentQuestionIndex] === index ? "checked" : ""} onclick="saveAnswer(${index})">
                ${option}
            </label>
        `).join('')}
    `;

    document.getElementById('prevBtn').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('finishBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

function saveAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function finishQuiz() {
    const allAnswered = userAnswers.every(answer => answer !== null);
    if (!allAnswered) {
        alert('Please answer all the questions before finishing.');
        return;
    }

    const score = userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;

    let imageSrc = '';
    if (score === 10) imageSrc = 'images/Leo.png';
    else if (score >= 8) imageSrc = 'images/Rolex.png';
    else if (score >= 6) imageSrc = 'images/Vikram.png';
    else if (score >= 4) imageSrc = 'images/Dilli.png';
    else if (score >= 2) imageSrc = 'images/Amar.png';
    else imageSrc = 'images/Daniel.png';

    document.getElementById('quizPage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'block';
    document.getElementById('resultMessage').innerText = `Quiz Finished, ${userName}!`;
    document.getElementById('userScore').innerText = score;
    document.getElementById('resultImage').src = imageSrc;
}
