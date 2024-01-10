import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "./Button";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  overflow-y: auto;
  max-height: 80vh;
`;

const ModalHeader = styled.div``;

const ModalFooter = styled.div``;

const SecondaryButton = styled(PrimaryButton)`
  background-color: #f44336;

  &:hover {
    background-color: white;
	color: black;
	border: 1px solid #f44336;
  }
`;

const CustomModal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>{title}</ModalHeader>
        {children}
        <ModalFooter>
          <SecondaryButton onClick={onClose} > Close </SecondaryButton>
        </ModalFooter>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default CustomModal;
