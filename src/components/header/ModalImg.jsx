import { useEffect } from 'react';
import { ModalContent, ModalOverlay } from './headerStyle';
import ghost from '../../assets/ghost.jpg';

const ModalImg = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <img src={ghost} alt="" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalImg;
