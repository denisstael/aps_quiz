import React, { Component } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

//desabiltar os warnings do debug
console.disableYellowBox = true;

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
            <ImageBackground
                source={require('../img/quiz_logo.png')}
                style={styles.bg}>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: null,
        height: null
    },
})