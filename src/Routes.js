import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SplashScreen from './Interfaces/SplashScreen'
import Subjects from './Interfaces/Subjects'
import Questions from './Interfaces/Questions'
import Score from './Interfaces/Score'
import TotalScore from './Interfaces/TotalScore'

const RootStack = createStackNavigator({
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
});

const AppContainer = createAppContainer(RootStack)

export default AppContainer
