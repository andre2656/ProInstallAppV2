import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from 'react-native-elements';

//Dashboard Code

export default class Dashboard extends React.Component {
    static navigationOptions = {
        header: null,
    };

    //State will be filled out by signin props once the component mounts then will be used throughout the app as the user information
    state = {
        Username: '',
        Firstname: '',
        Cookie: ''
    }
    componentDidMount (){
        //Add function to pull props on jobs and current user
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }} >
                {/* Styling of header */}
                <View style={{ backgroundColor: '#000', flexDirection: 'row', paddingTop: 15, width: '100%' }}>
                    {/* May need to be resized smaller and add need a job search tab added to make things easier to find. */}
                    <TouchableOpacity style={{ marginTop: 20, width: '15%', paddingLeft: '5%' }} onPress={() => { this.props.navigation.navigate('Home') }} >
                        <Image style={{ width: 30, height: 30, marginLeft: 10 }} source={require('../assets/images/welcome.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 5, width: '50%', paddingLeft: '5%' }} onPress={() => { this.props.navigation.navigate('Home') }}>
                        <Image style={{ marginTop: '10%', width: 200, height: 25, marginLeft: 10, }} source={require('../assets/images/logo.png')} />
                    </TouchableOpacity>
                    <View style={{ marginTop: 10, width: '40%', paddingLeft: '10%' }}>
                        <View>
                            <Button
                                icon={{
                                    name: 'home',
                                    type: 'font-awesome',
                                    color: 'white',
                                    size: 30
                                }}
                                buttonStyle={{ backgroundColor: 'black' }}
                                title=''
                                onPress={() => { this.props.navigation.goBack(null) }}
                            />
                        </View>
                    </View>
                </View>
                {/* Simple Header transition to body */}
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#00c387', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#00ace3', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#fe4444', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#ff8802', }}></View>
                </View>
                <Text style={{ fontSize: 35, textAlign: 'center', marginVertical: '50%' }}>Under Maintence</Text>
                <Text>
                    Welcome {this.state.Name}
                </Text>
                <Text>
                    This is your dashboard here you can do (Insert list of setting or views that a user can have )
                </Text>

                <Text>

                </Text>
                {/* Style for the Page layout */}
                <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                    <View style={{ width: '25%', height: 20, backgroundColor: '#ff8802', }}></View>
                    <View style={{ width: '25%', height: 20, backgroundColor: '#fe4444', }}></View>
                    <View style={{ width: '25%', height: 20, backgroundColor: '#00ace3', }}></View>
                    <View style={{ width: '25%', height: 20, backgroundColor: '#00c387', }}></View>
                </View>
            </View>
        );
    };
};