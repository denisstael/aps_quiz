import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class SplashScreen extends Component {
    
    static navigationOptions = {
        header: null        
    }
    
    render() {
        return(
            <View>
                <Text>Teste</Text>
            </View>
        )
    }
}
