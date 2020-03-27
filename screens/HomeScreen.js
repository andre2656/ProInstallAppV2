import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Button } from 'react-native-elements';

//Home Screen Needs Note and reevaluation
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    //state that will be filled out by prop from signin
    state = {
        FirstName: '',
        Username: '',
        Cookie: '',
        menuOpen: false,
        displayMenu: 0,
    };

    //Function for menu to open
    menuClicked = () => {
        if (this.state.menuOpen) {
            this.setState({
                menuOpen: false,
                displayMenu: 0,
            });
        } else if (!this.state.menuOpen) {
            this.setState({
                menuOpen: true,
                displayMenu: 65,
            })
        };
    };
    navigateJob = (name) => {

        this.props.navigation.navigate('JobTabs', { name: name })
    }

    render() {
        return (
            <View>
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
                                    name: 'sign-out',
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

                <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '25%', height: 15, backgroundColor: '#00c387', }}></View>
                        <View style={{ width: '25%', height: 15, backgroundColor: '#00ace3', }}></View>
                        <View style={{ width: '25%', height: 15, backgroundColor: '#fe4444', }}></View>
                        <View style={{ width: '25%', height: 15, backgroundColor: '#ff8802', }}></View>
                    </View>

                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', marginTop: '5%' }}>Welcome <Text style={{ fontWeight: 'normal', }}>{this.state.FirstName}</Text></Text>
                    <Text style={{ paddingHorizontal: '5%', textAlign: 'center', marginBottom: '2%', fontSize: 20 }}>This is your Dashboard, select a job to input measures, installs, and also submit an issue. </Text>

                    <View >
                        <Text style={{ fontSize: 25, textAlign: 'center', paddingTop: '5%', backgroundColor: 'white' }}>Latest Assigned Job</Text>
                        <ScrollView style={{}} style={{ backgroundColor: 'white', height: '58%' }} >

                            <View
                                style={{
                                    flexDirection: 'row',
                                    height: 'auto',
                                }}>
                                <FlatList

                                    //Data acuired from the flatlist will be from the database with the  get latest job call
                                    data={[
                                        { key: "Cole's Luxury Hotel and Resort", day: '01', month: ' Jan' },
                                        { key: 'Extended Stay', day: '31', month: ' Jan' },
                                        { key: 'AAA Picture Contest', day: '12', month: ' Feb' },
                                        { key: 'Best Western', day: '21', month: ' Feb' },
                                        { key: 'Comfort Inn and Suites', day: '03', month: ' Mar' },
                                        { key: 'Courtyard Marriott', day: '11', month: ' Apr' },
                                        { key: 'Days Inn Helena, MT', day: '21', month: ' Apr' },
                                        { key: 'Hyatt House at Union Station', day: '01', month: ' Aug' },
                                        { key: 'Hyatt House atn Station', day: '05', month: ' Aug' },
                                        { key: 'Hyatt House at Unio Station', day: '04', month: ' Sep' },
                                        { key: 'Hyatt House at Unin Station', day: '21', month: ' Oct' },
                                        { key: 'Hyatt House at Unon Station', day: '23', month: ' Nov' },
                                        { key: 'Hyatt House at  Station', day: '12', month: ' Nov' },
                                    ]}

                                    renderItem={({ item }) =>
                                        // On click item will take user to the selected job passing item.key as a prop to get the information needed from the Database
                                        <TouchableOpacity style={{ paddingLeft: 15, paddingRight: 15, marginTop: 10 }} onPress={() => this.navigateJob(item.key)}>
                                            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5', borderColor: 'transparent', borderBottomColor: '#282828', borderTopColor: '#282828', borderWidth: 2, overflow: 'hidden', height: 60, width: '100%' }}>
                                                {/* <Image style={{ width: 35, height: 35, marginTop: 6, marginLeft: 5, borderRadius: 5, borderColor: '#fff', borderWidth: 1, overflow: 'hidden' }} source={require('../assets/images/exDate.png')} /> */}
                                                <View stye={{ width: '20%', marginTop: 6, marginLeft: 5, borderRadius: 5, borderColor: '#fff', borderWidth: 1, overflow: 'hidden' }}>
                                                    <View style={{ flexDirection: 'row', height: '60%', backgroundColor: '#07ace2', width: 50, }}>
                                                        <Text style={{ fontSize: 26, color: '#fff', textAlign: "center", fontWeight: '600' }}> {item.day} </Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', height: '40%', backgroundColor: '#2e358f', width: 50, }}>
                                                        <Text style={{ fontSize: 16, color: '#fff', textAlign: "center", fontWeight: '600' }}> {item.month} </Text>
                                                    </View>
                                                </View>
                                                <Text style={{ color: 'black', fontSize: 19, marginTop: 10, textAlign: "center", width: '80%', paddingLeft: 5 }}>{item.key}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
    //Romove once app is in production.
    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}
//Remove once app is in production


//Delete styles that are not used.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 10,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 0,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 0,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
