import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { postAnswer, questionChange, newFalseChange, newTrueChange, resetForm } from '../state/action-creators'


export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer, postAnswer, questionChange, newTrueChange, newFalseChange} = props;
  const [disable, setDisabled] = useState(true);



  //checks if all inputs have at least 2 characters and changes 
  //the state of the submit button from disabled to enabled



  useEffect(() => {
    let q = props.newQuestion;
    let t = props.newTrueAnswer;
    let f = props.newFalseAnswer;
    if(f === undefined || t === undefined || f === undefined){
      q = "";
      t = "";
      f = "";
    }
      if(q.length > 1 || t.length > 1 || f.length > 1){
        if(props.newQuestion.trim().length < 2 || props.newTrueAnswer.trim().length < 2 || props.newFalseAnswer.trim().length < 2){
          setDisabled(true);
        } else if (props.newQuestion.trim().length >= 2 || props.newTrueAnswer.trim().length >= 2 || props.newFalseAnswer.trim().length >= 2){
          setDisabled(false);
        }
      }
  }, [props.newQuestion, props.newTrueAnswer, props.newFalseAnswer])


  const onSubmit = evt => {
    evt.preventDefault();
    //console.log(props.newQuestion);
    props.postAnswer(props.newQuestion, props.newTrueAnswer, props.newFalseAnswer);
    props.resetForm("", "", "")
    console.log(props.newQuestion);
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

export default connect(mapStateToProps, {postAnswer, questionChange, newTrueChange, newFalseChange, resetForm})(Form)