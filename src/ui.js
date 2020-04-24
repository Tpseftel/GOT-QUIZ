const parser = new DOMParser();
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
 * @param {String} quiz_title 
 * @param {String} quiz_desc 
 * @param {Number} current_index 
 */
function renderMainUI(quiz_title, quiz_desc, current_index) {
    document.getElementById("main-title").innerHTML = quiz_title;
    document.getElementById("main-desc").innerHTML = quiz_desc;
    renderQuestion(current_index);
}
/**
 * 
 * @param {Number} index 
 */
function renderQuestion(index) {
    let question = questions[index];
    let bg_image = `background-image: url(${question.img})`;
    document.getElementById("question-container").setAttribute("style", bg_image);
    document.getElementById("question-container").style.height = "300px";
    document.getElementById("question-container").style.width = "500px";
    
    document.getElementById("qtitle").innerHTML = question.title;
    document.getElementById("qtype").innerHTML = question.question_type;
    
    // Render possible answers
    const question_container = "qanswers";
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
function renderResults(container_id, result) {
    let container = document.getElementById(container_id);
    container.innerHTML = '';
    let domString = `   
        <div id="result-title">${result.title}</div>
        <div id="result-message">${result.message} </div>
        <div id="result-image" style="background-image: url(${result.img});height: 300px;width: 300px;"> </div>
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
        document.getElementById("results-placeholder").style.display= "none";
        document.getElementById("questions-placeholder").style.display= "block";
    }else {
         // Display results content
        document.getElementById("questions-placeholder").style.display= "none";
        document.getElementById("results-placeholder").style.display= "block";
    }
}

