// ❗ You don't need to add extra action creators to achieve MVP
import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  FETCH_QUIZ,
  SET_SELECTED_ANSWER,
  SET_INTO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
  SET_QUIZ,
  POST_QUIZ
} from "./action-types";
import axios from 'axios';
import Quiz from "../components/Quiz";


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

export function moveCounterClockwise(initialNumber) {
  return({type: MOVE_COUNTERCLOCKWISE, payload: initialNumber})
 }

export function selectAnswer() { 
  return({type: SELECT_ANSWER})
}

export function setMessage(Message) { 
  return({type: SET_INTO_MESSAGE, payload: { initialMessageState: Message}})
}

export function inputChange() { 
  return({type: INPUT_CHANGE})
}

export function resetForm() { 
  return({type: RESET_FORM})
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

export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
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
    axios.post("http://localhost:9000/api/quiz/answer", params)
      .then(res => {
        //console.log(res.data.message);
        dispatch({type: SET_INTO_MESSAGE, payload: res.data.message})
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
