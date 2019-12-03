import { createStackNavigator } from 'react-navigation'
import SplashScreen from './Interfaces/SplashScreen'
import Subjects from './Interfaces/Subjects'
import Questions from './Interfaces/Questions'
import Score from './Interfaces/Score'
import TotalScore from './Interfaces/TotalScore'

export default createStackNavigator({
    SplashScreen,
    Subjects,
    Questions,
    Score,
    TotalScore
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#9899ff',
        },
        headerTintColor: '#e0e0e0'
    },
})