// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import { 
  MOVE_CLOCKWISE, 
  FETCH_QUIZ,
  POST_ANSWER,
  SET_INTO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
  QUESTION_CHANGE,
  NEW_TRUE_CHANGE,
  NEW_FALSE_CHANGE,
  SET_ANSWER,
  SET_SELECTED_ANSWER,
  SET_QUIZ,

} from "./action-types";

const initialWheelState = {
  initialNumber: 0,
  className: "",
  clickRight: false,
  clickLeft: false
}



function wheel(state = initialWheelState, action) {
  //console.log(state);
  switch(action.type) {
    case MOVE_CLOCKWISE:
      //console.log(action.payload.initialNumber)
      return {
        ...state,
        initialNumber: action.payload.initialNumber, 
        className: action.payload.className,
        clickRight: action.payload.clickRight,
        clickLeft: action.payload.clickLeft
      }
    default:
      return(state);
  }
}



const initialQuizState = {
    question: "",
    id: 0,
    answer1: "",
    answer2: '',
    answer1Id: "",
    answer2Id: "",
    true_false_message: ""
}
function quiz(state = initialQuizState, action) {
  //console.log(state);
  switch(action.type){
    case "FETCH_QUIZ":
      return {
        ...state,
      }
      case "SET_QUIZ":
        return{
          ...state,
        question: action.payload.Question,
        id: action.payload.Id,
        answer1: action.payload.Answer1,
        answer2: action.payload.Answer2,
        answer1Id: action.payload.Answer1Id,
        answer2Id: action.payload.Answer2Id,
        }
    default:
    return (state)
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case "SET_SELECTED_ANSWER":
      return{
        ...state,
        initialSelectedAnswerState: action.payload
      }
      default:
        return(state);
  }
  return state
}

const initialMessageState = {
  message: "Nice Job!"
}
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case "SET_INTO_MESSAGE":
      return{
        ...state,
        message: action.payload
      }
      default:
        return(state);
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case "SET_ANSWER":
      return{
        ...state,
        newQuestion: action.payload.NewQuestion,
        newTrueAnswer: action.payload.NewTrueAnswer,
        newFalseAnswer: action.payload.NewFalseAnswer
      }
      case "QUESTION_CHANGE":
        return({
          ...state,
          newQuestion: action.payload
        })
      case "NEW_TRUE_CHANGE":
        return({
          ...state,
          newTrueAnswer: action.payload
        })
      case "NEW_FALSE_CHANGE":
        return({
          ...state,
          newFalseAnswer: action.payload})
      case "RESET_FORM":
        return({
          ...state,
          newQuestion: action.payload.questionTextBox,
          newTrueAnswer: action.payload.trueTextBox,
          newFalseAnswer: action.payload.falseTextBox
        })
      case "POST_ANSWER":
        return{
          ...state
        }
  }
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
