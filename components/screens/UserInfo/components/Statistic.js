import React from 'react';
import styled from "styled-components";
import Text from "../../../common/Text/Text";

const Statistic = (props) => {
    return (
        <ProfileStatistic>
            <Text>Statistic</Text>
            <Text>Statistic</Text>
            <Text>Statistic</Text>
        </ProfileStatistic>
    )
}

const ProfileStatistic = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  height: auto;
  margin-top: 10%;
  background-color: #2281ce;
  border-radius: 20px;
  border: 3px solid #2b4b8d;
`
export default Statistic;