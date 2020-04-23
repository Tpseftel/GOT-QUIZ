// http://proto.io/en/jobs/candidate-questions/quiz.json
// http://proto.io/en/jobs/candidate-questions/result.json
// TODO: Use Local Storage for current question, score  and more

const quizUrl = 'http://proto.io/en/jobs/candidate-questions/quiz.json' ;
const resultsUrl = 'http://proto.io/en/jobs/candidate-questions/result.json' ;
let quiz = {};
let current_quest = -1;
let questions = [];
let answers = [];  // {q_id: 1 , a_id:2}
let points = 0;

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
    current_quest++;
    console.log(`current question index:${current_quest}`);

    // Check if  it is the  last question
   if (current_quest < questions.length) renderQuestions(current_quest); 
   else {
       current_quest = -1;
       window.alert("Lets see your results");
   }
    // TODO: Check if answer is valid
}

function evaluateAnswers() {
    let results = {
        "wrong_qsts": [],
        "right_qsts": [],
        "points": 0
    };
    answers.forEach(answer => {
        let current_question = questions.findIndex(question => answer.q_id == question.q_id);
        if (current_question.question_type == "mutiplechoice-single") {
            if (answer.a_id == current_question.correct_answer) {
                // Correct  Answer
                points = points + current_question.points;
                results.points += current_question.points;
                results.right_qsts.push(answer.q_id);
            } else {
                // Wrong Answer
                results.wrong_qsts.push(answer.q_id);
            }
        }
        else if (question.question_type == "mutiplechoice-multiple") {
            if(areArraysEqualSets(answer.a_id, current_question.correct_answer)) {
                // Correct  Answer
                points = points + current_question.points;
                results.points += current_question.points;
                results.right_qsts.push(answer.q_id);
            } else {
                // Wrong Answer
                results.wrong_qsts.push(answer.q_id);
            }
        }else { // TrueFalse Case
            if (answer.a_id, current_question.correct_answer) {
                results.points += current_question.points;
                points = points + current_question.points;
                results.right_qsts.push(answer.q_id);
            }else {
                results.wrong_qsts.push(answer.q_id);
            }                
        } 
    });

    function areArraysEqualSets(a1, a2) {
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
    return results;
 }



//  Render Functions

function renderMainUI(title, description) {
    document.getElementById("main-title").innerHTML = title;
    document.getElementById("main-desc").innerHTML = description;
}

function renderQuestions(current_quest) {
    // Render Question
    question = questions[current_quest];
    bg_image = `background-image: url(${question.img})`;
    document.getElementById("question-container").setAttribute("style", bg_image);
    document.getElementById("question-container").style.height = "300px";
    document.getElementById("question-container").style.width = "500px";
    
    document.getElementById("qtitle").innerHTML = question.title;
    document.getElementById("qtype").innerHTML = question.question_type;
    
    // Render possible answers
    let div = document.getElementById("qanswers");
    div.innerHTML = '';
    if (question.question_type == "mutiplechoice-single" || question.question_type == "mutiplechoice-multiple") {
        renderMultipleChoice(div);
    } else {
        renderTruefalse(div);
    } 
}

function renderTruefalse(container){
    let btn_true = document.createElement("Button");
    btn_true.setAttribute("id", "1");
    btn_true.innerHTML = "TRUE";
    let btn_false = document.createElement("Button");
    btn_false.setAttribute("id", "0");
    btn_false.innerHTML = "FALSE" ;

    container.appendChild(btn_true);
    container.appendChild(btn_false);
}


function renderMultipleChoice(container) {
    let pAnswers = question.possible_answers;
    pAnswers.forEach(answer => {
        const input = document.createElement("INPUT");
        input.setAttribute("type", "radio");
        input.setAttribute("id", answer.a_id);
        input.setAttribute("name", "single-choice");
    
        const label = document.createElement("LABEL");
        label.setAttribute("for", answer.a_id);
        const caption_text = document.createTextNode(answer.caption);
        label.appendChild(caption_text);
        const br = document.createElement("BR");
        container.appendChild(input);
        container.appendChild(label);
        container.appendChild(br);
    });
}



 window.onload = initializeUI;