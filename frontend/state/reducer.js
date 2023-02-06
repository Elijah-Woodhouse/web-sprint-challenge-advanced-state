// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM  
} from "./action-types";

const initialWheelState = {
  initialNumber: 0,
  className: ""
}

function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE:
      //console.log(action.payload.initialNumber)
      return {
        ...state,
        initialNumber: action.payload.initialNumber, 
        className: action.payload.className
      }
    case MOVE_COUNTERCLOCKWISE:
      return{
        ...state,
        initialNumber: action.payload.initialNumber,
        className: action.payload.className
      }
    default:
      return(state);
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case "SET_QUIZ_INTO_STATE":
      return {
        ...state,
        initialQuizState: action.payload
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

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case "SET_INTO_MESSAGE":
      return{
        ...state,
        initialMessageState: action.payload
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
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
