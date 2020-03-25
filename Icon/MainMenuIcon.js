import React from 'react';
import { Icon } from 'react-native-elements'
import Colors from './Colors';

//Icon for TabBar
export default class TabBarIcon extends React.Component {
    render() {
        return (
            <Icon
                name={this.props.name}
                type='font-awesome'
                iconStyle={{ height: 100, width: '100%', marginBottom: -50, paddingLeft: '44%', paddingRight: '44%', paddingTop: 10, paddingBottom: '50%', color: 'black' }}
                color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }
}