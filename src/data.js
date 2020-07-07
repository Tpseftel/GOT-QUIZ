const static_quiz = {
    "quiz_id": 12,
    "title": "Game of Thrones Trivia Quiz: How well do you know Season 6?",
    "description": "All men must die, but not before you prove how much you really love A Song of Ice and Fire.",
    "questions": [
    {
    "q_id": 1,
    "title": "Who died holding a door for Bran Stark to escape?",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/1.jpg",
    "question_type": "mutiplechoice-single",
    "possible_answers": [
    {
    "a_id": 1,
    "caption": "Hodor"
    },
    {
    "a_id": 2,
    "caption": "The Hound"
    },
    {
    "a_id": 3,
    "caption": "Cold Hands"
    },
    {
    "a_id": 4,
    "caption": "Wun Wun"
    }
    ],
    "correct_answer": 1,
    "points": 2
    },
    {
    "q_id": 2,
    "title": "The Queen of Thorns, Olenna Tyrell, is the only Tyrell left alive at the end of Season 6.",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/2.jpg",
    "question_type": "truefalse",
    "correct_answer": true,
    "points": 3
    },
    {
    "q_id": 3,
    "title": "Who killed Rickon Stark?",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/3.jpg",
    "question_type": "mutiplechoice-single",
    "possible_answers": [
    {
    "a_id": 7,
    "caption": "Roose Bolton"
    },
    {
    "a_id": 8,
    "caption": "Stannis Baratheon"
    },
    {
    "a_id": 9,
    "caption": "Ramsay Bolton"
    },
    {
    "a_id": 10,
    "caption": "Renley Baratheon"
    }
    ],
    "correct_answer": 9,
    "points": 2
    },
    {
    "q_id": 4,
    "title": "Which of these people died in the Great Sept at Cersei's hand?",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/4.jpg",
    "question_type": "mutiplechoice-multiple",
    "possible_answers": [
    {
    "a_id": 11,
    "caption": "Tommen Baratheon"
    },
    {
    "a_id": 12,
    "caption": "Margery Tyrell"
    },
    {
    "a_id": 13,
    "caption": "Loras Tyrell"
    },
    {
    "a_id": 14,
    "caption": "Mace Tyrell"
    }
    ],
    "correct_answer": [
    12,
    13,
    14
    ],
    "points": 4
    },
    {
    "q_id": 5,
    "title": "How many gods does the High Sparrow worship?",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/5.jpg",
    "question_type": "mutiplechoice-single",
    "possible_answers": [
    {
    "a_id": 15,
    "caption": "7"
    },
    {
    "a_id": 16,
    "caption": "6"
    },
    {
    "a_id": 17,
    "caption": "3"
    },
    {
    "a_id": 18,
    "caption": "1"
    }
    ],
    "correct_answer": 15,
    "points": 1
    },
    {
    "q_id": 6,
    "title": "Which of these people turned up alive despite being left for dead in the previous seasons?",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/6.jpg",
    "question_type": "mutiplechoice-multiple",
    "possible_answers": [
    {
    "a_id": 19,
    "caption": "Eddard Stark"
    },
    {
    "a_id": 20,
    "caption": "Jon Snow"
    },
    {
    "a_id": 21,
    "caption": "The Hound Sandor Clegane"
    },
    {
    "a_id": 22,
    "caption": "Prince Oberyn of Dorne"
    }
    ],
    "correct_answer": [
    20,
    21
    ],
    "points": 3
    },
    {
    "q_id": 7,
    "title": "Who was born in the Tower of Joy?",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/7.jpg",
    "question_type": "mutiplechoice-single",
    "possible_answers": [
    {
    "a_id": 23,
    "caption": "Ramsay Snow"
    },
    {
    "a_id": 24,
    "caption": "Eddard Stark"
    },
    {
    "a_id": 25,
    "caption": "Lyanna Stark"
    },
    {
    "a_id": 26,
    "caption": "Jon Snow"
    }
    ],
    "correct_answer": 26,
    "points": 3
    },
    {
    "q_id": 8,
    "title": "Who set Rhaegal and Viserion free?",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/8.png",
    "question_type": "mutiplechoice-single",
    "possible_answers": [
    {
    "a_id": 27,
    "caption": "Missandei"
    },
    {
    "a_id": 28,
    "caption": "Tywin Lannister"
    },
    {
    "a_id": 29,
    "caption": "Tyrion Lannister"
    },
    {
    "a_id": 30,
    "caption": "Grey Worm"
    }
    ],
    "correct_answer": 29,
    "points": 2
    }
    ]
    };

const static_results = {
    "quiz_id": 12,
    "results": [
    {
    "r_id": 1,
    "minpoints": 0,
    "maxpoints": 33,
    "title": "Not good.",
    "message": "You are lucky we don't feed your score to the hounds.",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/ramsay.jpg"
    },
    {
    "r_id": 2,
    "minpoints": 34,
    "maxpoints": 66,
    "title": "An average attempt",
    "message": "Sansa isn't very impressed by your lack of Season 6 knowledge.",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/sansa.png"
    },
    {
    "r_id": 3,
    "minpoints": 67,
    "maxpoints": 100,
    "title": "Dragonfire!",
    "message": "Daenerys likes your score. You may live.",
    "img": "http://proto.io/en/jobs/candidate-questions/imgs/daenerys.jpg"
    }
    ]
    };