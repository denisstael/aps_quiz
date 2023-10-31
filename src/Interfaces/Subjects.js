import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
    Alert,
    ActivityIndicator
} from 'react-native'
import database from '@react-native-firebase/database';

export default class Subjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Matérias',
            headerLeft: null
        }
    }

    screenQuestions(title, subject) {
        this.setState({ isLoading: true })
        let data = []
        let db = undefined
        database().ref('Subjects/').once('value', function (snapshot) {
            db = snapshot.val()
        }).then(() => {
            if (subject == "Math") {
                data = db.Math.questions
            } else if (subject == "Portuguese") {
                data = db.Portuguese.questions
            } else if (subject == "History") {
                data = db.History.questions
            } else if (subject == "Geography") {
                data = db.Geography.questions
            }
            this.setState({ isLoading: false })
            this.props.navigation.navigate("Questions", { title: title, data: data })
        }).catch(() => { Alert.alert('Erro ao carregar as questões!') })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ImageBackground
                    imageStyle={{ opacity: 0.2 }}
                    source={require('../img/background_app.png')}
                    style={styles.bg}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </ImageBackground>
            )
        }

        return (
            <ImageBackground
                imageStyle={{ opacity: 0.2 }}
                source={require('../img/background_app.png')}
                style={styles.bg}>
                <View style={styles.container}>
                    <View style={styles.containerRow}>
                        <View style={styles.containerRow}>
                            <View style={styles.containerColumn}>
                                <Text style={styles.txtTitle}>Matemática</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.screenQuestions("Matemática", "Math")
                                    }}>
                                    <Image source={require('../img/math.png')} style={styles.img} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.containerRow}>
                            <View style={styles.containerColumn}>
                                <Text style={styles.txtTitle}>Português</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.screenQuestions("Português", "Portuguese")
                                    }}>
                                    <Image source={require('../img/portuguese.png')} style={styles.img} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerRow2}>
                        <View style={styles.containerRow}>
                            <View style={styles.containerColumn}>
                                <Text style={styles.txtTitle}>História</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.screenQuestions("História", "History")
                                    }}>
                                    <Image source={require('../img/history.png')} style={styles.img} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.containerRow}>
                            <View style={styles.containerColumn}>
                                <Text style={styles.txtTitle}>Geografia</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.screenQuestions("Geografia", "Geography")
                                    }}>
                                    <Image source={require('../img/geography.png')} style={styles.img} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonScore}
                        onPress={() => {
                            this.props.navigation.navigate("TotalScore")
                        }}>
                        <Text style={styles.txtButton}>Ver Pontuação</Text>
                    </TouchableOpacity>
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
        flex: 1,
    },
    img: {
        width: 130,
        height: 130,
        borderRadius: 100,
        borderColor: '#9899ff',
        borderWidth: 2,
        backgroundColor: '#def7f7'
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
    containerColumn: {
        justifyContent: 'center',
        alignItems: 'center',
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
    txtTitle: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
        color: '#8846f4'
    },
    txtButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e0e0e0'
    }
})