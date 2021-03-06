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
 * @param {Array} questions 
 * @param {Number} user_stats 
 */
async function displayResults(questions, user_stats) {
    displayQuestions(false);
    const user_percent = calculatePercentPoints(questions, user_stats);
    console.log(`Result Percent ${user_percent}`);
    let result_message = getResultMessage(user_percent);
    renderResults(result_message, user_percent, user_stats);
    console.log(`User points: ${user_stats}`);
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
 * Validates if the answer is correct
 * @param {Object} question Question object
 * @param {Array} answer_id  The id of the user's answer
 * @returns {Boolean}
 */
function validateAnswer(question, answer_id) {
    const type = question.question_type;
    let isCorrect = false;
        if (type == "mutiplechoice-single" || type == "truefalse") {
            if (answer_id[0].localeCompare(question.correct_answer) == 0) isCorrect = true;
        } else {
            if(areArraysEqualSets(answer_id, question.correct_answer)) isCorrect = true;
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
 * Retrieves User Answer
 * @param {Object} question 
 * returns {String}
 */
function getUserAnswer(question) {
    let selected = [];
    const ele = document.getElementsByName(question.question_type); 
    for(let i = 0; i < ele.length; i++) { 
        if(ele[i].checked){
            selected.push(ele[i].getAttribute("value"));
        } 
    } 
    return selected;
}

/**
 * @param {Object} questions 
 * @param {Number} user_stats 
 * @return {Number}  
 */
function calculatePercentPoints(questions, user_stats) {
    console.log(`Calcualte result user points${user_stats}`);
    if(user_stats == 0) return 0;
    let all_points = 0 ;
    questions.forEach(question => {
        all_points += question.points;
    });
    let percent_points = (100 / all_points) * user_stats.points;   

    return percent_points;
 }

 function computeQuestionPoints(isCorrect, current_question) {
    if (isCorrect) {
        user_stats.points += current_question.points;
        user_stats.right_qsts.push(current_question.q_id);
    }
    else user_stats.wrong_qsts.push(current_question.q_id);
}

/**
 * Set timeout to run a function
 * @param {Function} fun 
 * @param {Number} delay 
 */
async function delayFun(fun, delay) { 
    return new Promise(function(resolve, reject) { 
        setTimeout(resolve, delay); 
    }).then(function() { 
        fun();
    });
}