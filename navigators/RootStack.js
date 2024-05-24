import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Pages/Login';
import Splashscreen from '../Pages/Splash';
import OnboardingScreen from '../Pages/onBoardingScreen';
import RegisterScreen from '../Pages/Register';
import Tabs from './BottomNavigationBar';
import ProfileScreen from '../Pages/ProfileScreen';
import MessageScreen from '../Pages/MessageScreen';
import MatchProfilePage from '../Pages/userProfilePage';
import BlurImageBg from '../components/userphoto';
import Like from '../Pages/Likes';
import MatchScreen from '../Pages/MatchScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='splash'>
      <Stack.Screen name='splash' component={Splashscreen} options={{ headerShown: false }} />
      <Stack.Screen name='onBoarding' component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name='profile' component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Like' component={Like} options={{ headerShown: false }} />
      <Stack.Screen name='MatchScreen' component={MatchScreen} options={{ headerShown: false }} />
      <Stack.Screen name='message' component={MessageScreen} options={{ headerShown: false }} />
      <Stack.Screen name='UserProfile' component={MatchProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name='userPhoto' component={BlurImageBg} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
