import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const db = require('../../db.json')

export default class Subjects extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Matérias'
    }

    screenQuestions(title, subject) {
        let data = []
        if (subject == "Math") {
            data = db.Math.questions
        } else if (subject == "Portuguese") {
            data = db.Portuguese.questions
        } else if (subject == "History") {
            data = db.History.questions
        } else if (subject == "Geography") {
            data = db.Geography.questions
        }
        this.props.navigation.navigate("Questions", { title: title, data: data })
    }

    render() {
        return (
            <View>
                <Text>Tela 2</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.screenQuestions("Matemática", "Math")
                    }}>
                    <Text>Matemática</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.screenQuestions("Português", "Portuguese")
                    }}>
                    <Text>Português</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.screenQuestions("História", "History")
                    }}>
                    <Text>História</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.screenQuestions("Geografia", "Geography")
                    }}>
                    <Text>Geografia</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("TotalScore")
                    }}>
                    <Text>Score</Text>
                </TouchableOpacity>

            </View>
        )
    }
}