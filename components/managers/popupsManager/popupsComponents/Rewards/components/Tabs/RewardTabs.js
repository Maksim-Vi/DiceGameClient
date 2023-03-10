import React from 'react';
import styled from "styled-components";
import sevenDaysImg from "../../../../../../../assets/Gifts/calender7-icon.png";
import defImage from "../../../../../../../assets/Gifts/calendar.png";
import Tab from "./Tab";

const RewardTabs = (props) => {
    return (
        <RewardsTabsContainer>

            <Tab isActive={props.tab === 'sevenDays'}
                 nameTab={'sevenDays'}
                 image={sevenDaysImg}
                 text={'7 days Rewards'}
                 changeTab={props.changeTab}/>

            <Tab isActive={props.tab === 'DailyRewards'}
                 nameTab={'DailyRewards'}
                 image={defImage}
                 text={'Daily Rewards'}
                 changeTab={props.changeTab}/>

        </RewardsTabsContainer>
    );
};

const RewardsTabsContainer = styled.View`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  width: 100%;
  margin-left: 10px;
`

export default RewardTabs;