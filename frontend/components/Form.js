import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {postAnswer, inputChange, setMessage} from '../state/action-creators'


export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer, postAnswer, inputChange} = props;

  const [disable, setDisabled] = useState(true);
  const [stuff, setStuff] = useState({
    New_Question: "",
    New_True_Answer: "",
    New_False_Answer: ""
  });

console.log(props.newQuestion)

  //checks if all inputs have at least 2 characters and changes 
  //the state of the submit button from disabled to enabled
 useEffect(() => {
    //console.log(props.newQuestion)
    let falsey = stuff.New_False_Answer.trim();
    let truthy = stuff.New_True_Answer.trim();
    let Q = stuff.New_Question.trim();
    if(Q.length > 1 && truthy.length > 1 && falsey.length > 1){
      setDisabled(false);
  } else if(Q.length < 1 || truthy.length < 1 || falsey.length < 1){
      setDisabled(true);
  }
 })

 



  const onChange = evt => {
    evt.preventDefault();
    //console.log("butts");
    setStuff({
      ...stuff,
      [evt.target.name]: evt.target.value
    })
  }

  const onSubmit = evt => {
    evt.preventDefault();
    console.log(props.newQuestion);
    props.postAnswer(stuff.New_Question, stuff.New_True_Answer, stuff.New_False_Answer)
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
        <input type="text" maxLength={50} name="New_Question" value={props.newQuestion} onChange={(e) => dispatchEvent(inputChange(e.target.value))} id="newQuestion" placeholder="Enter question" />
        <input type="text" maxLength={50} name="New_True_Answer" value={props.newTrueAnswer} onChange={(e) => dispatchEvent(inputChange(e.target.value))} id="newTrueAnswer" placeholder="Enter true answer" />
        <input type="text" maxLength={50} name="New_False_Answer" value={props.newFalseAnswer} onChange={(e) => dispatchEvent(inputChange(e.target.value))} id="newFalseAnswer" placeholder="Enter false answer" />
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

export default connect(mapStateToProps, {postAnswer, inputChange})(Form);
