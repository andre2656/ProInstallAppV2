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
    TextInput,
    Picker,
    TouchableWithoutFeedback,
} from 'react-native';
// import { CameraRoll } from 'react-native-cameraroll';
import { Icon, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
// import style from '../components/camera/styles'
const capturing = false;

//Needs notes
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        JobName: 'The Best Western',
        Building: '(Default)',
        Floor: '',
        Treatments: '',
        IssueType: '',
        BriefExplanation: '',
        Photos: [],
        BuildHeight: 35,
        TreatmentsHeight: 35,
        IssueTypeHeight: 35,
        BuildImg: 0,
        BuildImgDeg: 0,
        TreatmentsImg: 0,
        TreatmentsDeg: 0,
        IssueTypeImg: 0,
        IssueTypeDeg: 0,
        menuOpen: false,
        IssueDisplay: 'flex',
        displayMenu: 0,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        CameraDisplay: 'none',
        capturing: null,
        capture: {},
        errText: '',
        continueMeasure: false,
        PhotoDisplay: 'none',
        GalleryDisplay: 'none',
        photos: [],
        captures: []
    }

    async componentDidMount() {
        let Name = this.props.navigation.getParam('name')
        this.setState({ JobName: Name })
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' });
        // CameraRoll.getPhotos({
        //     first: 25,
        //     groupTypes: 'All',
        //     assetType: 'All',
        // }).then(r => {
        //     // console.log(r.edges)
        //     this.setState({ photos: r.edges })
        // })
    }
    handleShortCapture = async () => {
        await this.Camera.takePictureAsync().then((data) => {
            console.log('photo data: ', data)
            // FileSystem.copyAsync({from: data.uri, to: 'file://DataUri'}).then(() => {
            //     console.log(FileSystem.getInfoAsync('file://DataUri'))
            // })

            this.setState({ capturing: false, capture: data }, () => {
                this.DisplayPhoto(data);

            });
        });
        return
    };
    DisplayIssue = () => {
        if (this.state.IssueDisplay === 'none') {
            this.setState({ CameraDisplay: 'none', IssueDisplay: 'flex', PhotoDisplay: 'none', GalleryDisplay: 'none', })
        }
        else if (this.state.IssueDisplay === 'flex') {
            this.DisplayIssue()
        }
    }
    DisplayPhoto = (capture) => {
        if (this.state.PhotoDisplay === 'none') {
            this.setState({ CameraDisplay: 'none', IssueDisplay: 'none', PhotoDisplay: 'flex', GalleryDisplay: 'none', DisplayCapture: capture })

        }
        else if (this.state.PhotoDisplay === 'flex') {
            this.DisplayCamera()
            return
        }
    }
    DisplayCamera = () => {
        if (this.state.CameraDisplay === 'none') {
            this.setState({ CameraDisplay: 'flex', IssueDisplay: 'none', PhotoDisplay: 'none', GalleryDisplay: 'none', })
        }
        else if (this.state.CameraDisplay === 'flex') {
            this.DisplayIssue()
        }
    }
    DisplayGallery = () => {
        if (this.state.GalleryDisplay === 'none') {
            this.setState({ GalleryDisplay: 'flex', IssueDisplay: 'none', PhotoDisplay: 'none', CameraDisplay: 'none' })
        }
        else if (this.state.GalleryDisplay === 'flex') {
            this.displayIssue()
        }
    }
    GalleryDisplay = () => {
        // CameraRoll.getPhotos({
        //     first: 10,
        //     groupTypes: 'All',
        //     assetType: 'All',
        // })
        //     .then(r => {
        //         // console.log(r.edges)
        //         this.setState({ photos: r.edges },
        //             () => {
        //                 // console.log('r= ', r.edges);
        //                 if (this.state.photos.length === 0) {
        //                     return <Text> Error, No photos found. (404) </Text>
        //                 } else if (this.state.photos.length >= 0) {
        //                     return
        //                 }

        //             });
        //     })
        //     .catch((err) => {
        //         //Error Loading Images
        //         console.log(err)
        //     });
    }
    menuClicked = () => {
        if (this.state.menuOpen) {
            this.setState({
                menuOpen: false,
                displayMenu: 0,
            })
        } else if (!this.state.menuOpen) {
            this.setState({
                menuOpen: true,
                displayMenu: 60,
            })
        }
    }
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: navigation.getParam('title'),
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={navigation.getParam('icon')}
                type='font-awesome'
                iconStyle={{ height: 85, width: '100%', marginBottom: -50, backgroundColor: 'black', paddingLeft: '44%', paddingRight: '44%', paddingTop: 10, paddingBottom: '50%', color: '#ff8802' }}
                color={tintColor}

            />
        ),
    });
    submitIssue = () => {
        if (this.state.Building !== '' && this.state.Treatments !== '' && this.state.IssueType !== '' && this.state.Floor !== '' && this.state.BreifExplination !== '') {
            this.sendIsssue()
        } else {
            console.log('error submitting the issue please try again')
        }
    }
    sendIssue = () => {
        //Add Routes to push Issue
    }
    saveImage = (uri) => {
        //save uri to the db
        console.log(uri)
        this.DisplayIssue()
    }


    submitPressed = () => {
        //Add code here to verify that all forms are filled out and send to DB while navagating to the next page

        let formsValadated = false;
        if (formsValadated) {

            //Send the information to the DB here

            //Navagate to a new page here

            //Depending on time to send data to the server will run Async
        }
    }
    buildingStateCheck() {
        (this.state.BuildingClosed)
    }
    openBuilding = () => {
        if (this.state.BuildHeight === 35) {
            this.setState({ BuildHeight: 175, BuildImg: 125, BuildImgDeg: 180, TreatmentsHeight: 35, TreatmentsDeg: 0, TreatmentsImg: 0, IssueTypeHeight: 35, IssueTypeDeg: 0, IssueTypeImg: 0, })
        }
        else if (this.state.BuildHeight === 175) {
            this.setState({ TreatmentsHeight: 35, TreatmentsDeg: 0, TreatmentsImg: 0, IssueTypeHeight: 35, IssueTypeDeg: 0, IssueTypeImg: 0, BuildHeight: 35, BuildImg: 0, BuildImgDeg: 0 })
        }

    }
    openTreatments = () => {
        if (this.state.TreatmentsHeight === 35) {
            this.setState({ TreatmentsHeight: 500, TreatmentsDeg: 180, TreatmentsImg: 450, BuildHeight: 35, BuildImg: 0, BuildImgDeg: 0, IssueTypeHeight: 35, IssueTypeDeg: 0, IssueTypeImg: 0 })
        }
        else if (this.state.TreatmentsHeight === 500) {
            this.setState({ TreatmentsHeight: 35, TreatmentsDeg: 0, TreatmentsImg: 0, IssueTypeHeight: 35, IssueTypeDeg: 0, IssueTypeImg: 0, BuildHeight: 35, BuildImg: 0, BuildImgDeg: 0 })
        }
    }
    openIssueType = () => {
        if (this.state.IssueTypeHeight === 35) {
            this.setState({ IssueTypeHeight: 300, IssueTypeDeg: 180, IssueTypeImg: 250, TreatmentsHeight: 35, TreatmentsDeg: 0, TreatmentsImg: 0, BuildHeight: 35, BuildImg: 0, BuildImgDeg: 0 })
        }
        else if (this.state.IssueTypeHeight === 300) {
            this.setState({ TreatmentsHeight: 35, TreatmentsDeg: 0, TreatmentsImg: 0, IssueTypeHeight: 35, IssueTypeDeg: 0, IssueTypeImg: 0, BuildHeight: 35, BuildImg: 0, BuildImgDeg: 0 })
        }
    }


    render() {
        return (
            <View style={{ backgroundColor: 'white', height: '100%', flex: 1, }}>
                <View style={{ backgroundColor: 'white', height: '100%', display: this.state.IssueDisplay }} >
                    <View style={{ backgroundColor: '#000', flexDirection: 'row', paddingTop: 30, width: '100%' }}>
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
                                        name: 'sliders',
                                        type: 'font-awesome',
                                        color: 'white',
                                        size: 30
                                    }}
                                    buttonStyle={{ backgroundColor: 'black' }}
                                    title=''
                                    onPress={this.menuClicked}
                                />
                            </View>
                        </View>
                    </View>
                    {/* Header Buttons App.js */}
                    <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#000', height: this.state.displayMenu }}>
                        <View style={{ width: '25%', backgroundColor: '#00c387' }}>
                            <Button
                                icon={{
                                    name: 'search',
                                    type: 'font-awesome',
                                    color: 'white',
                                    size: 23
                                }}
                                buttonStyle={{ backgroundColor: 'transparent' }}
                                title=''
                                onPress={() => { this.props.navigation.navigate('JobSearch') }}
                            />
                            <Text style={{ color: 'white', width: '100%', textAlign: 'center', marginTop: -3, }} size={23}>Job Search</Text>
                        </View>
                        <View style={{ width: '25%', backgroundColor: '#00ace3', }}>
                            <Button
                                icon={{
                                    name: 'user',
                                    type: 'font-awesome',
                                    color: 'white',
                                    size: 23
                                }}
                                buttonStyle={{ backgroundColor: 'transparent', }}
                                title=''
                                onPress={() => { this.props.navigation.navigate('Dashboard') }}
                            />
                            <Text style={{ color: 'white', width: '100%', textAlign: 'center', marginTop: -3 }} size={23}>Dashboard</Text>
                        </View>
                        <View style={{ width: '25%', backgroundColor: '#fe4444', }}>
                            <Button
                                icon={{
                                    name: 'cogs',
                                    type: 'font-awesome',
                                    color: 'white',
                                    size: 23
                                }}
                                buttonStyle={{ backgroundColor: 'transparent', }}
                                title=''
                                onPress={() => { this.props.navigation.navigate('Settings') }}
                            />
                            <Text style={{ color: 'white', width: '100%', textAlign: 'center', marginTop: -3 }} size={23}>Settings</Text>
                        </View>
                        <View style={{ width: '25%', backgroundColor: '#ff8802', }}>
                            <Button
                                icon={{
                                    name: 'sign-out',
                                    type: 'font-awesome',
                                    color: 'white',
                                    size: 25
                                }}
                                buttonStyle={{ backgroundColor: 'transparent', }}
                                title=''
                                onPress={() => { this.props.navigation.navigate('Logout') }}
                            />
                            <Text style={{ color: 'white', width: '90%', paddingHorizontal: '5%', textAlign: 'center', marginTop: -3 }} size={23}>Logout</Text>
                        </View>
                    </View>
                    {/* Style for the Page layout */}
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '25%', height: 15, backgroundColor: '#00c387', }}></View>
                        <View style={{ width: '25%', height: 15, backgroundColor: '#00ace3', }}></View>
                        <View style={{ width: '25%', height: 15, backgroundColor: '#fe4444', }}></View>
                        <View style={{ width: '25%', height: 15, backgroundColor: '#ff8802', }}></View>
                    </View>
                    <ScrollView>
                        {/* Job title is recived from the db selected by the user passed down as a prop then saved as state. */}
                        <Text style={{ fontSize: 30, textDecorationLine: 'underline', fontWeight: 'bold', marginVertical: '3%', textAlign: 'center', }}>
                            {this.state.JobName}
                        </Text>

                        {/* Building */}
                        {/* <View style={{ borderColor: 'transparent', width: '90%', flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, }}>
                            <View style={{ width: '90%', height: this.state.BuildHeight }}>
                                <View style={{ borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, width: '100%', flexDirection: 'row', marginTop: 3 }}>
                                    <Text style={{ width: '50%', height: 30, fontSize: 23, }}>
                                        Building
                                </Text>
                                    <Text style={{ width: '50%', height: 30, fontSize: 23, }}>
                                        {this.state.Building}
                                    </Text>
                                </View>
                                <ScrollView style={{ width: '99%' }}>
                                    <FlatList
                                        //Data acuired from the flatlist will be from the database with the  get latest job call
                                        data={[
                                            { key: "Building A" },
                                            { key: 'Building B' },
                                        ]}

                                        renderItem={({ item }) =>
                                            // On click item will take user to the selected job passing item.key as a prop to get the information needed from the Database
                                            <TouchableOpacity style={{}} onPress={() => {
                                                this.openBuilding()
                                                this.setState({ Building: item.key })
                                            }}>
                                                <View key={item.key} style={{ flexDirection: 'row', width: '100%', borderColor: 'transparent', borderBottomColor: '#ff8802', borderTopColor: '#ff8802', borderWidth: 2, paddingTop: 2, paddingBottom: 2, marginTop: 5, backgroundColor: '#F5F5F5' }}>
                                                    
                                                    <Text style={{ padding: 5, color: 'black', fontSize: 22, width: '100%', textAlign: 'center' }}>{item.key}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        } />
                                </ScrollView>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.openBuilding()
                            }}>
                                <Image style={{ width: 30, height: 30, marginTop: this.state.BuildImg, transform: [{ rotate: this.state.BuildImgDeg + 'deg' }] }} source={require('../assets/images/issue_drop.png')} />
                            </TouchableOpacity>

                        </View> */}
                        {/* Floor */}
                        <View style={{ borderColor: 'transparent', width: '90%', flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, }}>
                            <TextInput
                                style={{ maxHeight: 40, maxWidth: 325, width: '100%', fontSize: 22, }}
                                keyboardType='numeric'
                                onChangeText={(text) => this.setState({ Floor: text })}
                                value={this.state.Floor}
                                placeholder={'Floor'}
                                placeholderTextColor={'black'}
                            />
                        </View>

                        {/* Treatments */}
                        <View style={{ borderColor: 'transparent', width: '90%', flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, }}>
                            <View style={{ width: '90%', height: this.state.TreatmentsHeight }}>
                                <View style={{ borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, width: '100%', flexDirection: 'row', marginTop: 3 }}>
                                    <Text style={{ width: '30%', height: 30, fontSize: 23, }}>
                                        Treatment
                                </Text>
                                    <Text style={{ width: '70%', height: 30, paddingLeft: 8, paddingTop: 2, fontSize: 20, }}>
                                        {this.state.Treatments}
                                    </Text>
                                </View>
                                <ScrollView style={{ width: '98%' }}
                                >
                                    <FlatList
                                        //Data acuired from the flatlist will be from the database with the  get latest job call
                                        data={[
                                            { key: "201- Roller Shade B/O" },
                                            { key: "201- Roller Shade Fascia " },
                                            { key: "201- RollerShade BO Brkts" },
                                            { key: "201- RollerShade SH Brkts" },
                                            { key: "201- Side Channels" },
                                            { key: "202- Bed Roller Shade B/O" },
                                            { key: "202- Bed Roller Shade Fascia" },
                                            { key: "202- Bed Roller Shade Sheer" },
                                            { key: "202- Bed Roller Shade BO Brkts" },
                                            { key: "202- Bed Roller Shade SH Brkts" },
                                            { key: "202- Bed Side Channels" },
                                            { key: "202- Liv Roller Shade B/O" },
                                            { key: "202- Liv Roller Shade Fascia" },
                                            { key: "202- Liv Roller Shade Sheer" },
                                            { key: "202- Liv RollerShade BO Brkts" },
                                            { key: "202- Liv RollerShade SH Brkts" },
                                            { key: "202- Liv Side Channels" },
                                            { key: "203- Roller Shade B/O" },
                                            { key: "203- Roller Shade Fascia" },
                                            { key: "203- Roller Shade Sheer" },
                                            { key: "203- RollerShade BO Brkts" },
                                            { key: "203- RollerShade SH Brkts" },
                                            { key: "203- Side Channels" },
                                            { key: "204- Roller Shade B/O" },
                                            { key: "204- Roller Shade Fascia" },
                                            { key: "204- Roller Shade Sheer" },
                                            { key: "204- RollerShade BO Brkts" },
                                            { key: "204- RollerShade SH Brkts" },
                                            { key: "204- Side Channels" },
                                            { key: "205- Roller Shade B/O" },
                                            { key: "205- Roller Shade Fascia" },
                                            { key: "205- Roller Shade Sheer" },
                                            { key: "205- RollerShade BO Brkts" },
                                            { key: "205- RollerShade SH Brkts" },
                                            { key: "205- Side Channels" },
                                            { key: "206- Roller Shade B/O" },
                                            { key: "206- Roller Shade Fascia" },
                                            { key: "206- Roller Shade Sheer" },
                                            { key: "206- RollerShade BO Brkts" },
                                            { key: "206- RollerShade SH Brkts" },
                                            { key: "206- Side Channels" },
                                            { key: "207ADA- Bed Roller Shade B/O" },
                                            { key: "207ADA- Bed Roller Shade Fascia" },
                                            { key: "207ADA- Bed Roller Shade Sheer" },
                                            { key: "207ADA- BedRoller Shade SH Brkts" },
                                            { key: "207ADA- Bed Side Channels" },
                                            { key: "207ADA- Liv Roller Shade B/O" },
                                            { key: "207ADA- Liv Roller Shade Fascia" },
                                            { key: "207ADA- Liv Roller Shade Sheer" },
                                            { key: "207ADA- Liv RollerShade BO Brkts" },
                                            { key: "207ADA- Liv RollerShade SH Brkts" },
                                            { key: "207ADA Liv Side Channels" },
                                            { key: "208- Roller Shade B/O" },
                                            { key: "208- Roller Shade Fascia" },
                                            { key: "208- Roller Shade Sheer" },
                                            { key: "208- RollerShade BO Brkts" },
                                            { key: "208- RollerShade SH Brkts" },
                                            { key: "208- Side Channels" },
                                            { key: "209- Roller Shade B/O" },
                                            { key: "209- Roller Shade Fascia" },
                                            { key: "209- Roller Shade Sheer" },
                                            { key: "209- RollerShade BO Brkts" },
                                            { key: "209- RollerShade SH Brkts" },
                                            { key: "209- Side Channels" },
                                            { key: "210- Roller Shade B/O" },
                                            { key: "210- Roller Shade Fascia" },
                                            { key: "210- Roller Shade Sheer" },
                                            { key: "210- RollerShade BO Brkts" },
                                            { key: "210- RollerShade SH Brkts" },
                                            { key: "210- Side Channels" },
                                            { key: "211- Roller Shade B/O" },
                                            { key: "211- Roller Shade Fascia" },
                                            { key: "211- Roller Shade Sheer" },
                                            { key: "211- RollerShade BO Brkts" },
                                            { key: "211- RollerShade SH Brkts" },
                                            { key: "211- Side Channels" },
                                            { key: "212 Roller Shade B/O" },
                                            { key: "212 Roller Shade Fascia" },
                                            { key: "212 Roller Shade Sheer" },
                                            { key: "212 RollerShade BO Brkts" },
                                            { key: "212 RollerShade SH Brkts" },
                                            { key: "212- Side Channels" },
                                            { key: "213- Roller Shade B/O" },
                                            { key: "213- Roller Shade Fascia" },
                                            { key: "213- Roller Shade Sheer" },
                                            { key: "213- RollerShade BO Brkts" },
                                            { key: "213- RollerShade SH Brkts" },
                                            { key: "213- Side Channels" },
                                            { key: "214- Roller Shade B/O" },
                                            { key: "214- Roller Shade Fascia" },
                                            { key: "214- Roller Shade Sheer" },
                                            { key: "214- RollerShade BO Brkts" },
                                            { key: "214- RollerShade SH Brkts" },
                                            { key: "214- Side Channels" },
                                            { key: "215- Roller Shade B/O" },
                                            { key: "215- Roller Shade Fascia" },
                                            { key: "215- Roller Shade Sheer" },
                                            { key: "215- RollerShade BO Brkts" },
                                            { key: "215- RollerShade SH Brkts" },
                                            { key: "215- Side Channels" },
                                            { key: "216- Roller Shade B/O" },
                                            { key: "216- Roller Shade Fascia" },
                                            { key: "216- Roller Shade Sheer" },
                                            { key: "216- RollerShade BO Brkts" },
                                            { key: "216- RollerShade SH Brkts" },
                                            { key: "216- Side Channels" },
                                            { key: "217- Roller Shade B/O" },
                                            { key: "217- Roller Shade Fascia" },
                                            { key: "217- Roller Shade Sheer" },
                                            { key: "217- RollerShade BO Brkts" },
                                            { key: "217- RollerShade SH Brkts" },
                                            { key: "217- Side Channels" },
                                            { key: "218- Roller Shade B/O" },
                                            { key: "218- Roller Shade Fascia" },
                                            { key: "218- Roller Shade Sheer" },
                                            { key: "218- RollerShade BO Brkts" },
                                            { key: "218- RollerShade SH Brkts" },
                                            { key: "218- Side Channels" },
                                            { key: "219- Roller Shade B/O" },
                                            { key: "219- Roller Shade Fascia" },
                                            { key: "219- Roller Shade Sheer" },
                                            { key: "219- RollerShade BO Brkts" },
                                            { key: "219- RollerShade SH Brkts" },
                                            { key: "219- Side Channels" },
                                            { key: "220- Roller Shade B/O" },
                                            { key: "220- Roller Shade Fascia" },
                                            { key: "220- Roller Shade Sheer" },
                                            { key: "220- RollerShade BO Brkts" },
                                            { key: "220- RollerShade SH Brkts" },
                                            { key: "220- Side Channels" },
                                            { key: "221- Roller Shade B/O" },
                                            { key: "221- Roller Shade Fascia" },
                                            { key: "221- Roller Shade Sheer" },
                                            { key: "221- RollerShade BO Brkts" },
                                            { key: "221- RollerShade SH Brkts" },
                                            { key: "221- Side Channels" },
                                            { key: "222- Roller Shade B/O" },
                                            { key: "222- Roller Shade Fascia" },
                                            { key: "222- Roller Shade Sheer" },
                                            { key: "222- RollerShade BO Brkts" },
                                            { key: "222- RollerShade SH Brkts" },
                                            { key: "222- Side Channels" },
                                            { key: "224- Roller Shade B/O" },
                                            { key: "224- Roller Shade Fascia" },
                                            { key: "224- Roller Shade Sheer" },
                                            { key: "224- Roller Shade BO Brkts" },
                                            { key: "224- Side Channels" },
                                            { key: "226ADA- Roller Shade B/O" },
                                            { key: "226ADA- Roller Shade Fascia" },
                                            { key: "226ADA- Roller Shade Sheer" },
                                            { key: "226ADA- RollerShade BO Brkts" },
                                            { key: "226ADA- RollerShade SH Brkts" },
                                            { key: "226ADA- Side Channels" },
                                        ]}

                                        renderItem={({ item }) =>
                                            // On click item will take user to the selected job passing item.key as a prop to get the information needed from the Database

                                            <TouchableOpacity style={{}} onPress={() => {
                                                this.openTreatments()
                                                this.setState({ Treatments: item.key })
                                            }}><View key={item.key} style={{ flexDirection: 'row', width: '100%', borderColor: 'transparent', borderBottomColor: '#ff8802', borderTopColor: '#ff8802', borderWidth: 2, paddingTop: 2, paddingBottom: 2, marginTop: 5, backgroundColor: '#F5F5F5' }}>

                                                    {/* Text pertainig to Job name and location of the job will be filled in with the recived data from the database */}
                                                    <Text style={{ padding: 5, color: 'black', fontSize: 22, textAlign: 'center' }}>{item.key}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        } />
                                </ScrollView>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.openTreatments()
                            }}>
                                <Image style={{ width: 30, height: 30, marginTop: this.state.TreatmentsImg, transform: [{ rotate: this.state.TreatmentsDeg + 'deg' }] }} source={require('../assets/images/issue_drop.png')} />
                            </TouchableOpacity>

                        </View>


                        {/* IssueType */}
                        <View style={{ borderColor: 'transparent', width: '90%', flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, }}>
                            <View style={{ width: '90%', height: this.state.IssueTypeHeight }}>
                                <View style={{ borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, width: '100%', flexDirection: 'row', marginTop: 3 }}>
                                    <Text style={{ width: '50%', height: 30, fontSize: 23, }}>
                                        Issue Type
                                </Text>
                                    <Text style={{ width: '50%', height: 30, fontSize: 23, }}>
                                        {this.state.IssueType}
                                    </Text>
                                </View>
                                <ScrollView style={{ width: '100%', }}>
                                    <FlatList
                                        //Data acuired from the flatlist will be from the database with the  get latest job call
                                        data={[
                                            { key: "Damaged in Shipment" },
                                            { key: "Damaged Hardware" },
                                            { key: "Flawed Fabric" },
                                            { key: "Incorrect" },
                                            { key: "Missing" },
                                            { key: "Missing Hardware" },
                                            { key: "Paint" },
                                            { key: "Stain on Fabric" },
                                            { key: "Other" },
                                        ]}

                                        renderItem={({ item }) =>
                                            // On click item will take user to the selected job passing item.key as a prop to get the information needed from the Database
                                            <TouchableOpacity style={{}} onPress={() => {
                                                this.openIssueType()
                                                this.setState({ IssueType: item.key })
                                            }}>
                                                <View key={item.key} style={{ flexDirection: 'row', width: '100%', borderColor: 'transparent', borderBottomColor: '#ff8802', borderTopColor: '#ff8802', borderWidth: 2, paddingTop: 2, paddingBottom: 2, marginTop: 5, backgroundColor: '#F5F5F5' }}>
                                                    {/* Text pertainig to Job name and location of the job will be filled in with the recived data from the database */}
                                                    <Text style={{ padding: 5, color: 'black', fontSize: 22, textAlign: "center" }}>{item.key}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        } />
                                </ScrollView>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.openIssueType()
                            }}>
                                <Image style={{ width: 30, height: 30, marginTop: this.state.IssueTypeImg, transform: [{ rotate: this.state.IssueTypeDeg + 'deg' }] }} source={require('../assets/images/issue_drop.png')} />
                            </TouchableOpacity>

                        </View>
                        {/* Brief Explanation */}
                        <View style={{ borderColor: 'black', width: '90%', flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', borderWidth: 2, height: 150, borderRadius: 5 }}>
                            <TextInput
                                style={{ maxHeight: 150, maxWidth: 350, width: '100%', fontSize: 22, padding: 10 }}
                                keyboardType='default'
                                onChangeText={(text) => this.setState({ BriefExplanation: text })}
                                value={this.state.BriefExplanation}
                                placeholder={'Brief Explanation'}
                                placeholderTextColor={'black'}
                                multiline={true}
                            />
                        </View>


                        <Text style={{ fontSize: 23, marginVertical: 25, textAlign: 'center' }}> Capture or Upload a Photo (Optional)</Text>
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <TouchableOpacity style={{ width: '30%', height: 50, marginHorizontal: '10%' }} onPress={() => { this.DisplayCamera() }}>
                                <View style={{ flexDirection: 'row', width: '100%', height: 50, backgroundColor: '#00ace3', borderRadius: 10, borderColor: '#00ace3', borderWidth: 5, overflow: 'hidden', }}>
                                    <Image style={{ width: 40, height: 40, }} source={require('../assets/images/take_photo.png')} />
                                    <Text style={{ paddingLeft: 5, paddingTop: 12, fontSize: 16, color: 'white' }}>Camera</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '30%', height: 50, marginHorizontal: '10%' }} onPress={() => { this.DisplayGallery() }}>
                                <View style={{ flexDirection: 'row', width: '100%', height: 50, backgroundColor: '#ff8802', borderRadius: 10, borderColor: '#ff8802', borderWidth: 5, overflow: 'hidden', }}>
                                    <Image style={{ width: 40, height: 40, }} source={require('../assets/images/submit.png')} />
                                    <Text style={{ paddingLeft: 5, paddingTop: 12, fontSize: 16, color: 'white' }}>Gallery</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ marginTop: 25, height: 65, backgroundColor: '#F5F5F5', width: 150, marginHorizontal: '33%', paddingVertical: 0, borderColor: 'transparent', borderBottomColor: '#ff8802', borderTopColor: '#ff8802', borderWidth: 2, textAlign: 'center' }}
                            onPress={this.submitPressed()}>
                            <Text style={{ fontSize: 32, color: '#ff8802', fontWeight: '600', marginTop: '8%', textAlign: "center" }}> Submit </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>


                <View style={{ flex: 1, display: this.state.CameraDisplay, width: '100%', height: 'auto', paddingVertical: 50, backgroundColor: 'black' }}>
                    <Camera style={{ flex: 1, }} type={this.state.type} ref={ref => { this.Camera = ref }} >
                        <View style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                            <View style={{ position: 'absolute', width: '100%', bottom: 50, flexDirection: 'row', height: 50, alignContent: 'center', marginHorizontal: '0%' }}>
                                <View style={{ width: 175, }}></View>
                                <View style={{ width: 75, }}>
                                    <TouchableWithoutFeedback onPress={() => { this.handleShortCapture() }}>
                                        <View style={[style.captureBtn, capturing && style.captureBtnActive]}>
                                            {capturing && <View style={style.captureBtnInternal} />}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={{ width: 75, paddingTop: 15 }}>
                                    <TouchableOpacity onPress={() => { this.DisplayCamera() }}>
                                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Back </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Camera>
                </View>


                <View style={{ flex: 1, display: this.state.PhotoDisplay, height: '80%', backgroundColor: 'black' }}>

                    <View style={{ flexDirection: 'row', height: '90%' }}>
                        <Image style={{
                            width: '95%',
                            height: '90%',
                            marginHorizontal: '2.5%',
                            marginTop: '8%'
                        }} source={this.state.capture} />
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ width: '30%', alignItems: 'center', marginLeft: '15%', marginRight: '5%' }} onPress={() => { this.DisplayCamera() }}>
                            <Icon
                                name={'arrow-left'}
                                type='font-awesome'
                                iconStyle={{ color: 'white', }}
                                size={35}
                            />
                            <Text style={{ color: 'white', fontSize: 16, }}>Retake Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '30%', alignItems: 'center', marginLeft: '5%', marginRight: '15%' }} onPress={() => { this.saveImage(this.state.capture) }}>
                            <Icon
                                name={'save'}
                                type='font-awesome'
                                iconStyle={{ color: 'white' }}
                                size={35}
                            />
                            <Text style={{ color: 'white', fontSize: 18, }}>Save to Issue</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ flex: 1, display: this.state.GalleryDisplay, flexWrap: 'wrap', width: '100%', height: '100%' }}>
                    {this.state.photos.map((p, i) => {
                        return (
                            <TouchableOpacity key={i} onPress={() => { this.saveImage(p.node.image.uri) }} >
                                <Image
                                    key={i}
                                    style={{
                                        width: 125,
                                        height: 125,
                                    }}

                                    source={{ uri: p.node.image.uri }}
                                />
                            </TouchableOpacity>
                        );
                    })
                    }
                </View>

            </View>
        );
    }
}

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