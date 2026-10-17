/*
=====================================================
QUESTION BANK
=====================================================

ADD NEW QUESTIONS HERE.

Example:

{
    question: "What is a blueprint for creating objects?",
    answers: [
        "class"
    ]
},

If there are multiple acceptable answers:

{
    question: "What is another name for an attribute?",
    answers: [
        "field",
        "variable"
    ]
}

=====================================================
*/

const questionBank = [

    {
        question:
            "It is interest on activities which are pleasurable in effect; mirth.",
        answers: [
            "Amusement"
        ]
    },

     {
        question:
            "In Europe this is interpreted to mean track and field. It is a sport that requires physical ability/skills to accomplish.",
        answers: [
            "Athsletic"
        ]
    },

    {
        question:
            "this consists of a contest between two individuals of group of individuals played in accordance to a set of rule/s.",
        answers: [
            "Game/s"
        ]
    },

     {
        question:
            "It is an occupational activity which is agreeable to the individual indulging in it.",
        answers: [
            "Pastime"
        ]
    },

     {
        question:
            "An individual performs an activity lightly and quickly and with no end in view except the pleasure one gets in the activity.",
        answers: [
            "Play"
        ]
    },

    {
        question:
            "An activity one indulges in to divert his mind from his daily toil.",
        answers: [
            "Recreation"
        ]
    },

    {
        question:
            "it is athletics, diversion or pastime done outdoor (indoor)",
        answers: [
            "Sport/s"
        ]
    },

    {
        question:
            "Sports which is done by only one person. Examples: archery, athletics (track and field) except relays, bowling, bicycling, gymnastics",
        answers: [
            "Individual or self-testing sports"
        ]
    },

     {
        question:
            "Sports or events which are done by two persons. Examples: lawn tennis, badminton, table tennis",
        answers: [
            "Dual sports"
        ]
    },

    {
        question:
            "A sport that involves competition between teams of players. Examples: basketball, volleyball.",
        answers: [
            "Team sports"
        ]
    },

    {
        question:
            "Is a competitive contact sport where two combatants fight against each other using certain rules of engagement, typically with the aimof simulating partsofrea hand-to-hand combat.",
        answers: [
            "Combative sports"
        ]
    },

    {
        question:
            "the inventor of the sport, country of origin and development of the game.",
        answers: [
            "History"
        ]
    },

    
    {
        question:
            "where the games are played （indoor,outdoor,or both),size,differentdesigns for male or female,and the safety procedures for the players.",
        answers: [
            "Court dimensions/venue"
        ]
    },

    {
        question:
            "proper protective gears,uniforms and the outfits which also involve safetyofplayers and the officials.",
        answers: [
            "Equipment and Gear"
        ]
    },

    {
        question:
            "technical skill are the basics of playing the games,while tacticaskills are the strategies to take advantage during the game.",
        answers: [
            "Technical and Tactical Skills"
        ]
    },

    {
        question:
            "set of rules on how the game is played,violations,penalties, how to scorepoints, how many players are allowed.",
        answers: [
            "Rules of the Game"
        ]
    },

    {
        question:
            "officials of the game, their duties and responsibilities of calling for violationspenalties,points and regulating fair play.",
        answers: [
            "Officiating"
        ]
    },
    
]
/* ==============================
   QUIZ VARIABLES
============================== */

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


/* ==============================
   NORMALIZE ANSWER
============================== */

function normalizeAnswer(answer) {
    return answer
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}


/* ==============================
   SHUFFLE
============================== */

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}


/* ==============================
   START QUIZ
============================== */

function startQuiz() {

    questions = shuffle(questionBank);

    currentQuestion = 0;
    score = 0;
    answered = false;

    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";

    showQuestion();
}


/* ==============================
   SHOW QUESTION
============================== */

function showQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("progressBar").style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    const input = document.getElementById("answerInput");

    input.value = "";
    input.disabled = false;

    document.getElementById("checkButton").style.display =
        "inline-block";

    document.getElementById("nextButton").style.display =
        "none";

    const feedback = document.getElementById("feedback");

    feedback.className = "feedback";
    feedback.style.display = "none";
    feedback.innerHTML = "";

    answered = false;

    input.focus();
}


/* ==============================
   CHECK ANSWER
============================== */

function checkAnswer() {

    if (answered) {
        return;
    }

    const input = document.getElementById("answerInput");

    const userAnswer = normalizeAnswer(input.value);

    if (userAnswer === "") {
        alert("Please type your answer first.");
        input.focus();
        return;
    }

    const question = questions[currentQuestion];

    const isCorrect = question.answers.some(
        answer => normalizeAnswer(answer) === userAnswer
    );

    const feedback = document.getElementById("feedback");

    if (isCorrect) {

        score++;

        feedback.className = "feedback correct";

        feedback.innerHTML =
            `<strong>Correct!</strong><br>
             Your answer: ${input.value}`;

    } else {

        feedback.className = "feedback wrong";

        feedback.innerHTML =
            `<strong>Incorrect.</strong><br>
             Correct answer:
             <strong>${question.answers[0]}</strong>`;
    }

    feedback.style.display = "block";

    input.disabled = true;

    document.getElementById("checkButton").style.display =
        "none";

    document.getElementById("nextButton").style.display =
        "inline-block";

    answered = true;
}


/* ==============================
   NEXT QUESTION
============================== */

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


/* ==============================
   SHOW RESULT
============================== */

function showResult() {

    document.getElementById("quiz").style.display = "none";

    document.getElementById("result").style.display = "block";

    document.getElementById("score").textContent =
        `${score} / ${questions.length}`;

    const percentage =
        (score / questions.length) * 100;

    let message;

    if (percentage === 100) {

        message =
            "Perfect! You got everything correct.";

    } else if (percentage >= 80) {

        message =
            "Great job! Review the questions you missed.";

    } else if (percentage >= 60) {

        message =
            "Good effort. Keep reviewing the lesson.";

    } else {

        message =
            "Keep practicing and try the quiz again.";
    }

    document.getElementById("resultMessage").textContent =
        message;
}


/* ==============================
   ENTER KEY
============================== */

document.getElementById("answerInput").addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            if (!answered) {
                checkAnswer();
            } else {
                nextQuestion();
            }
        }
    }
);


/* ==============================
   START
============================== */

startQuiz();
