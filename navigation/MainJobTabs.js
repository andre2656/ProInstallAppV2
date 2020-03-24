import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Main from '../screens/MainJobScreen';
import Measure from '../screens/MeasureScreen'
import Install from '../screens/InstallScreen';
import Issue from '../screens/IssueScreen'

//Navigation tabs for while a Job has been selected
export const createSimpleTabs = (options = {}) => {
    return createBottomTabNavigator(
        {
            Main: {
                screen: Main,
                params: { title: 'Building', icon: 'building' },
            },
            Measure: {
                screen: Measure,
                params: { title: 'Measure', icon: 'clipboard' },
            },
            Install: {
                screen: Install,
                params: { title: 'Install', icon: 'upload' },
            },
            Issue: {
                screen: Issue,
                params: { title: 'Issue', icon: 'exclamation-triangle' },
            },

        },
        {
            backBehavior: 'history',
            ...options,
            tabBarOptions: {
                activeTintColor: 'navy',
                inactiveTintColor: 'white',
                labelStyle: { fontSize: 16, paddingTop: 5 },
                ...options.tabBarOptions,
            },
        }
    );
};

export default createSimpleTabs();
