import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import { HeaderBackButton } from 'react-navigation';

let allQuestions = []
let chosen_questions = []
let chosen_wrong_answers = []

let chosen_answers = []
let right_answers = null
let answer_pressed = null

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
        right_answers = 0
        this.chooseQuestionsRandomly()
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
            headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('Subjects')}}/>)
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
        <TouchableOpacity disabled={this.state.status != 0}
            style={this.state.status == 1 && item.id == answer_pressed ? {backgroundColor: 'green'} :
             this.state.status == -1 && item.id == answer_pressed ? {backgroundColor: 'red'} : null}
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
    )

    renderQuestion() {
        if (this.state.question < 5) {
            if (this.state.status == 0) {
                question = chosen_questions[this.state.question]
                this.chooseWrongAnswersRandomly(question)
                this.mountAnswers(question)
            }
            
            return (
                <View>
                    <Text>
                        {question.question.description}
                    </Text>
                    <FlatList
                        data={chosen_answers}
                        keyExtractor={item => item.id.toString()}
                        renderItem={this.renderAlternatives}
                    />
                </View>
            )
        } else {
            this.checkScore()
        }
    }

    render() {
        return (
            <View>
                {this.renderQuestion()}
            </View>
        )
    }
}

