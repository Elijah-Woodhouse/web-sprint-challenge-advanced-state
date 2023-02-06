import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';




function Wheel(props) {

  const number = [0, 1, 2, 3, 4, 5];

  const { 
    clickLeft, 
    clickRight, 
    initialNumber, 
    className, 
    moveClockwise, 
    moveCounterClockwise } = props;

  //console.log(props.clickLeft);
console.log(props);
  useEffect(() => {
    props.moveClockwise(props.initialNumber, props.className, props.clickLeft, true);
  })

  console.log(props);
  //InitialNumber, ClassName, ClickLeft, ClickRight

  const handleClickRight = () => {
    moveClockwise(props.initialNumber, props.className, props.clickLeft, true);
    if (props.initialNumber === 5 && props.clickRight === true){
          moveClockwise(0, props.className, props.clickLeft, false)
    }
  }

  const handleClickLeft = e => {

  }



  return (
    <div id="wrapper">
      <div id="wheel">
        <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" >Counter clockwise</button>
        <button id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state.wheel.initialNumber);

  return({
    initialNumber: state.wheel.initialNumber,
    className: state.wheel.className,
    clickRight: state.wheel.clickRight,
    clickLeft: state.wheel.clickLeft
  })
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);