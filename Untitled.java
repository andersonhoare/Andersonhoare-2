import React, { useEffect } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 3rem;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  z-index: 1000;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

export default function FilledJobPopup({ isOpen, onClose }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <PopupContainer>
        <h2>This job is already filled!</h2>
        <p>Please check our other available opportunities.</p>
      </PopupContainer>
    </>
  );
}
