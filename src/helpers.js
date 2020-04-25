/**
 * Retrieves Data from Remote API
 * @param {String} url Url to retrieve data
 * @returns {object}
 */
async function retrieveData(url) {
    try {
        let data = await getAjax(url);
        return JSON.parse(data);
    } catch (error) {
        console.log(`Error:${error.message}`);
    }
}

/**
 * 
 * @param {String} url endpoint url 
 */
function getAjax(url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onload = () => {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = () => reject(Error("Network Error"));
        req.send();
    });
}

/**
 * 
 * @param {Object} questions 
 * @param {Number} user_points 
 */
async function displayResults(questions, user_points) {
    displayQuestions(false);
    const user_percent = calculatePercentPoints(questions, user_points);
    console.log(`Result Percent ${user_percent}`);
    let result_message = getResultMessage(user_percent);
    renderResults("result-infos", result_message, user_percent);
    console.log(`Use points: ${user_points}`);
}

/** 
 * @param {Number} quiz_id
 * @param {Number} percent_result 
 * @returns {Object}
 */
function getResultMessage(user_result) { 
    let messages = result_messages.results;
    let message_p ;
    console.log(`Messages:${messages}`);
    console.log(`User Results:${user_result}`);
    
    messages.forEach(message => {
        if(user_result >= message.minpoints && user_result <=message.maxpoints) {
            message_p = message;
        }
    });
    console.log(`message_p:${message_p}`);
    return message_p;
}
/**
 * 
 * @param {Object} question Question object
 * @param {String} answer_id  The id of the user's answer
 * @returns {Boolean}
 */
function validateAnswer(question, answer_id){
    let isCorrect = false;
        if (question.question_type == "mutiplechoice-single") {
            if (answer_id == question.correct_answer) isCorrect = true;
        }
        else if(question.question_type == "mutiplechoice-multiple") {
            if(areArraysEqualSets(answer_id, question.correct_answer)) isCorrect = true;
        }else { //Case truefalse 
            if (answer_id.localeCompare(question.correct_answer) == 0) isCorrect = true;
        } 
    return isCorrect;

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
 * @param {Object} question 
 * returns {String}
 */
function getUserAnswer(question) {
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
 * @param {Object} questions 
 * @param {Number} user_points 
 * @return {Number}  
 */
function calculatePercentPoints(questions, user_points) {
    console.log(`Calcualte result user points${user_points}`);
    if(user_points == 0) return 0;
    let all_points = 0 ;
    questions.forEach(question => {
        all_points += question.points;
    });
    let percent_points = (100 / all_points) * user_points;   

    return percent_points;
 }
