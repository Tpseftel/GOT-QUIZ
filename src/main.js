// http://proto.io/en/jobs/candidate-questions/quiz.json
// http://proto.io/en/jobs/candidate-questions/result.json
// TODO: Use Local Storage for current question, score  and more
const url_quiz = 'http://proto.io/en/jobs/candidate-questions/quiz.json' ;
const url_results = 'http://proto.io/en/jobs/candidate-questions/result.json' ;

let quiz = {};
let result_messages = {};
let current_index;
let questions = [];
let user_points ; 

/**
 * Initialize the main quiz interface
 */
async function initializeUI() {
    let quiz_data;
    user_points = {
        "wrong_qsts": [],
        "right_qsts": [],
        "points": 0
    };
    current_index = 0;
    try {
        if (!quiz_data){
            quiz_data = await getData();
        }
        quiz = quiz_data[0];
        result_messages = quiz_data[1];
        questions = quiz.questions;
        renderMainUI(quiz.title, quiz.description, current_index);
        renderQuestion(current_index);
        displayQuestions(true);
        document.getElementById("main-container").style.display = "block";
    } catch (error) {
        console.log(`Error:${error.message}`);
    }
}
/**
 * Retrieves Data from Remote API
 * @returns {object}
 */
async function getData() {
    let data_p = [];
    const quiz_promise = getDataAjax(url_quiz);
    const quiz_results = getDataAjax(url_results);
    try {
     let raw_data = await Promise.all([quiz_promise, quiz_results]);
     raw_data.forEach(data => {
         data_p.push(JSON.parse(data));
     });
     return data_p;
    } catch (error) {
        console.log(error.message);
    }
}

function getDataAjax(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

/**
 * Handles next button
 */
function nextQuestion() {
    let current_question = questions[current_index];
    console.log(`Current question index:${current_index}`);
    // Get user selected answer
    let user_answer = getAnswer(questions[current_index]);
    // Check if user have selected any answer
    if(typeof user_answer == "object"){
        if(user_answer.length < 1) {
            alert("Select Answers....");
            return;
        }
    }
    if(!user_answer) {
        alert("Select an Answer....");
        return;
    }
    let delay;
    const isCorrect = validateAnswer(questions[current_index], user_answer);
    console.log(`Is Correct:${isCorrect}`);
    if(isCorrect) {
        user_points.points += questions[current_index].points;
        user_points.right_qsts.push(questions[current_index].q_id);
        delay = 3000;
        console.log(`User Points:${user_points.points}`);
        displaySuccessMessage();
    }else {
        user_points.wrong_qsts.push(questions[current_index].q_id);
        console.log(`User Points:${user_points.points}`);
        highlightCorrect(questions[current_index].correct_answer);
        delay = 1500;
        displayFailureMessage();
    }
    if (current_index < questions.length - 1) {
        // This is not the last question
        current_index++;
        setTimeout(function(){ renderQuestion(current_index); }, delay);
    }else {
        //Last Question
        setTimeout(function(){displayResults(questions, user_points.points);}, delay);
   }
}

/**
 * 
 * @param {Object} questions 
 * @param {Number} user_points 
 */
async function displayResults(questions, user_points) {
    displayQuestions(false);
    const user_percent = calculateUserResult(questions, user_points);
    console.log(`Result Percent ${user_percent}`);
    let result_message = getResultMessage(user_percent);
    renderResults("result-infos", result_message, user_percent);
    console.log(`Use points: ${user_points}`);
}

/** 
 * @param {Number} quiz_id
 * @param {Number} percent_result 
 * @returns {Object}
 */
function getResultMessage(user_result) { 
    let messages = result_messages.results;
    let message_p ;
    console.log(`Messages:${messages}`);
    console.log(`User Results:${user_result}`);
    
    messages.forEach(message => {
        if(user_result >= message.minpoints && user_result <=message.maxpoints) {
            message_p = message;
        }
    });
    console.log(`message_p:${message_p}`);
    return message_p;
}
/**
 * 
 * @param {Object} question Question object
 * @param {String} answer_id  The id of the user's answer
 * @returns {Boolean}
 */
function validateAnswer(question, answer_id){
    let isCorrect = false;
        if (question.question_type == "mutiplechoice-single") {
            if (answer_id == question.correct_answer) isCorrect = true;
        }
        else if(question.question_type == "mutiplechoice-multiple") {
            if(areArraysEqualSets(answer_id, question.correct_answer)) isCorrect = true;
        }else { //Case truefalse 
            if (answer_id.localeCompare(question.correct_answer) == 0) isCorrect = true;
        } 
    return isCorrect;

    function areArraysEqualSets(a1, a2) {
        a1 =  a1.map(String);
        a2 = a2.map(String);
        let superSet = {};
        for (let i = 0; i < a1.length; i++) {
          const e = a1[i] + typeof a1[i];
          superSet[e] = 1;
        }
        for (let i = 0; i < a2.length; i++) {
          const e = a2[i] + typeof a2[i];
          if (!superSet[e]) {
            return false;
          }
          superSet[e] = 2;
        }
        for (let e in superSet) {
          if (superSet[e] === 1) {
            return false;
          }
        }
        return true;
    }
}

/**
 * 
 * @param {Object} question 
 * returns {String}
 */
function getAnswer(question) {
    let type =  question.question_type;
    if(type === "mutiplechoice-single") {
        const ele = document.getElementsByName(type); 
        for(i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
            return ele[i].getAttribute("value");
        } 
    }else if(type === "mutiplechoice-multiple") {
        let selected = [];
        const ele = document.getElementsByName(type); 
        for(i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
            selected.push(ele[i].getAttribute("value"));
        }
        return selected; 
    }else { 
        const ele = document.getElementsByName(type); 
        for(i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
            return ele[i].getAttribute("value");
        } 
    }
}

/**
 * 
 * @param {Object} questions 
 * @param {Number} user_points 
 * @return {Number}  
 */
function calculateUserResult(questions, user_points) {
    console.log(`Calcualte result user points${user_points}`);
    if(user_points == 0) return 0;
    let all_points = 0 ;
    questions.forEach(question => {
        all_points += question.points;
    });
    let percent_points = (100 / all_points) * user_points;   

    return percent_points;
 }

 function restartQuiz(){
    initializeUI();
 }

 window.onload = initializeUI;