//  in this module we accept the user inputs for question settings
// then we manipulate these inputs and make required validations
// then we form the URL of the API call
// make the API call and using asyn await and fetch
// use .then to chain the api call with the starting of the app
// make an instance of th quiz class to start the quiz app and send the questions, total number of questions, and quizDom

//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy

import Quiz from "./quiz.js";

class Settings {
  constructor() {
    this.formDom = document.querySelector(".settings-form");
    this.settingsDom = document.querySelector(".settings");
    this.questionsDom = document.querySelector(".questions");
    this.categoryDom = document.querySelector("#select-category");
    this.difficultyDom = document.getElementsByName("difficulty");
    this.numberDom = document.querySelector("#number");
    this.submitDom = document.querySelector("[type = submit]");

    this.formDom.addEventListener("submit", (e) => this.startQuiz(e));
    console.log(this.categoryDom.value);
    // console.dir(this.settingsDom);
  }
  startQuiz(e) {
    e.preventDefault();
    const category =
      this.categoryDom.value == ""
        ? alert("Please Choose Category For Your Questions!!")
        : this.categoryDom.value;
    const number = this.getNumber();
    const difficulty = this.getDifficulty();
    if (category && number && difficulty) {
      const url = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}`;
      this.fetchQuestions(url)
        .then((questions) => {
          console.log(questions);
          this.startQuizApp(questions, number);
        })
        .catch((err) => console.log(err));
    }
  }

  getNumber = () => {
    let number = this.numberDom.value;
    return number > 0 && number < 20
      ? number
      : alert("Please Enter Questions Number Between 1 to 20.");
  };
  getDifficulty() {
    let difficultyArr = [].slice.call(this.difficultyDom);
    const difficulty = difficultyArr.filter((e) => e.checked);
    console.log(difficulty);
    if (difficulty.length > 0) {
      return difficulty[0].value;
    } else {
      alert("Please Choose your Questions Difficulty");
    }
  }

  fetchQuestions = async (url) => {
    const response = await fetch(url);
    try {
      const { results } = await response.json();
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  startQuizApp(questions, number) {
    new Quiz(questions, number, this.questionsDom);
    this.settingsDom.style.display = "none";
    this.questionsDom.style.display = "block";
  }
}

export default Settings;
