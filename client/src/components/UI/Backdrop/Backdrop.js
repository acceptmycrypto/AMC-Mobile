import React from 'react';
import './Backdrop.css';

//backdrop is used for modal
const Backdrop = props => {
  return (
    props.ModalShown ? <div className="Backdrop" onClick={props.ModalClosed}></div> : null
  )
}

export default Backdrop;