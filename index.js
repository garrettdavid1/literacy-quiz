let quizzes = [
    {
        name: 'UpperCase Letters',
        unit: 'letter',
        list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    },
    {
        name: 'LowerCase Letters',
        unit: 'letter',
        list: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    },
    {
        name: '3-Letter CVC (I)',
        unit: 'word',
        list: ['bid','big','bin','bit','did','dig','din','dip','fib','fig','fin','fit','fix','gig','hid','him','hip','his','hit','jig','kid','kit','lid','lit','nip','mit','mix','pig','pin','pin','pit','rid','rig','rim','rip','sin','sip','sit','six','tin','tip','wig','win','wit','zip']
    },
    {
        name: 'Dolch Sight Words (Pre-Primer)',
        unit: 'word',
        list: ['a', 'find', 'is', 'not', 'three', 'and', 'for', 'it', 'one', 'to', 'away', 'funny', 'jump', 'play', 'two', 'big', 'go', 'little', 'red', 'up', 'blue', 'help', 'look', 'run', 'we', 'can', 'here', 'make', 'said', 'where', 'come', 'I', 'me', 'see', 'yellow', 'down', 'in', 'my', 'the', 'you']
    },
    {
        name: 'Dolch Sight Words (Kindergarten)',
        unit: 'word',
        list: ['all','am','are','at','ate','be','black','brown','but','came','did','do','eat','four','get','good','have','he','into','like','must','new','no','now','on','our','out','please','pretty','ran','ride','saw','say','she','so','soon','that','there','they','this','too','under','want','was','well','went']
    },
];
let selectedList;
let selectedQuiz;
const correctList = [];
const incorrectList = [];
let currentItem = '';

const mark = (isCorrect) => {
    if(isCorrect){
        correctList.push(currentItem);
    } else{
        incorrectList.push(currentItem);
    }

    selectedList.splice(selectedList.indexOf(currentItem), 1);
    setItem();
    buildLists();
}

const buildLists = () => {
    const correctListElement = $("#correct-items");
    const incorrectListElement = $("#incorrect-items");

    const correctListItems = correctList.map(item => {
      return `<li>${item}</li>`;
    });
    const incorrectListItems = incorrectList.map(item => {
      return `<li>${item}</li>`;
    });

    correctListElement[0].innerHTML = correctListItems.join("");
    incorrectListElement[0].innerHTML = incorrectListItems.join("");
}

const setItem = () => {
    let index;
    if(selectedList.length > 0){
        const fontSize = selectedQuiz.unit === 'letter' ? '8em' : '5em';
        $('#item').css('font-size', fontSize);
        index = Math.floor(Math.random() * selectedList.length);
        currentItem = selectedList[index];
    } else{
        currentItem = `${correctList.length} Correct <hr /> ${incorrectList.length} Incorrect`;
        $('#correct-btn').remove();
        $('#incorrect-btn').remove();
        $('#question').remove();
        $('#item').css('font-size', '2.5em');
    }
    
    $('#item')[0].innerHTML = currentItem;
};

const displayQuizOptions = () => {
    let quiz;
    const quizOptionButtons = quizzes.map(function(quiz, index){
        return `<button class='btn btn-light' onclick='selectQuiz(${index})'>${quiz.name}</button>`;
    })

    $('#quiz-selection-container').append(quizOptionButtons);
}

const selectQuiz = (index) => {
    selectedQuiz = quizzes[index];
    selectedList = selectedQuiz.list;
    $('#quiz-selection-container').css('display', 'none');
    $('#question-container').css('display', 'flex');
    $('#item-type')[0].innerText = selectedQuiz.unit;
    setItem();
    buildLists();
    quizzes = [];
}

$(document).ready(function(){
    displayQuizOptions();
})