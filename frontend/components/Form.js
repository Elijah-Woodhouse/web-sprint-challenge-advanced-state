import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {postAnswer, questionChange, newFalseChange, newTrueChange} from '../state/action-creators'


export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer, postAnswer, questionChange, newTrueChange, newFalseChange} = props;
  const [disable, setDisabled] = useState(false);
  const [stuff, setStuff] = useState({
    New_Question: "",
    New_True_Answer: "",
    New_False_Answer: ""
  });


  //checks if all inputs have at least 2 characters and changes 
  //the state of the submit button from disabled to enabled


  const onSubmit = evt => {
    evt.preventDefault();
    console.log(props.newQuestion);
    props.postAnswer(props.newQuestion, props.newTrueAnswer, props.newFalseAnswer)
    setStuff({
      New_Question: "",
      New_True_Answer: "",
      New_False_Answer: ""
    });
  }

  return (
    <div>
      <form id="form">
        <h2>Create New Quiz</h2>
        <input type="text" maxLength={50} name="New_Question" value={props.newQuestion} onChange={questionChange} id="newQuestion" placeholder="Enter question" />
        <input type="text" maxLength={50} name="New_True_Answer" value={props.newTrueAnswer} onChange={newTrueChange} id="newTrueAnswer" placeholder="Enter true answer" />
        <input type="text" maxLength={50} name="New_False_Answer" value={props.newFalseAnswer} onChange={newFalseChange} id="newFalseAnswer" placeholder="Enter false answer" />
        <button id="submitNewQuizBtn" disabled={disable} onClick={onSubmit}>Submit new quiz</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state.form)

  return({
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer,
  })
}

export default connect(mapStateToProps, {postAnswer, questionChange, newTrueChange, newFalseChange})(Form)