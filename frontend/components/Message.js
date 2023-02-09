import React, { useEffect, useState } from 'react'
import { setMessage } from '../state/action-creators';
import { connect } from 'react-redux';


function Message(props) {

   useEffect(() => {
    setMessage(message)
   });
  
   return (
   <div id="message">{props.message}</div>
  )}


const mapStateToProps = (state) => {

  return({
    message: state.infoMessage.message
  })
}

export default connect(mapStateToProps, {setMessage})(Message);
