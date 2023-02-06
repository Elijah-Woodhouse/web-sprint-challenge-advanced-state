// ❗ You don't need to add extra action creators to achieve MVP
import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM  
} from "./action-types";


export function moveClockwise(InitialNumber, ClassName) { 

  //console.log(InitialNumber, ClassName);
  return({
    type: MOVE_CLOCKWISE, 
    payload: {
      initialNumber: InitialNumber, 
      className: ClassName
    }
  })
}

export function moveCounterClockwise(initialNumber, className) {
  return({type: MOVE_COUNTERCLOCKWISE, payload: initialNumber})
 }

export function selectAnswer() { 
  return({type: SELECT_ANSWER})
}

export function setMessage() { 
  return({type: SET_MESSAGE})
}

export function setQuiz() { 
  return({type: SET_QUIZ})
}

export function inputChange() { 
  return({type: INPUT_CHANGE})
}

export function resetForm() { 
  return({type: RESET_FORM})
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {

  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
