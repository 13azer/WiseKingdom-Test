import React, { Component } from 'react';
import landing_logo from './resource/navbar_logo.png';
import exit from './resource/test_exit.png';
import answers from './resource/Answer.json';
import questions from './resource/Question.json';
import solutionRight from './resource/solution_right.png';
import solutionWrong from './resource/solution_wrong.png';
import starYellow from './resource/popup_star_yellow.png';
import starGrey from './resource/popup_star_grey.png';
import popupClose from './resource/popup_close.png';

import './App.css';

class Popup extends React.Component {
  customFunction(){

  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div class="d-flex justify-content-between">
            <h1 class="text-white">{this.props.title}</h1>
            <img src={popupClose} onClick={this.props.closePopup}/>
          </div>

          <div class="d-flex justify-content-center">
            {(this.props.score >= (this.props.max/3)) ?
              <img src={starYellow}/>
              : <img src={starGrey}/>
            }
            {(this.props.score >= (2*this.props.max/3))  ?
              <img src={starYellow}/>
              : <img src={starGrey}/>
            }
            {(this.props.score == this.props.max)  ?
              <img src={starYellow}/>
              : <img src={starGrey}/>
            }
          </div>
          <div class="d-flex justify-content-center align-items-end p-3">
            <p class="text-white h1">{this.props.score}</p><p class="text-white">/{this.props.max}</p>
          </div>

          {this.props.button}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Web-Header">
            <img src={landing_logo} className="Navbar-logo" alt="logo" align="left"/>
          </div>

          <QuestionSheet/>

        </header>
      </div>
    );
  }
}

class QuestionSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      step: 100/(answers.answers.length),
      questionNumber: 1,
      question: questions.questions[0],
      answer: -1,
      showAnswerRight: -1,
      showAnswerWrong: -1,
      state: 0,
      score: 0,
      popup: false
    }
    this.nextQuestion = this.nextQuestion.bind(this)
    this.selectChoice = this.selectChoice.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep() {
    if(this.state.percentage === 100) return
    this.setState({ percentage: this.state.percentage + this.state.step })
  }
  nextQuestion() {
    if(this.state.questionNumber === answers.answers.length) return
    this.setState({
      question: questions.questions[this.state.questionNumber],
      questionNumber: this.state.questionNumber + 1,
      answer: -1,
      showAnswerRight: -1,
      showAnswerWrong: -1,
      state: 0
     })
  }

  selectChoice(parameter, event) {
    this.setState({
        answer: parameter
     })
  }

  myColor(position) {
    if(this.state.state === 0 && this.state.answer === position){
      return '#AFEEEE';
    }
    return '#FFFFFF';
  }
  myBorder(position) {
    if(this.state.state != 0){
      if(this.state.showAnswerRight=== position){
        return '3px solid #33cc33';
      }
      if(this.state.showAnswerWrong=== position){
        return '3px solid #b30000';
      }
    }
    return '0px';
  }

  submit(){
    var correct = answers.answers[this.state.questionNumber-1].answer;
    var chosen = this.state.question.choices[this.state.answer]
    console.log("choose: "+chosen)
    console.log("correct: "+correct)
    if(chosen === correct){
      this.setState({
        showAnswerRight: this.state.answer,
        score: this.state.score + 1
      })
    }
    else{
      this.setState({ showAnswerWrong: this.state.answer})
      for(let i=0; i<this.state.question.choices.length; i++){
        if(this.state.question.choices[i] === correct){
          this.setState({ showAnswerRight: i})
        }
      }
    }
    this.setState({ state: 1})
    this.nextStep()
    if(this.state.questionNumber === answers.answers.length){
      this.setState({ state: 2})
    }

  }
  popUpScore(){
    this.setState({ popup: true})
    console.log("pop:"+this.state.popup)
  }

  togglePopup() {
    this.setState({
      popup: !this.state.popup
    });
  }

  seeSolution(){
    this.setState({
      popup: !this.state.popup,
      state: 3,
      percentage: this.state.step,
      questionNumber: 1,
      question: questions.questions[0],
      showAnswerWrong: -1,
      showAnswerRight: -1
    });
    this.showSolution()
  }

  showSolution(){
    var correct = answers.answers[this.state.questionNumber-1].answer;
    for(let i=0; i<this.state.question.choices.length; i++){
      if(this.state.question.choices[i] === correct){
        this.setState({ showAnswerRight: i})
      }
    }
  }

  checkFinish(){
    if(this.state.questionNumber === answers.answers.length) {
      this.setState({ state: 2})
    }
  }

  nextSolution(){
    this.nextStep()
    if(this.state.questionNumber+1 === answers.answers.length) {
      this.setState({ state: 2})
    }
    this.setState({
      question: questions.questions[this.state.questionNumber],
      questionNumber: this.state.questionNumber + 1,
     })
    this.showSolution()
  }

  exit(){
    this.setState({
      exit: true
     })
  }

  render() {
    return (
    <div>
    {this.state.exit ?
      <h1>Test End</h1> :
    <div>
      <div class="progress-div border-bottom">
        <p>progess bar</p>

        <div class="progress" style={{width:"40%"}}>
          <div class="progress-bar" role="progressbar"
          aria-valuemin="0" aria-valuemax="100"
          style={{width:this.state.percentage + '%'}}>
          </div>
        </div>

        <button class="btn btn-danger" onClick={(e) => this.exit()}>
          Exit <img src={exit}/>
        </button>
      </div>
      <div>
        <div class="d-flex justify-content-center p-3 ">

          <div class="text-left  col-lg-6 col-md-8 col-sm-10 col-xs-12">
            <h2>Exercise Name</h2>
            <div class="bg-white border">



              <h2>{this.state.questionNumber} | QUESTION</h2>
              <div class="p-3" dangerouslySetInnerHTML={ { __html:   this.state.question.question }}></div>
              <div class="border" style={{background: this.myColor(0)}} onClick={(e) => this.selectChoice(0,e)}>
                <div class="d-flex" style={{border: this.myBorder(0)}}>
                  <h2 class="mx-3">A. </h2>
                  <div dangerouslySetInnerHTML={ { __html:   this.state.question.choices[0] } }></div>
                  {(this.state.showAnswerRight=== 0) && <img class="ml-auto px-2" src={solutionRight}/>}
                  {(this.state.showAnswerWrong=== 0) && <img class="ml-auto px-2" src={solutionWrong}/>}
                </div>
              </div>
              <div class="border" style={{background: this.myColor(1)}} onClick={(e) => this.selectChoice(1,e)}>
                <div class="d-flex" style={{border: this.myBorder(1)}}>
                  <h2 class="mx-3">B. </h2>
                  <div dangerouslySetInnerHTML={ { __html:   this.state.question.choices[1] } }></div>
                  {(this.state.showAnswerRight=== 1) && <img class="ml-auto px-2" src={solutionRight}/>}
                  {(this.state.showAnswerWrong=== 1) && <img class="ml-auto px-2" src={solutionWrong}/>}
                </div>
              </div>
              <div class="border" style={{background: this.myColor(2)}} onClick={(e) => this.selectChoice(2,e)}>
                <div class="d-flex" style={{border: this.myBorder(2)}}>
                  <h2 class="mx-3">C. </h2>
                  <div dangerouslySetInnerHTML={ { __html:   this.state.question.choices[2] } }></div>
                  {(this.state.showAnswerRight=== 2) && <img class="ml-auto px-2" src={solutionRight}/>}
                  {(this.state.showAnswerWrong=== 2) && <img class="ml-auto px-2" src={solutionWrong}/>}
                </div>
              </div>
              <div class="border" style={{background: this.myColor(3)}} onClick={(e) => this.selectChoice(3,e)}>
                <div class="d-flex" style={{border: this.myBorder(3)}}>
                  <h2 class="mx-3">D. </h2>
                  <div dangerouslySetInnerHTML={ { __html:   this.state.question.choices[3] } }></div>
                  {(this.state.showAnswerRight=== 3) && <img class="ml-auto px-2" src={solutionRight}/>}
                  {(this.state.showAnswerWrong=== 3) && <img class="ml-auto px-2" src={solutionWrong}/>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {(this.state.state === 0) && <button class="btn btn-info btn-lg  m-5" onClick={(e) => this.submit(e)}>Submit</button>}
        {(this.state.state === 1) && <button class="btn btn-info btn-lg  m-5" onClick={(e) => this.nextQuestion(e)}>Next</button>}
        {(this.state.state === 2) && <button class="btn btn-info btn-lg  m-5" onClick={(e) => this.popUpScore(e)}>Finish</button>}
        {(this.state.state === 3) && <button class="btn btn-info btn-lg  m-5" onClick={(e) => this.nextSolution(e)}>Next</button>}
      </div>
      {this.state.popup &&
        <Popup
          title='Your score'
          score={this.state.score}
          max={answers.answers.length}
          closePopup={this.togglePopup.bind(this)}
          button=<button class="badge badge-pill badge-warning btn-lg text-white" onClick={(e) => this.seeSolution(e)}>See Solution</button>
        />
      }
    </div>
    }
    </div>
    );
  }
}

export default App;
