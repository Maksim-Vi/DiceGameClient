import React from 'react';
import styled from "styled-components";
import Modal from "react-native-modal";

const ModalWrapper = ({modalVisible,setModalVisible,children}) => {
    return (
        <Modal animationIn={'slideInUp'}
               animationInTiming={300}
               animationOut={'slideOutDown'}
               animationOutTiming={300}
               onSwipeComplete={() => setModalVisible(false)}
               swipeDirection="down"
               isVisible={modalVisible}>
            <ModalContainer>
                {children}
            </ModalContainer>
        </Modal>
    );
}

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export default ModalWrapper;