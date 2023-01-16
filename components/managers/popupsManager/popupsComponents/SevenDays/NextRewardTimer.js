import React, {useEffect, useState} from 'react';
import Timer from "../../../../common/Timer/Timer";
import Text from "../../../../common/Text/Text";
import moment from 'moment'

const NextRewardTimer = (props) => {

    const [timeData, setTimeData] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalTime: 0
    })

    const updateTimeData = (data) =>{
        if(data.hours === 0 && data.minutes === 0 && data.seconds === 0){
            timer.stop()
        }

        setTimeData(data)
    }

    let timer = new Timer(updateTimeData)



    const getTimeFormatter = () =>{
        let time = '00:00:00'

        if(timeData.hours > 0){
            const hours = timeData.hours < 10 ? '0' + timeData.hours : timeData.hours
            const minutes = timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes
            const seconds = timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds
            time = hours + 'h : ' + minutes + 'm : ' + seconds + 's'
        }

        return time
    }

    useEffect(()=>{
        const today = Date.now() / 1000
        const tomorrow = moment.utc().add(1, 'day').startOf('day').unix()

        if(tomorrow > 0){
            timer.stop()
            timer.start(Math.floor(today + (tomorrow - today)))
        }

        return ()=>{
            timer.stop()
            timer = null
        }
    },[])

    return (
        <React.Fragment>
            {timeData && (timeData.hours > 0 || timeData.minutes > 0 || timeData.seconds > 0) &&
                <Text center>{getTimeFormatter()}</Text>
            }
        </React.Fragment>
    )
}

export default NextRewardTimer;