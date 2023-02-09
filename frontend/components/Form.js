import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer } = props;

  //console.log(props.form.newFalseAnswer)

  const [stuff, setStuff] = useState({
    New_Question: "",
    New_True_Answer: "",
    New_False_Answer: ""
  });

  const onChange = evt => {
    evt.preventDefault();
    setStuff({
      ...stuff,
      [evt.target.name]: evt.target.value
    })
  }

  const onSubmit = evt => {
    evt.preventDefault();
    actionCreators.postAnswer(stuff.New_Question, stuff.New_True_Answer, stuff.New_False_Answer)
    console.log(stuff.new_Question)
  }

  return (
    <form id="form">
      <h2>Create New Quiz</h2>
      <input type="text" maxLength={50} name="New_Question" value={stuff.New_Question} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input type="text" maxLength={50} name="New_True_Answer" value={stuff.New_True_Answer} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input type="text" maxLength={50} name="New_False_Answer" value={stuff.New_False_Answer} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" onClick={onSubmit}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  console.log(state.form)

  return({
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer
  })
}

export default connect(st => st, actionCreators)(Form)
