import React from 'react';
import {View} from "react-native";
import Text from "../Text/Text";

const Divider = (props) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            {props.text &&
                <View>
                    <Text style={{width: 50, textAlign: 'center'}}>{props.text}</Text>
                </View>
            }
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
    )
};

export default Divider;