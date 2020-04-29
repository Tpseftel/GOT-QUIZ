
const parser = new DOMParser();

function highlightCorrect(answers_c) {
    let cor_elements = [];
    let el;
    if(Array.isArray(answers_c)){
        answers_c.forEach(ans => {
          el =   document.getElementById(ans);
          addClass(el,"correct-answers");
        });
    }else {
        el = document.getElementById(answers_c);
         addClass(el,"correct-answers");
    }

    function addClass(element, class_name) {
        let arr;
        arr = element.className.split(" ");
        if (arr.indexOf(class_name) == -1) {
          element.className += " " + class_name;
        }
    }
}

/**
 * 
 * @param {String} quiz_title 
 * @param {String} quiz_desc 
 * @param {Number} current_index 
 */
function renderMainUI(quiz_title, quiz_desc, current_index) {
    document.getElementById("quiz-title").innerHTML = quiz_title;
    document.getElementById("quiz-description").innerHTML = quiz_desc;
    renderQuestion(current_index);
}
/**
 * @param {Number} index 
 */
function renderQuestion(index) {
    document.getElementById("btn-next").style.display= "block";
    document.getElementById("success-box").style.display= "none";
    document.getElementById("failure-box").style.display= "none";

    document.getElementById("current-question").innerHTML = index + 1;
    document.getElementById("total-questions").innerHTML = questions.length;
    //FIXME: Make questions parameter and not use the global!!! 
    let question = questions[index];
    let bg_image = question.img;
    let image = document.getElementById("question-img");
    image.setAttribute("src",bg_image);
    image.setAttribute("width", 200);
    image.setAttribute("height", 200);
    image.setAttribute("class", "responsive-img");
    
    document.getElementById("question-title").innerHTML = question.title;
    let type_message = "";
    if(question.question_type == "mutiplechoice-single") {
        type_message = "There is only one correct answer...";
    }else if(question.question_type == "mutiplechoice-multiple") {
        type_message =  "There may be more than one correct answers";
    }else {
        type_message = "";
    }
    document.getElementById("question-tip").innerHTML = type_message;
    
    // Render possible answers
    const question_container = "answer-placeholder";
    if (question.question_type == "mutiplechoice-single" || question.question_type == "mutiplechoice-multiple") {
        renderMultipleChoice(question_container, question);
    } else {
        renderTruefalse(question_container);
    } 
}

/**
 * 
 * @param {String} container_id 
 */
function renderTruefalse(container_id) {
    const container = document.getElementById(container_id);
    container.innerHTML = "";

    let trueDomString =`
        <label class="container" id="true"> TRUE
            <input type="radio" value="true" name="truefalse" >
            <span class="checkmark"></span>
        </label>
        </br>
    `;
    let falseDomString =`
        <label class="container" id="false"> FALSE
            <input type="radio" value="false" name="truefalse" >
            <span class="checkmark"></span>
        </label>
    `;
    let htmlFalse = parser.parseFromString(falseDomString, 'text/html'); 
    let htmlTrue = parser.parseFromString(trueDomString, 'text/html'); 

    container.appendChild(htmlTrue.documentElement);
    container.appendChild(htmlFalse.documentElement);
}

/**
 * 
 * @param {String} container_id 
 * @param {Object} question 
 */
function renderMultipleChoice(container_id, question) {
    let container = document.getElementById(container_id);
    container.innerHTML = '';
    let possible_answers = question.possible_answers;
    let input_type;
    if (question.question_type === "mutiplechoice-multiple") input_type = "checkbox";
    else input_type = "radio";
    possible_answers.forEach(answer => {
        let domString =`
            <label class="container" id="${answer.a_id}" > ${answer.caption}
                <input type="${input_type}" value="${answer.a_id}" name="${question.question_type}" >
                <span class="checkmark"></span>
            </label>
            </br>
        `;
        let html = parser.parseFromString(domString, 'text/html'); 
        container.appendChild(html.documentElement);
    });
}

/**
 * 
 * @param {String} container_id 
 * @param {Object} result 
 */
function renderResults(container_id, result, user_percent) {
    let container = document.getElementById(container_id);
    container.innerHTML = '';
    let domString = `   
        <div id="result-title">${result.title}</div>
        <div id="result-message">${result.message} </div>
        <img src="${result.img}" class="responsive-img" />
        <div id="result-percent">Player Achieved Percent: <span color="red">${user_percent}% <span></div>
    `;
    let html = parser.parseFromString(domString, 'text/html');
    container.appendChild(html.documentElement);
}

/**
 * 
 * @param {Boolean} confirm 
 */
function displayQuestions(confirm) {
    if(confirm) {
        document.getElementById("results-container").style.display= "none";
        document.getElementById("question-container").style.display= "block";
    }else {
         // Display results content
         document.getElementById("question-container").style.display= "none";
         document.getElementById("results-container").style.display= "block";
    }
}

function displaySuccessMessage() {
    document.getElementById("btn-next").style.display= "none";
    document.getElementById("success-box").style.display= "block";    
}
function displayFailureMessage() {
    document.getElementById("btn-next").style.display= "none";
    document.getElementById("failure-box").style.display= "block";    
}