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
    // TODO: Check if answer is valid
}

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
    let results = {
        "wrong_qsts": [],
        "right_qsts": [],
        "points": 0
    };
    answers.forEach(answer => {
        let quest_index = questions.findIndex(question => answer.q_id == question.q_id);
        let current_question = questions[quest_index];
        
        if (current_question.question_type == "mutiplechoice-single") {
            console.log("mutiplechoice-single");
            if (answer.a_id == current_question.correct_answer) {
                // Correct  Answer
                points = points + current_question.points;
                results.points += current_question.points;
                results.right_qsts.push(answer.q_id);
            } else {
                // Correct Answer
                results.wrong_qsts.push(answer.q_id);
            }
        }
        else if(current_question.question_type == "mutiplechoice-multiple") {
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

//  Render Functions

function renderMainUI(title, description) {
    document.getElementById("main-title").innerHTML = title;
    document.getElementById("main-desc").innerHTML = description;
}

function renderQuestions(current_quest) {
    // Render Question
    let question = questions[current_quest];
    let bg_image = `background-image: url(${question.img})`;
    document.getElementById("question-container").setAttribute("style", bg_image);
    document.getElementById("question-container").style.height = "300px";
    document.getElementById("question-container").style.width = "500px";
    
    document.getElementById("qtitle").innerHTML = question.title;
    document.getElementById("qtype").innerHTML = question.question_type;
    
    // Render possible answers
    let div = document.getElementById("qanswers");
    div.innerHTML = '';
    if (question.question_type == "mutiplechoice-single" || question.question_type == "mutiplechoice-multiple") {
        renderMultipleChoice(div, question);
    } else {
        renderTruefalse(div);
    } 
}

function renderTruefalse(container) {
    const input_true = document.createElement("INPUT");
    input_true.setAttribute("type", "radio");
    input_true.setAttribute("id", 'true-radio');
    input_true.setAttribute("name", "truefalse");
    input_true.setAttribute("value", "true");

    const label_true = document.createElement("LABEL");
    label_true.setAttribute("for", "true-radio");
    const caption_t = document.createTextNode("TRUE");
    label_true.appendChild(caption_t);

    const input_false = document.createElement("INPUT");
    input_false.setAttribute("type", "radio");
    input_false.setAttribute("id", "false-radio");
    input_false.setAttribute("name", "truefalse");
    input_false.setAttribute("value", "false");

    const label_false = document.createElement("LABEL");
    label_false.setAttribute("for", "false-radio");
    const caption_f = document.createTextNode("FALSE");
    label_false.appendChild(caption_f);

    const br = document.createElement("BR");
    container.appendChild(input_true);
    container.appendChild(label_true);
    container.appendChild(br);
    container.appendChild(input_false);
    container.appendChild(label_false);
}


function renderMultipleChoice(container, question) {
    let parser = new DOMParser();
    let pAnswers = question.possible_answers;
    let input_type;
    if (question.question_type === "mutiplechoice-multiple") input_type = "checkbox";
    else input_type = "radio";
    pAnswers.forEach(answer => {
        let domString =
        `<label class="container"> ${answer.caption}
            <input type="${input_type}" value="${answer.a_id}" name="${question.question_type}" >
            <span class="checkmark"></span>
        </label>
        </br>`;
        let html = parser.parseFromString(domString, 'text/html'); 
        container.appendChild (html.documentElement);
    });
}
 window.onload = initializeUI;