import { createStackNavigator } from 'react-navigation'
import SplashScreen from './Interfaces/SplashScreen'
import Subjects from './Interfaces/Subjects'
import Questions from './Interfaces/Questions'
import Score from './Interfaces/Score'

export default createStackNavigator({
    SplashScreen,
    Subjects,
    Questions,
    Score
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#ff00ff'
        }
    }
})