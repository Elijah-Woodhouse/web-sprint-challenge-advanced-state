import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, postQuiz } from '../state/action-creators';


function Quiz(props) {
  const [ selected1, setSelected1 ] = useState(false)
  const [ selected2, setSelected2 ] = useState(false)
  const [ disabled, setDisabled ] = useState(true);
  const { message, answer1, answer2, answer1Id, answer2Id, question, id, fetchQuiz, postQuiz} = props;
  const mountedRef = useRef();
  const [value, setValue] = useState(false);



 useEffect(() => {
  fetchQuiz();
  if(mountedRef.current){
    setValue(true);
  }
  if(value){
    fetchQuiz();
  }
 },[value])


  //console.log(props.answer1Id, "answer id");

  //console.log(props);


  const handleSelect1 = (e) => {
    e.preventDefault();
    if(selected2 === true){
      setSelected2(false);
      setSelected1(true);
      setDisabled(false);
    } else if(selected1 ===false && selected2 === false){
      setSelected1(true);
      setDisabled(false);
    }
  }

  const handleSelect2 = (e) => {
    e.preventDefault();
    if(selected1 === true){
      setSelected1(false);
      setSelected2(true);
      setDisabled(false);
    } else if(selected1 ===false && selected2 === false){
      setSelected2(true);
      setDisabled(false);
    }
  }



  const onSubmit = (e) => {
    //console.log(props.id, props.answer1Id);

    selected1 ? postQuiz(props.id, props.answer1Id) : postQuiz(props.id, props.answer2Id);
    console.log(props.message)
    //setMessage(props.message)
    fetchQuiz();
    setSelected1(false);
    setSelected2(false);
  }


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>{props.question}</h2>

            {selected1 ?  
            <div id="quizAnswers">
              <div className="answer selected">
                {props.answer1}
                <button onClick={handleSelect1}>
                  { selected1 ? <div>SELECTED</div> : <div>select</div>}
                </button>
              </div>

              <div className="answer">
              {props.answer2}
              <button onClick={handleSelect2}>
                { selected2 ? <div>SELECTED</div> : <div>select</div>}
              </button>
            </div>
            </div> :  
            <div id="quizAnswers">
              <div className="answer">
                {props.answer1}
                <button onClick={handleSelect1}>
                  { selected1 ? <div>SELECTED</div> : <div>select</div>}
                </button>
              </div>

              <div className="answer selected">
              {props.answer2}
              <button onClick={handleSelect2}>
                { selected2 ? <div>SELECTED</div> : <div>select</div>}
              </button>
            </div>
            </div>}

            <button id="submitAnswerBtn" disabled={disabled} onClick={onSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state);

  return({
    answer1: state.quiz.answer1,
    answer2: state.quiz.answer2,
    answer1Id: state.quiz.answer1Id,
    answer2Id: state.quiz.answer2Id,
    question: state.quiz.question,
    id: state.quiz.id,
    message: state.infoMessage.message
  })
}

export default connect(mapStateToProps, {fetchQuiz, postQuiz})(Quiz);