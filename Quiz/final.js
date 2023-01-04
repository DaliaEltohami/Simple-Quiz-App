class final {
  constructor(correctAnswers, totalAnswers) {
    this.correctAnswersDom = document.querySelector(".correct-answers");
    this.totalAnswersDom = document.querySelector(".total-answers");
    this.tryAgianDom = document.querySelector(".try-again");

    this.correctAnswers = correctAnswers;
    this.totalAnswers = totalAnswers;
    this.tryAgianDom.addEventListener("click", this.tryAgain);
    this.render();
  }
  tryAgain = () => {
    location.reload();
  };
  render(){
    console.log(this.totalAnswersDom)
    console.log(this.correctAnswersDom)

    this.totalAnswersDom.innerHTML = this.totalAnswers;
    this.correctAnswersDom.innerHTML = this.correctAnswers;
  }
}

export default final;