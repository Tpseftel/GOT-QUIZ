// http://proto.io/en/jobs/candidate-questions/quiz.json
// http://proto.io/en/jobs/candidate-questions/result.json
// TODO: Use Local Storage for current question, score  and more

const quizUrl = 'http://proto.io/en/jobs/candidate-questions/quiz.json' ;
const resultsUrl = 'http://proto.io/en/jobs/candidate-questions/result.json' ;
let quiz = {};
let curQuest = {};
let questions = [];


function getData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response =  JSON.parse(this.responseText);
            quiz = response;
            questions = response.questions;
            curQuest = questions[2];
            renderMainUI(quiz,quiz.title, quiz.description);
            renderQuestions(curQuest);
        }
    };
    xhttp.open("GET", quizUrl, true);
    xhttp.send();
}
getData();

function renderMainUI(quiz, title, desc) {
    document.getElementById("quiz").innerHTML = quiz;
    document.getElementById("main-title").innerHTML = title;
    document.getElementById("main-desc").innerHTML = desc;
}

function renderQuestions(question){
    document.getElementById("qtitle").innerHTML = question.title;
    document.getElementById("qimg").style.backgroundImage = question.img;
    document.getElementById("qtype").innerHTML = question.question_type;
    
    // render answers
    let div = document.getElementById("qanswers");
    if (question.question_type == "mutiplechoice-single"){
        let ol = document.createElement("OL");
        let pAnswers = question.possible_answers;
        pAnswers.forEach(answer => {
            let li = document.createElement("LI");
            let text = document.createTextNode(answer.caption);
            li.appendChild(text);
            ol.appendChild(li);
            div.appendChild(ol);
        });
    } else if(question.question_type == "truefalse") {
        let btn_true = document.createElement("Button");
        btn_true.setAttribute("id", "1");
        btn_true.innerHTML = "TRUE";
        let btn_false = document.createElement("Button");
        btn_false.setAttribute("id", "0");
        btn_false.innerHTML = "FALSE" ;
        div.appendChild([btn_true, btn_false]);
    }else {
        let ol = document.createElement("OL");
        let pAnswers = question.possible_answers;
        pAnswers.forEach(answer => {
            let li = document.createElement("LI");
            let text = document.createTextNode(answer.caption);
            li.appendChild(text);
            ol.appendChild(li);
            div.appendChild(ol);
        });
    }
}



function createUI(quiz, title, desc) {
    //TODO: For the current question must render the UI properly
    // Different Cases
    // mutiplechoice-single
    // mutiplechoice-multiple
    // truefalse
}

function nextQuestion(){
    // TODO: Check if answer is valid
//    const validAnser =  validateAnswer(response);
//     if (answer  == true) {
//     }
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