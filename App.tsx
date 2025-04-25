import {Provider} from 'react-redux';
import MainApp from './src/screens/MainApp';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SavedCommentsScreen from './src/components/SavedComment';

const Stack = createStackNavigator();
const App = () => (
  
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainApp} />
        <Stack.Screen name="SavedComments" component={SavedCommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
