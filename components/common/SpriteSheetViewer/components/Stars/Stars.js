import React, {useEffect} from 'react';
import SpriteSheet from "../../SpriteSheet";
import AnimFaer from "../../../../../assets/animation/spriteSheet/star/stars.png";
import styled from "styled-components";

const Stars = (props) => {
    let mummy = null

    const play = (type) => {
        mummy.play({
            type: type,
            fps: Number(4),
            loop: false,
            resetAfterFinish: false,
            onFinish: () => {

            }
        });
    };

    const stop = () => {
        mummy.stop(() => {});
    };

    useEffect(()=>{
        play('show')
    },[])


    return (
        <SpriteContainer>
            <SpriteSheet
                ref={ref => (mummy = ref)}
                source={AnimFaer}
                columns={9}
                rows={1}
                width={300}
                offsetX={-140}
                animations={{
                    show: [8,7,6,5,4,3,2,1],
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

export default Stars;