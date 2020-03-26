import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import MainMenuIcon from '../Icon/MainMenuIcon';
import HomeScreen from '../screens/HomeScreen';
import JobSearchScreen from '../screens/JobSearchScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogoutScreen from '../screens/LogoutScreen';
import LoginScreen from '../screens/LoginScreen';
const HomeStack = createStackNavigator({
    Home: HomeScreen,
});
HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <MainMenuIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'home' : 'home'}
        />

    )
};
const JobSearchStack = createStackNavigator({
    JobSearch: JobSearchScreen,
});
JobSearchStack.navigationOptions = {
    tabBarLabel: 'JobSearch',
    tabBarIcon: ({ focused }) => (
        <MainMenuIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'search' : 'search'}
            navigationOptions
        />
    )
};
const DashboardStack = createStackNavigator({
    Dashboard: DashboardScreen,
});
DashboardStack.navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ focused }) => (
        <MainMenuIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'user' : 'user'}
        />
    )
};
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});
SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <MainMenuIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'cogs' : 'cogs'}
        />
    ),
};
const LogoutStack = createStackNavigator({
    Logout: LogoutScreen,
});
LogoutStack.navigationOptions = {
    tabBarLabel: 'Logout',
    tabBarIcon: ({ focused }) => (
        <MainMenuIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'sign-out' : 'sign-out'}
        />
    )
};
const LoginStack = createStackNavigator({
    Login: LoginScreen,
});
LoginStack.navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({ focused }) => (
        <MainMenuIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'sign-in' : 'sign-in'}
        />
    )
};
export default createBottomTabNavigator({
    Home: HomeStack,
    JobSearch: JobSearchStack,
    Dashboard: DashboardStack,
    Settings: SettingsStack,
    Logout: LogoutStack,
});