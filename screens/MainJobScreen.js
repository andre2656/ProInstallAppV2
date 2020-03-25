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
import { NavigationEvents, createStackNavigator, createAppContainer } from 'react-navigation';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { Icon, Button } from 'react-native-elements';
import Header from '../components/Header';
import CheckBox from 'react-native-check-box';
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        Unit: '',
        Rooms: null,
        Windows: 0,
        text: '',
        JobName: 'The Hilton',
    }
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: navigation.getParam('title'),
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={navigation.getParam('icon')}
                type='font-awesome'
                iconStyle={{ height: 85, width: '100%', marginBottom: -50, backgroundColor: 'black', paddingLeft: '44%', paddingRight: '44%', paddingTop: 10, paddingBottom: '50%', color: '#00ace3', }}
                color={tintColor}
            />
        ),
    });
    async componentDidMount() {
        let Name = this.props.navigation.getParam('name')
        this.setState({ JobName: Name })
    }



    render() {
        return (
            <View style={styles.container} style={{ backgroundColor: 'white', height: '100%' }}>
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
                                onPress={() => { this.props.navigation.navigate('Home') }}
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
                {/* Job title is recived from the db selected by the user passed down as a prop then saved as state. */}
                <Text style={{ fontSize: 30, textDecorationLine: 'underline', fontWeight: 'bold', marginVertical: '3%', textAlign: 'center', }}>
                    {this.state.JobName}
                </Text>
                <ScrollView style={styles.container} style={{ backgroundColor: 'white', height: '40%', }} >
                    <View
                        style={{ flexDirection: 'row', height: 'auto', }}>

                        <View style={{ borderColor: 'transparent', backgroundColor: '#F5F5F5', borderBottomColor: 'black', borderWidth: 2, overflow: 'hidden', width: '90%', marginHorizontal: '5%', marginTop: 10 }}>
                            <Text style={{ height: 'auto', width: '100%', flexDirection: 'row', }}>
                                CONTACT: Site Contact
                                Cheryl Shipe, GM
                                970-317 - 4561
                                or
                                Ron Coker, Maintenance Mgr
                                970-331 - 1793
                                SAFETY: no safety requirements, just wear RWP shirts while onsite
                                WHAT FASTENERS WILL YOU BE USING?

                                - We did not measure this property
                                - The first install phase is 10 / 9 - 10 / 12 and the second is 11 / 12 - 11 / 15
                                - Cornices: Face and sides are 3/4” MDF, top is 1/2” sanded plywood
                                - Draperies will all wall mount @ 84-90”.  Typical Drapery is Blackout Only.  Presidential Units have Sheer and Blackout.
                                - This is a remodel that is installing into wood and sheetrock, with new hardware.

                                GUESTROOMS
                                (phase 1, 24 windows. ADA rooms 1206 & 1208)
                                -20 Regular windows will receive wall mount one way draw ripplefold blackout drapery and a custom painted wood cornice, wall mounted.
                                1st floor=1101-1106
                                2nd floor=1201-1208
                                3rd=1301-1306
                                -Presidential suite 1307: 4 windows will receive wall mounted center open sheer and blackout ripplefold drapery and a custom painted wood cornice, wall mounted: bedroom 1, bedroom 2, bedroom 3, living room


                                SHIPPING/TRACKING:(GC will accept shipment) Only Phase 1 has shipped thus far. It’s being handled by 3rd party through Wyndham and taken to their warehouse and delivered to site with their product. (manufacturer will confirm date)
                                the cornices for Phase 1 are delivering separately from the other drapery. They will arrive on 10/11 and I will provide tracking information when provided.
                                This is being handled by Wyndham’s third party logistics.
                                Phase 2 will have all drapery and cornices arriving together.
                                    </Text>
                            <Text style={{ height: 30, width: '100%', flexDirection: 'row', }}>
                                Please report any missing or incorrect items to the office immediately. Put together a model room. Send over quality photos showing the detail of the installation (step by step) to the office for approval before having your contact approve. Make sure to “dress out” the treatments so they look very professional and clean. Report daily on your progress and submit daily photos. Upon completion, obtain a sign off and call for an exit interview before leaving the site.
                                    </Text>
                        </View>
                    </View>
                </ScrollView>
                <ScrollView style={styles.container} style={{ backgroundColor: 'white', height: '40%', }} >
                    <View
                        style={{ flexDirection: 'row', height: 'auto', }}>
                        <FlatList
                            //Data acuired from the flatlist will be from the database with the  get latest job call
                            data={[
                                { key: 21, comment: '1st and 2nd floor and 16 stack rooms not complete.' },
                            ]}

                            renderItem={({ item }) =>
                                // On click item will take user to the selected job passing item.key as a prop to get the information needed from the Database
                                <View style={{ borderColor: 'transparent', backgroundColor: '#F5F5F5', borderBottomColor: 'black', borderWidth: 2, overflow: 'hidden', width: '90%', marginHorizontal: '5%', marginTop: 10 }}>
                                    <Text style={{ height: 30, width: '100%', flexDirection: 'row', }}>
                                        {item.comment}
                                    </Text>
                                </View>
                            } />
                    </View>
                </ScrollView>
                <ScrollView style={styles.container} style={{ backgroundColor: 'white', height: '40%', }} >
                    <View
                        style={{ flexDirection: 'row', height: 'auto', }}>
                        <FlatList
                            //Data acuired from the flatlist will be from the database with the  get latest job call
                            data={[
                                { key: "a232", measure: true, install: false, issue: true },
                                { key: 'b23r3', measure: false, install: true, issue: true },
                                { key: 'c233', measure: true, install: true, issue: false },
                                { key: 's233', measure: true, install: true, issue: true },
                                { key: 'f233', measure: false, install: false, issue: true },
                                { key: 'e233', measure: true, install: true, issue: true },
                                { key: 'q233', measure: true, install: true, issue: false },
                                { key: 'br233', measure: false, install: false, issue: true },
                                { key: 'fe33', measure: true, install: false, issue: true },
                                { key: 'rrrre3', measure: true, install: true, issue: true },
                                { key: 'b2233', measure: false, install: true, issue: false },
                                { key: 'b23333', measure: true, install: false, issue: false },
                                { key: 'b23334r', measure: true, install: true, issue: false },
                            ]}

                            renderItem={({ item }) =>
                                // On click item will take user to the selected job passing item.key as a prop to get the information needed from the Database
                                <View style={{ borderColor: 'transparent', backgroundColor: '#F5F5F5', borderBottomColor: 'black', borderWidth: 2, overflow: 'hidden', width: '90%', marginHorizontal: '5%', marginTop: 10 }}>
                                    <TouchableOpacity style={{ height: 30, width: '100%', flexDirection: 'row', }}>
                                        {/* Text pertainig to Job name and location of the job will be filled in with the recived data from the database */}
                                        <Text style={{ width: '25%', color: 'black', fontSize: 23, textAlign: 'left', fontWeight: '700' }}> {item.key} </Text>
                                        <CheckBox
                                            style={{ width: '25%', height: 20, alignItems: 'center', }}
                                            isChecked={item.measure}
                                            checkedCheckBoxColor={'#00ace3'}
                                            onClick={() => { }}
                                        /><CheckBox
                                            style={{ width: '25%', height: 20, alignItems: 'center' }}
                                            isChecked={item.install}
                                            checkedCheckBoxColor={'#00ace3'}
                                            onClick={() => { }}
                                        /><CheckBox
                                            style={{ width: '25%', height: 20, alignItems: 'center' }}
                                            isChecked={item.issue}
                                            checkedCheckBoxColor={'#00ace3'}
                                            onClick={() => { }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            } />
                    </View>
                </ScrollView>
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
