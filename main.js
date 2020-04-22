// http://proto.io/en/jobs/candidate-questions/quiz.json
// http://proto.io/en/jobs/candidate-questions/result.json
// TODO: Use Local Storage for current question, score  and more

const quizUrl = 'http://proto.io/en/jobs/candidate-questions/quiz.json' ;
const resultsUrl = 'http://proto.io/en/jobs/candidate-questions/result.json' ;
let quiz = {};
let current_quest = -1;
let questions = [];
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




function renderMainUI(title, description) {
    document.getElementById("main-title").innerHTML = title;
    document.getElementById("main-desc").innerHTML = description;
}

function renderQuestions(current_quest) {
    question = questions[current_quest];
    bg_image = `background-image: url(${question.img})`;
    document.getElementById("question-container").setAttribute("style", bg_image);
    document.getElementById("question-container").style.height = "300px";
    document.getElementById("question-container").style.width = "500px";
    
    document.getElementById("qtitle").innerHTML = question.title;
    document.getElementById("qtype").innerHTML = question.question_type;
    
    // Render answers
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

function renderMultipleChoice(container){
    let ol = document.createElement("OL");
    let pAnswers = question.possible_answers;
    pAnswers.forEach(answer => {
        let li = document.createElement("LI");
        let text = document.createTextNode(answer.caption);
        li.appendChild(text);
        ol.appendChild(li);
        container.appendChild(ol);
    });
}

/**
 * returns {Boolean}
 */
 function validateAnswer(){
    //  Take into acccount if right anwers are more than one
    // Different Cases
    // mutiplechoice-single
    // mutiplechoice-multiple

    //  return true or false
 }

 window.onload = initializeUI;