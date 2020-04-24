// http://proto.io/en/jobs/candidate-questions/quiz.json
// http://proto.io/en/jobs/candidate-questions/result.json
// TODO: Use Local Storage for current question, score  and more
const url_quiz = 'http://proto.io/en/jobs/candidate-questions/quiz.json' ;
const url_results = 'http://proto.io/en/jobs/candidate-questions/result.json' ;
let quiz = {};
let result_messages = {};
let current_index = 0;
let questions = [];
let answers = [];  
let user_result = {
    "wrong_qsts": [],
    "right_qsts": [],
    "points": 0
};

async function initializeUI() {

    try {
        let quiz_data = await initializeCurrentQuiz();
        quiz = quiz_data[0];
        result_messages = quiz_data[1];
        questions = quiz.questions;
        renderMainUI(quiz.title, quiz.description, current_index);
        displayResults();
    } catch (error) {
        console.log(`Error:${error.message}`);
    }
}
async function initializeCurrentQuiz() {
    let data_p = [];
    const quiz_promise = getData(url_quiz);
    const quiz_results = getData(url_results);

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


function getData(url) {
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

function nextQuestion() {
    console.log(`current question index:${current_index}`);
    // Get user selected answer
    let user_answer = getAnswer(questions[current_index]);
    console.log(`Selected answer: ${user_answer}`);
    // Save user answer
    answers.push(
        {
            "q_id": questions[current_index].q_id,
            "a_id": user_answer
        }
    );
    validateAnswer(questions[current_index], user_answer);
    // Check if  it is the  last question
    if (current_index < questions.length - 1) {
        current_index++;
        renderQuestion(current_index); 
    }else {
        displayResults();
   }
}

async function displayResults() {
    // TODO: Implementaion
    displayQuestions(false);
    const result_percent = calculateUserResult(questions, user_result.points);
    console.log(`Result Percent ${result_percent}`);
    let result_message = getResultMessage(result_percent);
    console.log(user_result);
    console.log("Your results:\n");
    console.log(result_message);
}

/**
 * @param {Number} quiz_id
 * @param {Number} percent_result 
 * @returns {String}
 */
function getResultMessage(user_result, quiz_id=12) { 
    let messages = result_messages.results;
    messages.forEach(message => {
        if(user_result >= message.minpoints && user_result <=message.maxpoints) {
            console.log(`Message: ${message.title}`);
            message_p = message.title;
        }
        console.log(message_p);
       
    });
    return message_p;
}
/**
 * 
 * @param {Object} question Question object
 * @param {*} answer_id  The id of the user's answer
 */
function validateAnswer(question, answer_id){
        if (question.question_type == "mutiplechoice-single") {
            if (answer_id == question.correct_answer) {
                // Correct  Answer
                user_result.points += question.points;
                user_result.right_qsts.push(question.q_id);
            } else {
                // Wrong Answer
                user_result.wrong_qsts.push(question.q_id);
                highlightCorrect(question.correct_answer);
            }
        }
        else if(question.question_type == "mutiplechoice-multiple") {
            if(areArraysEqualSets(answer_id, question.correct_answer)) {
                // Correct  Answer
                user_result.points += question.points;
                user_result.right_qsts.push(question.q_id);
            } else {
                // Wrong Answer
                user_result.wrong_qsts.push(question.q_id);
                highlightCorrect(question.correct_answer);
            }
        }else { 
            if (answer_id.localeCompare(question.correct_answer) == 0) {
                user_result.points += question.points;
                user_result.right_qsts.push(question.q_id);
            }else {
                user_result.wrong_qsts.push(question.q_id);
                highlightCorrect(question.correct_answer);
            }                
        } 
    return user_result;

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
 * @param {JSON} questions 
 * @param {Number} user_points 
 * @return {Number}  
 */
function calculateUserResult(questions, user_points) {
    if(user_points == 0) return 0;

    let all_points = 0 ;
    questions.forEach(question => {
        all_points += question.points;
    });
    let percent_points = (100 / all_points) * user_points;   

    return percent_points;
 }

 window.onload = initializeUI;