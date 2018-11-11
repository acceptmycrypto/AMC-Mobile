import React from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
  return (
    <div>
      <Backdrop ModalShown={props.showModal} ModalClosed={props.closeModal}/>
      <div
        className="Modal"
        style={{
          //show the modal when showModal prop is set to true
          transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.showModal ? '1' : '0'
        }}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal;