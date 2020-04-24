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

function highlightCorrect(answers_c) {
    // let cor_elements = [];
    // let el;
    // if(Array.isArray(answers_c)){
    //     answers_c.forEach(ans => {
    //       el =   document.getElementById(c);
    //       myFunction(el,"correct-answers");
    //     });
    // }else {
    //     el = document.getElementById(answers_c);
    //     myFunction(el,"correct-answers");
    // }
    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // (async()=>{
    //     //Do some stuff
    //     await sleep(3000);
    //     alert("hello");
    //   })();
      

    // alert(`wrong answer bitch \n the correct is:${questions[current_quest].correct_answer}`);
    function myFunction(element, class_name) {
        let arr;
        arr = element.className.split(" ");
        if (arr.indexOf(class_name) == -1) {
          element.className += " " + class_name;
        }
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
        `<label class="container" id="${answer.a_id}" > ${answer.caption}
            <input type="${input_type}" value="${answer.a_id}" name="${question.question_type}" >
            <span class="checkmark"></span>
        </label>
        </br>`;
        let html = parser.parseFromString(domString, 'text/html'); 
        container.appendChild (html.documentElement);
    });
}
 window.onload = initializeUI;