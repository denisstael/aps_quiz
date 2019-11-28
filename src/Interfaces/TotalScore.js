import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import firebase from '../config/firebase'
import { HeaderBackButton } from 'react-navigation'

let total_questions_math = null
let total_answers_math = null
let total_questions_portuguese = null
let total_answers_portuguese = null
let total_questions_history = null
let total_answers_history = null
let total_questions_geography = null
let total_answers_geography = null

export default class TotalScore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status_data: false
        }
    }

    componentDidMount() {
        this.getScoreFromDatabase()
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Score',
            headerLeft: (<HeaderBackButton onPress={() => { navigation.navigate('Subjects') }} />)
        }
    }

    getScoreFromDatabase() {
        let data = undefined
        firebase.database().ref().once('value', function (snapshot) {
            data = snapshot.val()
        }).then(() => {
            if (data != undefined) {
                let math_score = data.math_score
                let portuguese_score = data.portuguese_score
                let history_score = data.history_score
                let geography_score = data.geography_score

                total_questions_math = math_score.total
                total_answers_math = math_score.answers

                total_questions_portuguese = portuguese_score.total
                total_answers_portuguese = portuguese_score.answers

                total_questions_history = history_score.total
                total_answers_history = history_score.answers

                total_questions_geography = geography_score.total
                total_answers_geography = geography_score.answers

                this.setState({ status_data: true })
            }
        })
    }

    resetScore() {
        firebase.database().ref().once('value', function (snapshot) {
            let data = snapshot.val()
            if (data != undefined) {
                firebase.database().ref('math_score/').set({
                    total: 0,
                    answers: 0
                }).catch((error) => {
                    Alert.alert('Erro!')
                })

                firebase.database().ref('portuguese_score/').set({
                    total: 0,
                    answers: 0
                }).catch((error) => {
                    Alert.alert('Erro!')
                })

                firebase.database().ref('history_score/').set({
                    total: 0,
                    answers: 0
                }).catch((error) => {
                    Alert.alert('Erro!')
                })

                firebase.database().ref('geography_score/').set({
                    total: 0,
                    answers: 0
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            }
        }).then(() => { 
            this.setState({ status_data: false })
            this.getScoreFromDatabase() 
        })
    }

    percentageRightAnswers(total_questions, right_answers) {
        if (!total_questions) {
            return '0'
        } else {
            let total = (right_answers / total_questions) * 100 
            return total
        }
    }

    scoreData() {
        return (
            <View>
                <Text>
                    Matemática: {this.percentageRightAnswers(total_questions_math, total_answers_math)} %
                </Text>
                <Text>
                    Português: {this.percentageRightAnswers(total_questions_portuguese, total_answers_portuguese)} %
                </Text>
                <Text>
                    História: {this.percentageRightAnswers(total_questions_history, total_answers_history)} %
                </Text>
                <Text>
                    Geografia: {this.percentageRightAnswers(total_questions_geography, total_answers_geography)} %
                </Text>
            </View>
        )
    }

    render() {
        let scoreData
        if (this.state.status_data) {
            scoreData = this.scoreData()
        } else {
            scoreData = <View><Text>Carregando...</Text></View>
        }

        return (
            <View>
                {scoreData}
                <TouchableOpacity
                    onPress={
                        () => {
                            this.resetScore()
                        }
                    }>
                    <Text>
                        Zerar Score
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}