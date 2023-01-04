// 1) get the needed dom elements 
// 2) make an array of question instances with the questions parameter
// 3) set current question 
// 4) render the first question
// 5) handel the next button click event
// 6) handel question answer
// 7) instantiate the final class if we reach the final question 
// 8) count correct answers and send it to the final instant with the total number of questions


import final from "./final.js";
import question from "./question.js";

class Quiz {
  constructor(questions, total, quizDom) {
    this.currentQuestionDom = document.querySelector(".current-question");
    this.totalQuestionsDom = document.querySelector(".total-questions");
    this.nextDom = document.querySelector(".next");
    this.finalDom = document.querySelector(".final");

    console.log(questions);
    this.total = total;
    this.current = 0;
    this.quizDom = quizDom;
    this.questions = questions.map((q) => new question(q));
    this.nextDom.addEventListener("click", this.nextQuestion);
    this.renderQuestion();
  }

  renderQuestion() {
    if (this.current < this.total) {
      this.currentQuestionDom.innerHTML = this.current + 1;
      this.totalQuestionsDom.innerHTML = this.total;
      this.questions[this.current].render();
    } else {
      this.renderFinal();
    }
  }
  nextQuestion = () => {
    let answered = this.setAnswer();
    if (answered) {
      this.current++;
      this.renderQuestion();
    }
  };

  setAnswer() {
    let answered = false;
    let answersList = [].slice.call(this.questions[this.current].answersDom);
    let checkedAnswer = answersList.filter((a) => a.checked);
    if (checkedAnswer.length > 0) {
      this.questions[this.current].checkAnswer(checkedAnswer[0]);
      answered = true;
      checkedAnswer[0].checked = false;
      return answered;
    } else {
      alert("Please Choose Your Answer");
    }
  }

  renderFinal = () => {
    let correct = this.countCorrect();
    new final(correct, this.total);
    this.finalDom.style.display = "block";
    this.quizDom.style.display = "none";
  };

  countCorrect() {
    let count = 0;
    this.questions.forEach((q) => {
      if (q.isCorrect) {
        count++;
      }
    });
    return count;
  }
}

export default Quiz;
