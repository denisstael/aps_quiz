import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import firebase from '../config/firebase'

export default class TotalScore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_questions: null,
            right_answers: null
        }
    }

    componentDidMount() {

    }

    static navigationOptions = {
        title: 'Score'
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
        })
    }

    render() {
        return (
            <View>
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