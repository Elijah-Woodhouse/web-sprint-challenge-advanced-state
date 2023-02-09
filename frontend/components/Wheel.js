import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { moveClockwise } from '../state/action-creators';




function Wheel(props) {

  const [active0, set0active] = useState(true);
  const [active1, set1active] = useState(false);
  const [active2, set2active] = useState(false);
  const [active3, set3active] = useState(false);
  const [active4, set4active] = useState(false);
  const [active5, set5active] = useState(false);
  const number = [ 0, 1, 2, 3, 4, 5]

  const { 
    clickLeft, 
    clickRight, 
    initialNumber, 
    className, 
    moveClockwise, 
    moveCounterClockwise } = props;

  useEffect(() => {
      moveClockwise(props.initialNumber, props.className, props.clickLeft, props.clickRight)
  })

  const handleCounterWise = event => {
    event.preventDefault();

    moveClockwise(props.initialNumber, props.className, true, false);
    if (props.initialNumber === 5){
          moveClockwise(4, props.className, false, false)
          set5active(false);
          set4active(true);
    } else if(props.initialNumber === 4){
          moveClockwise(3, props.className, false, false)
          set4active(false);
          set3active(true);
    } else if(props.initialNumber === 3){
          moveClockwise(2, props.className, false, false)
          set3active(false);
          set2active(true);
    } else if(props.initialNumber === 2){
          moveClockwise(1, props.className, false, false)
          set2active(false);
          set1active(true);
    } else if(props.initialNumber === 1){
          moveClockwise(0, props.className, false, false)
          set1active(false);
          set0active(true);
    } else if(props.initialNumber === 0){
          moveClockwise(5, props.className, false, false)
          set0active(false);
          set5active(true);
    } 
  }

  const handleClickWise = event => {
    event.preventDefault();

    moveClockwise(props.initialNumber, props.className, props.clickLeft, true);
    if (props.initialNumber === 5){
          moveClockwise(0, props.className, props.clickLeft, false)
          set5active(false);
          set0active(true);
    } else if(props.initialNumber === 0){
          moveClockwise(1, props.className, props.clickLeft, false)
          set0active(false);
          set1active(true);
    } else if(props.initialNumber === 1){
          moveClockwise(2, props.className, props.clickLeft, false)
          set1active(false);
          set2active(true);
    } else if(props.initialNumber === 2){
          moveClockwise(3, props.className, props.clickLeft, false)
          set2active(false);
          set3active(true);
    } else if(props.initialNumber === 3){
          moveClockwise(4, props.className, props.clickLeft, false)
          set3active(false);
          set4active(true);
    } else if(props.initialNumber === 4){
          moveClockwise(5, props.className, props.clickLeft, false)
          set4active(false);
          set5active(true);
    } 
  }

  // for(let i = 0; i< 6; i++){
  //   active ? 
  //   <div className="cog active" style={{ "--i": i }}>B</div> :
  //   <div className="cog" style={{ "--i": i }}></div>
  // }

  //items[0].props.className



  return (
    <div id="wrapper">
      <div id="wheel">
        {initialNumber === 0 ? <div className="cog active" style={{ "--i": 0 }}>B</div> : <div className="cog" style={{ "--i": 0 }}></div>}
        {initialNumber === 1 ? <div className="cog active" style={{ "--i": 1 }}>B</div> : <div className="cog" style={{ "--i": 1 }}></div>}
        {initialNumber === 2 ? <div className="cog active" style={{ "--i": 2 }}>B</div> : <div className="cog" style={{ "--i": 2 }}></div>}
        {initialNumber === 3 ? <div className="cog active" style={{ "--i": 3 }}>B</div> : <div className="cog" style={{ "--i": 3 }}></div>}
        {initialNumber === 4 ? <div className="cog active" style={{ "--i": 4 }}>B</div> : <div className="cog" style={{ "--i": 4 }}></div>}
        {initialNumber === 5 ? <div className="cog active" style={{ "--i": 5 }}>B</div> : <div className="cog" style={{ "--i": 5 }}></div>}
        {/* --i5is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterWise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClickWise}>Clockwise</button>
      </div>
    </div> 
  )
}

const mapStateToProps = (state) => {
  //console.log(state.wheel.initialNumber);

      console.log(state);

  return({
    initialNumber: state.wheel.initialNumber,
    className: state.wheel.className,
    clickRight: state.wheel.clickRight,
    clickLeft: state.wheel.clickLeft
  })
}

export default connect(mapStateToProps, {moveClockwise})(Wheel);