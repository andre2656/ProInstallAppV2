import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import {Button } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

//Login Needs Notes
export default class Login extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        Unit: '',
        Rooms: null,
        Windows: 0,
        text: '',
        JobName: 'The Best Western',
        isChecked: true,
    }
    UsernameAuth = (event) => {
        // username or email will get us the information pertaining to the jobs this user can see
        this.setState({ Username: event },
            () => {

            })
    }
    PasswordAuth = (event) => {

        // {password logic goes here} 
        this.setState({ Password: event },
            () => {

            })
    }
    Submit = (event) => {
        console.log('Sobmit was hit \n\n\n !!!!' + event)
    }



    render() {
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }} >
                <View style={{ backgroundColor: '#000', flexDirection: 'row', paddingTop: 15, width: '100%' }}>
                    {/* May need to be resized smaller and add need a job search tab added to make things easier to find. */}
                    <View style={{ marginTop: 20, width: '15%', paddingLeft: '5%' }}>
                        <Image style={{ width: 30, height: 30, marginLeft: 10 }} source={require('../assets/images/welcome.png')} />
                    </View>
                    <View style={{ marginTop: 5, width: '50%', paddingLeft: '5%' }}>
                        <Image style={{ marginTop: '10%', width: 200, height: 25, marginLeft: 10, }} source={require('../assets/images/logo.png')} />
                    </View>
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
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#00c387', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#00ace3', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#fe4444', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#ff8802', }}></View>
                </View>
                <View style={{ marginTop: '25%' }}>
                    <View style={{ borderColor: 'transparent', width: '90%', flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, marginTop: '5%' }}>
                        <TextInput style={{ maxHeight: 150, maxWidth: 350, width: '100%', fontSize: 23, padding: 10 }}
                            keyboardType='default'
                            onChange={this.UsernameAuth}
                            placeholder={'Username'}
                            placeholderTextColor={'black'}
                            returnKeyType={'next'} />
                    </View>
                    <View style={{ borderColor: 'transparent', width: '90%', flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, marginTop: '5%' }}>
                        <TextInput style={{ maxHeight: 150, maxWidth: 350, width: '100%', fontSize: 23, padding: 10 }}
                            keyboardType='default'
                            onChange={this.PasswordAuth}
                            placeholder={'Password'}
                            placeholderTextColor={'black'}
                            secureTextEntry={this.state.isChecked}
                            returnKeyType={'done'}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: '5%' }}>
                        <CheckBox
                            style={{ paddingLeft: 90, width: 325, height: 30, }}
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked,
                                })
                            }}
                            isChecked={!this.state.isChecked}
                            leftText={"Show Password?"}
                            leftTextStyle={{ fontSize: 23 }}
                            checkedCheckBoxColor={'#fe4444'}
                        />

                    </View>
                    <View style={{ width: '90%', flexDirection: 'row', marginTop: '5%', marginHorizontal: '5%', }}>
                        <TouchableOpacity
                            style={{
                                marginTop: 25, height: 65, backgroundColor: 'white', width: 115, marginHorizontal: '33%',
                                paddingVertical: 0, borderRadius: '15%', borderColor: '#00c387', borderWidth: 2, textAlign: 'center'
                            }}
                            onPress={() => this.props.navigation.navigate('MeasureWindow')} >
                            <Text style={{ fontSize: 32, color: '#00c387', fontWeight: '600', marginTop: '8%', }}> Login </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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