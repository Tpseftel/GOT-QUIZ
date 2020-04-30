// TODO: Use Local Storage for current question, score  and more
const url_quiz = 'http://proto.io/en/jobs/candidate-questions/quiz.json' ;
const url_results = 'http://proto.io/en/jobs/candidate-questions/result.json' ;

let quiz;
let result_messages;
let current_index;
let questions = [];
let user_points; 

/**
 * Initialize the main quiz interface
*/
async function initializeUI() {
    current_index = 0;
    user_points = {
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
 * Just before go next
 */
function beforeNextQuestion() {
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
    
    if(isCorrect) goNextQuestion(3000);
    else goNextQuestion(1500);
}

/**
 * 
 * @param {Number} delay The delay before go to next question 
 */
function goNextQuestion(delay) {
    if (current_index < questions.length - 1) {
        // This is not the last question
        current_index++;
        delayFun(() =>{renderQuestion(current_index);});
    }
    else {
        // Last Question
        delayFun(() => {
            return displayResults(questions, user_points.points);
        });
    }
    async function delayFun(fun) { 
        return new Promise(function(resolve, reject) { 
            setTimeout(resolve, delay); 
        }).then(function() { 
            fun();
        }); 
    } 
}

 function restartQuiz(){
    initializeUI();
 }

 window.onload = initializeUI;