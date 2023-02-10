// ❗ You don't need to add extra action creators to achieve MVP
import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  FETCH_QUIZ,
  POST_ANSWER,
  SET_ANSWER,
  SET_INTO_MESSAGE,
  QUESTION_CHANGE,
  NEW_TRUE_CHANGE,
  NEW_FALSE_CHANGE,
  RESET_FORM,
  SET_QUIZ,
  POST_QUIZ,
} from "./action-types";
import axios from 'axios';
import { Action } from "history";


export function moveClockwise(InitialNumber, ClassName, ClickLeft, ClickRight) { 

  //console.log(InitialNumber, ClassName);
  return({
    type: MOVE_CLOCKWISE, 
    payload: {
      initialNumber: InitialNumber, 
      className: ClassName,
      clickLeft: ClickLeft,
      clickRight: ClickRight
    }
  })
}

export function resetForm( questionTextBox, trueTextBox, falseTextBox){
  return({type: RESET_FORM, payload: {
    newQuestion: questionTextBox,
    newTrueAnswer: trueTextBox,
    newFalseAnswer: falseTextBox,
  }})
}

export function moveCounterClockwise(initialNumber) {
  return({type: MOVE_COUNTERCLOCKWISE, payload: initialNumber})
 }

export function setMessage(Message) { 
  return({type: SET_INTO_MESSAGE, payload: { initialMessageState: Message}})
}

export const questionChange = (newText) => {
  return{type: QUESTION_CHANGE, payload: newText.target.value}
 }
 export const newTrueChange = (newText) => {
  return{type: NEW_TRUE_CHANGE, payload: newText.target.value}
 }
 export const newFalseChange = (newText) => {
  return{type: NEW_FALSE_CHANGE, payload: newText.target.value}
}

export function setQuiz(Answer1, Answer2, Answer1Id, Answer2Id, Id, Question ) { 
  return({type: SET_QUIZ, payload: {
    answer1: Answer1,
    answer2: Answer2,
    answer1Id: Answer1Id,
    answer2Id: Answer2Id,
    id: Id, 
    question: Question,
  }
})
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({type: FETCH_QUIZ});
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        // console.log(res.data.question);
        // console.log(res.data.answers[0].text)
        // console.log(res.data.answer[1].text)
        dispatch({type: SET_QUIZ, payload: {
          Answer1: res.data.answers[0].text,
          Answer2: res.data.answers[1].text,
          Answer1Id: res.data.answers[0].answer_id,
          Answer2Id: res.data.answers[1].answer_id,
          Id: res.data.quiz_id,
          Question: res.data.question
        }})
      })
  }
}


//write a new function that sets the new sets up answers and the question to redux state

export function postAnswer(NewQuestion, NewTrueAnswer, NewFalseAnswer) {
  const params = {
    "question_text" : NewQuestion,
    "true_answer_text" : NewTrueAnswer,
    "false_answer_text" : NewFalseAnswer
  }
  return function (dispatch) {
    
    dispatch({type: POST_ANSWER, payload: {
      newQuestion: NewQuestion,
      newTrueAnswer: NewTrueAnswer,
      newFalseAnswer: NewFalseAnswer
    }});
    dispatch({type: SET_INTO_MESSAGE, payload: "Congrats: " + `"${NewQuestion}"` + " is a great question!"})
    axios.post("http://localhost:9000/api/quiz/new", params)
      .then(res => {
        console.log(res);
      })
  }
}

export function postQuiz(QuizId, AnswerId) {
  const params = {
    "quiz_id" : QuizId,
    "answer_id" : AnswerId
  }
  return function (dispatch) {
    dispatch({type: POST_QUIZ});
    //console.log(QuizId, AnswerId)
    dispatch({type: SET_INTO_MESSAGE, payload: "That was the correct answer"})
    axios.post("http://localhost:9000/api/quiz/answer", params)
      .then(res => {
        //console.log(res.data.message);
        dispatch({type: SET_INTO_MESSAGE, payload: res.data.message})
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
