import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import firebase from '../config/firebase'

export default class Score extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_questions: null,
            right_answers: null
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            total_questions: this.props.navigation.state.params.total_questions,
            right_answers: this.props.navigation.state.params.right_answers
        })
    }

    static navigationOptions = {
        title: 'Score'
    }

    sendScoreToDataBase() {
        let total_questions = this.state.total_questions
        let right_answers = this.state.right_answers
        let total_questions_db = 0
        let right_answers_db = 0

        if (this.props.navigation.state.params.subject == "Matemática") {
            firebase.database().ref().once('value', function (snapshot) {
                let data = snapshot.val()
                console.log(snapshot.val())
                if (data != undefined) {
                    let math_score = data.math_score
                    total_questions_db = math_score.total
                    right_answers_db = math_score.answers
                }
            }).then(function () {
                firebase.database().ref('math_score/').set({
                    total: total_questions + total_questions_db,
                    answers: right_answers + right_answers_db
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            })
        } else if (this.props.navigation.state.params.subject == "Português") {
            firebase.database().ref().once('value', function (snapshot) {
                let data = snapshot.val()
                if (data != undefined) {
                    let portuguese_score = data.portuguese_score
                    total_questions_db = portuguese_score.total
                    right_answers_db = portuguese_score.answers
                }
            }).then(function () {
                firebase.database().ref('portuguese_score/').set({
                    total: total_questions + total_questions_db,
                    answers: right_answers + right_answers_db
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            })
        } else if (this.props.navigation.state.params.subject == "História") {
            firebase.database().ref().once('value', function (snapshot) {
                let data = snapshot.val()
                if (data != undefined) {
                    let history_score = data.history_score
                    total_questions_db = history_score.total
                    right_answers_db = history_score.answers
                }
            }).then(function () {
                firebase.database().ref('history_score/').set({
                    total: total_questions + total_questions_db,
                    answers: right_answers + right_answers_db
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            })
        } else if (this.props.navigation.state.params.subject == "Geografia") {
            firebase.database().ref().once('value', function (snapshot) {
                let data = snapshot.val()
                if (data != undefined) {
                    let geography_score = data.geography_score
                    total_questions_db = geography_score.total
                    right_answers_db = geography_score.answers
                }
            }).then(function () {
                firebase.database().ref('geography_score/').set({
                    total: total_questions + total_questions_db,
                    answers: right_answers + right_answers_db
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            })
        }
    }

    render() {
        return (
            <View>
                <Text>
                    Questões respondidas: {this.state.total_questions}
                </Text>
                <Text>
                    Respostas corretas: {this.state.right_answers}
                </Text>
                <TouchableOpacity
                    onPress={
                        () => {
                            this.sendScoreToDataBase()
                            this.props.navigation.navigate("Subjects")
                        }
                    }>
                    <Text>
                        Continuar
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }
}