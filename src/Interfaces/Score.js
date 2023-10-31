import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native'
import database from '@react-native-firebase/database';

let image = null

export default class Score extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_questions: null,
            right_answers: null
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Resultado',
            headerLeft: null
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            total_questions: this.props.navigation.state.params.total_questions,
            right_answers: this.props.navigation.state.params.right_answers
        })
        if (this.props.navigation.state.params.subject == "Matemática") {
            image = require('../img/math_score.png')
        } else if (this.props.navigation.state.params.subject == "Português") {
            image = require('../img/portuguese_score.png')
        } else if (this.props.navigation.state.params.subject == "História") {
            image = require('../img/history_score.png')
        } else if (this.props.navigation.state.params.subject == "Geografia") {
            image = require('../img/geography_score.png')
        }
    }

    sendScoreToDataBase() {
        let total_questions = this.state.total_questions
        let right_answers = this.state.right_answers
        let total_questions_db = 0
        let right_answers_db = 0

        if (this.props.navigation.state.params.subject == "Matemática") {
            database().ref('Score/').once('value', function (snapshot) {
                let data = snapshot.val()
                if (data != undefined) {
                    let math_score = data.math_score
                    total_questions_db = math_score.total
                    right_answers_db = math_score.answers
                }
            }).then(function () {
                database().ref('Score/math_score/').set({
                    total: total_questions + total_questions_db,
                    answers: right_answers + right_answers_db
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            }).catch((error) => {
                Alert.alert('Erro ao salvar os dados!')
            })
        } else if (this.props.navigation.state.params.subject == "Português") {
            database().ref('Score/').once('value', function (snapshot) {
                let data = snapshot.val()
                if (data != undefined) {
                    let portuguese_score = data.portuguese_score
                    total_questions_db = portuguese_score.total
                    right_answers_db = portuguese_score.answers
                }
            }).then(function () {
                database().ref('Score/portuguese_score/').set({
                    total: total_questions + total_questions_db,
                    answers: right_answers + right_answers_db
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            })
        } else if (this.props.navigation.state.params.subject == "História") {
            database().ref('Score/').once('value', function (snapshot) {
                let data = snapshot.val()
                if (data != undefined) {
                    let history_score = data.history_score
                    total_questions_db = history_score.total
                    right_answers_db = history_score.answers
                }
            }).then(function () {
                database().ref('Score/history_score/').set({
                    total: total_questions + total_questions_db,
                    answers: right_answers + right_answers_db
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            })
        } else if (this.props.navigation.state.params.subject == "Geografia") {
            database().ref('Score/').once('value', function (snapshot) {
                let data = snapshot.val()
                if (data != undefined) {
                    let geography_score = data.geography_score
                    total_questions_db = geography_score.total
                    right_answers_db = geography_score.answers
                }
            }).then(function () {
                database().ref('Score/geography_score/').set({
                    total: total_questions + total_questions_db,
                    answers: right_answers + right_answers_db
                }).catch((error) => {
                    Alert.alert('Erro!')
                })
            })
        }
        // Alert.alert('Dados salvos com sucesso!')
        this.props.navigation.navigate("Subjects")
    }

    render() {
        return (
            <ImageBackground
                imageStyle={{ opacity: 0.2 }}
                source={require('../img/background_app.png')}
                style={styles.bg}>
                <View style={styles.container}>
                    <View style={styles.containerImage}>
                        <ImageBackground
                            style={styles.image_score}
                            source={image}>
                            <View style={styles.containerResult}>
                                <Text style={styles.txtResult}>
                                    {this.state.total_questions}
                                </Text>
                                <Text style={styles.txtResult}>
                                    {this.state.right_answers}
                                </Text>
                            </View>
                        </ImageBackground>

                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.buttonContinue}
                            onPress={
                                () => {
                                    this.sendScoreToDataBase()
                                    // this.props.navigation.navigate("Subjects")
                                }
                            }>
                            <Text style={styles.txtButton}>
                                Continuar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: null,
        height: null,
    },
    container: {
        flex: 1
    },
    containerImage: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerResult: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 70,
        marginTop: 1
    },
    buttonContinue: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#9899ff',
        margin: 10
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    txtButton: {
        fontSize: 15,
        color: '#e0e0e0',
        fontWeight: 'bold'
    },
    txtResult: {
        fontSize: 23,
        color: '#ffffff'
    },
    image_score: {
        width: 330,
        height: 250
    }
})