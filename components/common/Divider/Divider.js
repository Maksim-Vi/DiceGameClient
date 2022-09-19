import React from 'react';
import {View} from "react-native";
import Text from "../Text/Text";

const Divider = (props) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', padding: props.padding || 0}}>
            <View style={{flex: 1, height: 1, backgroundColor: props.color || 'black'}} />
            {props.text &&
                <View>
                    <Text style={{width: 50, textAlign: 'center'}}>{props.text}</Text>
                </View>
            }
            <View style={{flex: 1, height: 1, backgroundColor: props.color || 'black'}} />
        </View>
    )
};

export default Divider;