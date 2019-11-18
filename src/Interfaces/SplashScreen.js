import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class SplashScreen extends Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                3000
            )
        )
    }

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('Subjects');
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View>
                <Text>Teste</Text>
            </View>
        )
    }
}
