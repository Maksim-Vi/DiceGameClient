import React from 'react';
import Text from "../../../../common/Text/Text";

const GiftTimer = (props) => {

    const {timeData} = props

    let time = '00:00'

    if(timeData.hours > 0){
        const hours = timeData.hours < 10 ? '0' + timeData.hours : timeData.hours
        const minutes = timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes
        time = hours + ':' + minutes
    }

    if(timeData.hours <= 0 && timeData.minutes > 0){
        const minutes = timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes
        const seconds = timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds
        time = minutes + ':' + seconds
    }

    if(timeData.hours <= 0 && timeData.minutes <= 0 && timeData.seconds > 0){
        const seconds = timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds
        time = seconds
    }

    return (
        <React.Fragment>
            {timeData && (timeData.hours > 0 || timeData.minutes > 0 || timeData.seconds > 0) &&
                <Text center>{time}</Text>
            }
        </React.Fragment>
    )
}

export default GiftTimer;