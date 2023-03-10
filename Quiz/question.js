// handel individual question
// select the required dom elements
// set the required properties
// render the question
// correct the answer

class question {
  constructor(question) {
    this.questionHeadDom = document.querySelector(".question-head");
    this.answersDom = document.getElementsByName("answer");
    // this.nextDom= document.querySelector('.next');

    this.questionHead = question.question;
    this.correctAnswer = question.correct_answer;
    this.answers = [this.correctAnswer, ...question.incorrect_answers];
    this.isCorrect = false;
  }
  render() {
    this.questionHeadDom.innerHTML = this.questionHead;
    console.log('render q')
    this.answers.forEach((answer, index) => {
      this.answersDom[index].value = '';
      this.answersDom[index].nextElementSibling.innerHTML = '';
      this.answersDom[index].value = answer;
      this.answersDom[index].nextElementSibling.innerHTML = answer;
    });
  }
  checkAnswer(answer) {
    if (answer.value == this.correctAnswer) {
      this.isCorrect = true;
    }
  }
}

export default question;
