import React from 'react';
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import ModalChildrenBuy from "../../../../common/ModalWindows/ModalChildren/ModalChildrenBuy";
import {useDispatch} from "react-redux";
import {setCollectBuyItemPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {useWindowDimensions} from "react-native";

const CollectionBuyItemPopup = ({modal}) => {

    const dispatch = useDispatch()
    const {width,height} = useWindowDimensions()

    const setModalVisible = () =>{
        dispatch(setCollectBuyItemPopup({visible: false, data: null}))
    }

    return (
        <ModalWrapper modalBG={'default'} width={width - 35} height={400} modalVisible={true} setModalVisible={setModalVisible}>
            <ModalChildrenBuy titleItemName={modal.modalName}
                              openItem={modal.openItem}
                              type={modal.modalName}
                              setModalVisible={setModalVisible}/>
        </ModalWrapper>
    );
};

export default CollectionBuyItemPopup;