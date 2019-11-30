import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, ImageBackground, StyleSheet } from 'react-native'
import { HeaderBackButton } from 'react-navigation';

let allQuestions = []
let chosen_questions = []
let chosen_wrong_answers = []

let chosen_answers = []
let right_answers = null
let answer_pressed = null

let image_background = null

function randomNumber(start, end) {
    return Math.floor(Math.random() * end) + start
}

export default class Questions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: 0,
            status: 0
        }
    }

    UNSAFE_componentWillMount() {
        allQuestions = this.props.navigation.state.params.data
        subject = this.props.navigation.state.params.title
        right_answers = 0
        this.chooseQuestionsRandomly()
        if (subject == 'Matemática') {
            image_background = require('../img/math_background.png')
        } else if (subject == 'Português') {
            image_background = require('../img/portuguese_background.png')
        } else if (subject == 'Geografia') {
            image_background = require('../img/geography_background.png')
        } else if (subject == 'História') {
            image_background = require('../img/history_background.png')
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
            headerLeft: (<HeaderBackButton onPress={() => { navigation.navigate('Subjects') }} />)
        }
    }

    //Escolhe aleatoriamente as 5 questões que serão utilizadas 
    chooseQuestionsRandomly() {
        let number = null
        let numbers = []
        let questions = []
        while (numbers.length < 5) {
            number = randomNumber(0, 14)
            if (!numbers.includes(number)) {
                numbers.push(number)
                questions.push(allQuestions[number])
            }
        }
        chosen_questions = questions
    }

    //Escolhe aleatoriamente 3 respostas erradas da questão passada como parâmetro
    chooseWrongAnswersRandomly(question) {
        let number = null
        let numbers = []
        let answers = []
        while (numbers.length < 3) {
            number = randomNumber(0, 6)
            if (!numbers.includes(number)) {
                numbers.push(number)
                answers.push(question.question.wrong_alternatives[number])
            }
        }
        chosen_wrong_answers = answers
    }

    verifyAnswer(idAnswer) {
        answer_pressed = idAnswer
        if (this.state.status == 0) {
            if (idAnswer == 8) {
                right_answers += 1
                this.setState({
                    status: 1
                })
            } else {
                //wrong
                this.setState({
                    status: -1
                })
            }
        }
    }

    checkScore() {
        this.props.navigation.navigate("Score", {
            total_questions: this.state.question,
            right_answers: right_answers,
            subject: this.props.navigation.state.params.title
        })
    }

    mountAnswers(question) {
        chosen_answers = []
        let right_answer = question.question.right_alternative[0]
        let position = randomNumber(0, 3)
        let i = 0
        while (chosen_answers.length < 4) {
            if (chosen_answers.length == position) {
                chosen_answers.push(right_answer)
            } else {
                chosen_answers.push(chosen_wrong_answers[i])
                i += 1
            }
        }
    }

    renderAlternatives = ({ item }) => (
        <View>
            <TouchableOpacity disabled={this.state.status != 0}
                style={this.state.status == 1 && item.id == answer_pressed ? styles.buttonRight :
                    this.state.status == -1 && item.id == answer_pressed ? styles.buttonWrong : styles.containerButton}
                onPress={
                    () => {
                        this.verifyAnswer(item.id)
                        setTimeout(() => { this.setState({ status: 0, question: this.state.question + 1 }) }, 1000)
                    }
                }>
                <Text>
                    {item.answer}
                </Text>
            </TouchableOpacity>
        </View>
    )

    renderQuestion() {
        if (this.state.question < 5) {
            if (this.state.status == 0) {
                question = chosen_questions[this.state.question]
                this.chooseWrongAnswersRandomly(question)
                this.mountAnswers(question)
            }

            return (
                <View style={styles.container}>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.txtQuestion}>
                            {question.question.description}
                        </Text>
                    </View>
                    <View style={styles.containerResult}>
                        <Text>
                            teste
                        </Text>
                    </View>
                    <View style={styles.bottom}>
                        <View>
                            <FlatList
                                data={chosen_answers}
                                keyExtractor={item => item.id.toString()}
                                renderItem={this.renderAlternatives}
                            />
                        </View>
                    </View>
                </View>
            )
        } else {
            this.checkScore()
        }
    }

    render() {
        return (
            <ImageBackground
            source={image_background}
            imageStyle={{ opacity: 0.6 }}
            style={styles.bg}>
                <View style={styles.container}>{this.renderQuestion()}</View>
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
    containerResult: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerQuestion: {
        backgroundColor: '#def7f7',
        borderWidth: 2,
        borderColor: '#5a52ee',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        marginTop: 30,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButton: {
        backgroundColor: '#def7f7',
        borderWidth: 2,
        borderColor: '#5a52ee',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRight: {
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        backgroundColor: '#a3ffa4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWrong: {
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        backgroundColor: '#ff7a7a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    txtQuestion: {
        fontWeight: 'bold',
        fontSize: 15
    }
})
