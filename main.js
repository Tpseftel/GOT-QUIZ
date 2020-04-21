// http://proto.io/en/jobs/candidate-questions/quiz.json
// http://proto.io/en/jobs/candidate-questions/result.json
// TODO: Use Local Storage for current question, score  and more
let quiz ;
let curQuest;


async function getData() {
    //FIXME: Get data with ajax call
    try {
        const quiz = await fetch("http://proto.io/en/jobs/candidate-questions/quiz.json");
        return quiz;
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

function createUI(){
    //TODO: For the current question must render the UI properly
    // Different Cases
    // mutiplechoice-single
    // mutiplechoice-multiple
    // truefalse
}

function nextQuestion(){
    // TODO: Check if answer is valid
   const validAnser =  validateAnswer(response);
    if (answer  == true) {

    }
    
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


// getData()
//     .then(res => res.json())
//     .then(data => {
//         let main = document.getElementById("main");
//         console.log(data);
//         main.innerHTML = data.questions[0].possible_answers[0].caption;
//     })
//     .catch(error => {
//         console.log(error.message);
//     });