import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {postAnswer, inputChange} from '../state/action-creators'


export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer, postAnswer, inputChange } = props;

  const [disable, setDisabled] = useState(true);
  const [stuff, setStuff] = useState({
    New_Question: "",
    New_True_Answer: "",
    New_False_Answer: ""
  });

  useEffect(() => {
    if(stuff.New_Question.length > 1 && stuff.New_True_Answer.length > 1 && stuff.New_False_Answer.length > 1){
      setDisabled(false);
    }
  },[stuff])



  const onChange = evt => {
    evt.preventDefault();
    setStuff({
      ...stuff,
      [evt.target.name]: evt.target.value
    })
  }

  const onSubmit = evt => {
    evt.preventDefault();
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
        <input type="text" maxLength={50} name="New_Question" value={stuff.New_Question} onChange={onChange} id="newQuestion" placeholder="Enter question" />
        <input type="text" maxLength={50} name="New_True_Answer" value={stuff.New_True_Answer} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
        <input type="text" maxLength={50} name="New_False_Answer" value={stuff.New_False_Answer} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
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
    newFalseAnswer: state.form.newFalseAnswer
  })
}

export default connect(mapStateToProps, {postAnswer, inputChange})(Form);
