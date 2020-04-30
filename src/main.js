// TODO: Use Local Storage for current question, score  and more
const url_quiz = 'http://proto.io/en/jobs/candidate-questions/quiz.json' ;
const url_results = 'http://proto.io/en/jobs/candidate-questions/result.json' ;

let quiz;
let result_messages;
let current_index ;
let questions = [];
let user_stats = {}; 

/**
 * Initialize the main quiz interface
*/
async function initializeUI() {
    current_index = 0;
    user_stats = {
        "wrong_qsts": [],
        "right_qsts": [],
        "points": 0
    };
    try { 
        // Prevent reload data on play again
        if (!quiz){
            quiz = await retrieveData(url_quiz);
        }
        if(!result_messages) {
        let  result = await retrieveData(url_results);
        console.log(result.quiz_id);
        console.log(quiz.quiz_id);
            if(result.quiz_id == quiz.quiz_id) {
                result_messages = result;
            }
        }
    } catch (error) {
        console.log(`Error:${error.message}`);
        alert("There is problem, Pleaze try again");
    }
    questions = quiz.questions;
    renderMainUI(quiz.title, quiz.description, current_index);
    displayQuestions(true);
}

/**
 * Submit the answer for the current question
 */
function submitAnswer() {
    let current_question = questions[current_index];

    console.log(`Current question index:${current_index}`);
    let user_answer = getUserAnswer(current_question);

    // Check if the user have selected any answer
    if (user_answer.length == 0) {
        alert ( "Pleaze select an answer");
        return;
    }
    const isCorrect = validateAnswer(current_question, user_answer);
    console.log(`Is Correct:${isCorrect}`);
    computeQuestionPoints(isCorrect, current_question);
    let delay;
    if(isCorrect) delay = 3000;
    else delay =1000;
    
    if(current_index < questions.length - 1) goNextQuestion(delay);
    else goResults(delay);
}

/**
 * @param {Number} delay The delay before go to the next question 
 */
function goNextQuestion(delay) {
        current_index++;
        delayFun(() =>{renderQuestion(current_index);}, delay);
}

/**
 * @param {Number} delay Delay before go to the result
 */
function goResults( delay) {
    delayFun(() => {displayResults(questions, user_stats);}, delay);
}

function restartQuiz(){
initializeUI();
}

 window.onload = initializeUI;