import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class Subjects extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Matérias'
    }

    screenQuestions(title) {
        this.props.navigation.navigate("Questions", { title: title })
    }

    render() {
        return (
            <View>
                <Text>Tela 2</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.screenQuestions("Matemática")
                    }}>
                    <Text>Matemática</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.screenQuestions("Português")
                    }}>
                    <Text>Português</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.screenQuestions("História")
                    }}>
                    <Text>História</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.screenQuestions("Geografia")
                    }}>
                    <Text>Geografia</Text>
                </TouchableOpacity>

            </View>
        )
    }
}