export const isAppScreen = (props) =>{
    if(!props) return false
    return props.activeTabApp !== 'LoadingProject' && (props.activeTabApp === 'App' || props.activeTabApp === 'MainScreen')
}

export const updateManager = (props) =>{
    if(!props) return []

    return [
        props.deleteAccountPopup.visible,
        (isAppScreen(props) && props.lvlUpPopup.visible),
        (isAppScreen(props) && props.tutorialPopup.visible),
        props.avatarPopup.visible,
        props.settingsPopup.visible,
        props.infoPopup.visible,
        props.googleConfirmUsernamePopup.visible,
        props.lostConnOpponentPopup.visible,
        props.collectItemPopup.visible,
        props.collectBuyItemPopup.visible,
        props.botGameTypesPopup.visible,
        props.rewardsPopup.visible,
        props.invitationPopup.visible,
        props.adFlashPopup.visible,
        props.notEnoughFlashPopup.visible,
        props.testBtnsPopup.visible,
        props.coinsInfoPopup.visible,
        props.diamondsInfoPopup.visible,
        props.flashInfoPopup.visible,
        (isAppScreen(props) && props.sevenDaysPopup.visible)
    ]
}