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

function renderMainUI(qtitle, qdescription, current_index) {
    document.getElementById("main-title").innerHTML = qtitle;
    document.getElementById("main-desc").innerHTML = qdescription;
    renderQuestion(current_index);
}

function renderQuestion(index) {
    let question = questions[index];
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