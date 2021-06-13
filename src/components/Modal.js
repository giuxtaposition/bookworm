import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";

function Modal({ children, showModal, setShowModal }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  //ANIMATIONS
  const modalAnimation = useSpring({
    opacity: showModal ? 1 : 0,
    top: showModal ? "0%" : "25%",
    config: { friction: 10 },
  });

  return (
    showModal && (
      <animated.div
        style={modalAnimation}
        className="Modal"
        onClick={closeModal}
      >
        <div className="modal-container" ref={modalRef}>
          {children}
        </div>
      </animated.div>
    )
  );
}
export default Modal;
