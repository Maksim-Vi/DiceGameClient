import React, {useEffect} from 'react';
import SpriteSheet from "../../SpriteSheet";
import AnimFaer from "../../../../../assets/animation/spriteSheet/firewark-yellow/Firework.png";
import styled from "styled-components";

const FireworkColor = (props) => {
    let mummy = null

    const play = (type) => {
        mummy.play({
            type: type,
            fps: Number(10),
            loop: false,
            resetAfterFinish: true,
            onFinish: () => {
                stop()
            }
        });
    };

    const stop = () => {
        mummy.stop(() => {
            play('start')
        });
    };

    useEffect(()=>{
        play('show')
    },[])


    return (
        <SpriteContainer>
            <SpriteSheet
                ref={ref => (mummy = ref)}
                source={AnimFaer}
                columns={5}
                rows={8}
                width={200}
                animations={{
                    start: [0],
                    show: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
                }}
            />
        </SpriteContainer>
    )
}

const SpriteContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default FireworkColor