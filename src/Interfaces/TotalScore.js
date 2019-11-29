import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
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
        }).catch((error) => { Alert.alert('Verifique sua conexão!') })
    }

    percentageRightAnswers(total_questions, right_answers) {
        if (!total_questions) {
            return <Text style={styles.txt}>Nenhuma questão respondida</Text>
        } else {
            let total = (right_answers / total_questions) * 100
            if (total < 10) {
                return (
                    <View>
                        <Text style={styles.txt}>
                            Respondidas: {total_questions}
                        </Text>
                        <Text style={styles.txt}>
                            Corretas: {right_answers}
                        </Text>
                        <Text style={styles.txtPercentageBad}>{total.toPrecision(1)}%</Text>
                    </View>
                )
            } else if (total >= 10 && total <= 25) {
                return (
                    <View>
                        <Text style={styles.txt}>
                            Respondidas: {total_questions}
                        </Text>
                        <Text style={styles.txt}>
                            Corretas: {right_answers}
                        </Text>
                        <Text style={styles.txtPercentageBad}>{total.toPrecision(2)}%</Text>
                    </View>
                )
            } else if (total > 20 && total <= 50) {
                return (
                    <View>
                        <Text style={styles.txt}>
                            Respondidas: {total_questions}
                        </Text>
                        <Text style={styles.txt}>
                            Corretas: {right_answers}
                        </Text>
                        <Text style={styles.txtPercentageRegular}>{total.toPrecision(2)}%</Text>
                    </View>
                )
            } else if (total > 50 && total <= 75) {
                return (
                    <View>
                        <Text style={styles.txt}>
                            Respondidas: {total_questions}
                        </Text>
                        <Text style={styles.txt}>
                            Corretas: {right_answers}
                        </Text>
                        <Text style={styles.txtPercentageGood}>{total.toPrecision(2)}%</Text>
                    </View>
                )
            } else if (total > 75 && total < 100) {
                return (
                    <View>
                        <Text style={styles.txt}>
                            Respondidas: {total_questions}
                        </Text>
                        <Text style={styles.txt}>
                            Corretas: {right_answers}
                        </Text>
                        <Text style={styles.txtPercentageExcelent}>{total.toPrecision(2)}%</Text>
                    </View>
                )
            } else if (total == 100) {
                return (
                    <View>
                        <Text style={styles.txt}>
                            Respondidas: {total_questions}
                        </Text>
                        <Text style={styles.txt}>
                            Corretas: {right_answers}
                        </Text>
                        <Text style={styles.txtPercentageExcelent}>{total.toPrecision(3)}%</Text>
                    </View>
                )
            }
        }
    }

    scoreData() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.containerRow}>
                        <View style={styles.containerRow}>
                            <View style={styles.containerColumn}>
                                <Text>
                                    Matemática:
                                </Text>
                                {this.percentageRightAnswers(total_questions_math, total_answers_math)}
                            </View>
                        </View>
                        <View style={styles.containerRow}>
                            <View style={styles.containerColumn}>
                                <Text>
                                    Português:
                                </Text>
                                {this.percentageRightAnswers(total_questions_portuguese, total_answers_portuguese)}
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerRow2}>
                        <View style={styles.containerRow}>
                            <View style={styles.containerColumn}>
                                <Text>
                                    História:
                                </Text>
                                {this.percentageRightAnswers(total_questions_history, total_answers_history)}
                            </View>
                        </View>
                        <View style={styles.containerRow}>
                            <View style={styles.containerColumn}>
                                <Text>
                                    Geografia:
                                </Text>
                                {this.percentageRightAnswers(total_questions_geography, total_answers_geography)}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.containerButton}>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.buttonScore}
                            onPress={() => {
                                this.props.navigation.navigate("Subjects")
                            }}>
                            <Text>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.buttonScore}
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
                </View>
            </View>
        )
    }

    render() {
        let scoreData
        if (this.state.status_data) {
            scoreData = this.scoreData()
        } else {
            scoreData = <View style={styles.container}>
                <View style={styles.containerRow}><Text>Carregando...</Text></View>
            </View>
        }

        return (
            <View style={styles.container}>{scoreData}</View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    containerRow: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    containerRow2: {
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'row',
        flex: 1
    },
    containerButton: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerColumn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#def7f7',
        borderRadius: 25,
        borderColor: '#9899ff',
        borderWidth: 2,
        margin: 10,
        padding: 10,
        width: 160,
        height: 180
    },
    buttonScore: {
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
    txt: {
        textAlign: 'center'
    },
    txtPercentageBad: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'red'
    },
    txtPercentageRegular: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'orange'
    },
    txtPercentageGood: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#c2de17'
    },
    txtPercentageExcelent: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'green'
    }
})