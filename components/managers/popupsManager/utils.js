export const updateManager = (props) =>{
    if(!props) return []

    return [
        props.deleteAccountPopup.visible,
        props.lvlUpPopup.visible,
        props.tutorialPopup.visible,
        props.avatarPopup.visible,
        props.settingsPopup.visible,
        props.infoPopup.visible,
        props.googleConfirmUsernamePopup.visible,
        props.lostConnOpponentPopup.visible,
        props.collectItemPopup.visible,
        props.botGameTypesPopup.visible,
        props.rewardsPopup.visible,
        props.invitationPopup.visible,
        props.adFlashPopup.visible,
        props.notEnoughFlashPopup.visible,
        props.testBtnsPopup.visible,
        props.sevenDaysPopup.visible
    ]
}