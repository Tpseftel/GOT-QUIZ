// http://proto.io/en/jobs/candidate-questions/quiz.json
// http://proto.io/en/jobs/candidate-questions/result.json
// TODO: Use Local Storage for current question, score  and more
const quizUrl = 'http://proto.io/en/jobs/candidate-questions/quiz.json' ;
const resultsUrl = 'http://proto.io/en/jobs/candidate-questions/result.json' ;
let quiz = {};
let current_quest = -1;
let questions = [];
let answers = [];  
let points = 0;
let results = {
    "wrong_qsts": [],
    "right_qsts": [],
    "points": 0
};

async function initializeUI() {
    try {
        data = await getData(quizUrl);
        let quiz = JSON.parse(data);
        questions = quiz.questions;
        renderMainUI(quiz.title, quiz.description);
        nextQuestion();    
    } catch (error) {
        console.log(`Error:${error.message}`);
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
    if(current_quest != -1) {
        // Get user Answer
        let ans = getAnswer(questions[current_quest]);
        console.log(`Selected answer: ${ans}`);
        answers.push(
            {
                "q_id": questions[current_quest].q_id,
                "a_id": ans
            }
        );
        validateAnswer(questions[current_quest], ans);
    }
    current_quest++;
    console.log(`current question index:${current_quest}`);
    // Check if  it is the  last question
   if (current_quest < questions.length) renderQuestions(current_quest); 
   else {
       let result = evaluateAnswers();
       console.log("Your results:\n");
       console.log(result);
       current_quest = -1;
       window.alert("Lets see your results");
   }
    
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
                results.points += question.points;
                results.right_qsts.push(question.q_id);
            } else {
                // Wrong Answer
                results.wrong_qsts.push(question.q_id);
                highlightCorrect(question.correct_answer);
            }
        }
        else if(question.question_type == "mutiplechoice-multiple") {
            if(areArraysEqualSets(answer_id, question.correct_answer)) {
                // Correct  Answer
                results.points += question.points;
                results.right_qsts.push(question.q_id);
            } else {
                // Wrong Answer
                results.wrong_qsts.push(question.q_id);
                highlightCorrect(question.correct_answer);
            }
        }else { 
            if (answer_id.localeCompare(question.correct_answer) == 0) {
                results.points += question.points;
                results.right_qsts.push(question.q_id);
            }else {
                results.wrong_qsts.push(question.q_id);
                highlightCorrect(question.correct_answer);
            }                
        } 
    return results;

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

function evaluateAnswers() {
    return results;
 }

 window.onload = initializeUI;