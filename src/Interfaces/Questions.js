import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Questions extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title')
        }
    }

    render() {
        return (
            <View>
                <Text>Questoes</Text>
            </View>
        )
    }
}
