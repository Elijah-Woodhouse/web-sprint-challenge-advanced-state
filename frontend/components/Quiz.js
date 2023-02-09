import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, postQuiz } from '../state/action-creators';


function Quiz(props) {
  const [ selected1, setSelected1 ] = useState(false)
  const [ selected2, setSelected2 ] = useState(false)
  const { answer1, answer2, answer1Id, answer2Id, question, id, fetchQuiz, postQuiz} = props;

  useEffect(() => {
    //console.log(props.id)
    fetchQuiz();
    //console.log(props.id)
  }, [])


  //console.log(props.answer1Id, "answer id");

  //console.log(props);


  const toggleSelected = (e) => {
    e.preventDefault();
  }

  const handleSelect1 = (e) => {
    setSelected1(!selected1);
    selected2 ? setSelected2(!selected1) : setSelected2(selected1);

  }

  const handleSelect2 = (e) => {
    setSelected2(!selected2);
    selected1 && selected2 ? setSelected1(!selected1) : setSelected1(selected1);
  }

  const onSubmit = (e) => {
    //console.log(props.id, props.answer1Id);
    selected1 ? postQuiz(props.id, props.answer1Id) : postQuiz(props.id, props.answer2Id);
  }


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>{props.question}</h2>

            <div id="quizAnswers">
              {selected1 ? 

              <div className="answer selected">
                {props.answer1}
                <button onClick={handleSelect1}>
                  { selected1 ? <div>SELECTED</div> : <div>Select</div>}
                </button>
              </div> :

              <div className="answer">
                {props.answer1}
                <button onClick={handleSelect1}>
                  { selected1 ? <div>SELECTED</div> : <div>Select</div>}
                </button>
              </div>}

              {selected2 ? 
              <div className="answer selected">
                {props.answer2}
                <button onClick={handleSelect2}>
                  { selected2 ? <div>SELECTED</div> : <div>Select</div>}
                </button>
              </div> : 

              <div className="answer">
              {props.answer2}
              <button onClick={handleSelect2}>
                { selected2 ? <div>SELECTED</div> : <div>Select</div>}
              </button>
            </div>}
            </div>

            <button id="submitAnswerBtn" onClick={onSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state.wheel.initialNumber);

  return({
    answer1: state.quiz.answer1,
    answer2: state.quiz.answer2,
    answer1Id: state.quiz.answer1Id,
    answer2Id: state.quiz.answer2Id,
    question: state.quiz.question,
    id: state.quiz.id,
  })
}

export default connect(mapStateToProps, {fetchQuiz, postQuiz})(Quiz);