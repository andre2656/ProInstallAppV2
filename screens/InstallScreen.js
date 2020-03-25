import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Picker,
    TouchableWithoutFeedback
} from 'react-native';
import { Camera } from 'expo-camera';
import CheckBox from 'react-native-check-box';
import { Icon, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import style from '../components/camera/styles';
const capturing = false;


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        Building: '1',
        Unit: '',
        Rooms: null,
        Windows: 0,
        text: '',
        isChecked: true,
        JobName: 'The Hilton',
        menuOpen: false,
        displayMenu: 0,
        WindowDisplay: 'none',
        InstallDisplay: 'flex',
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        CameraDisplay: 'none',
        capturing: null,
        SubmitTitle: 'Next Room',
        capture: {},
        errText: '',
        continueMeasure: false,
        PhotoDisplay: 'none',
        GalleryDisplay: 'none',
        photos: [],
        image: null,
        RoomNumber: 1,
    }

    //Needs Notes
    async componentDidMount() {
        let Name = this.props.navigation.getParam('name')
        this.setState({ JobName: Name })
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' });
        // RNCameraRoll.getPhotos({
        //     first: 50,
        //     groupTypes: 'All',
        //     assetType: 'All',
        // }).then(r => {
        //     // console.log(r.edges)
        //     this.setState({ photos: r.edges })
        // })
    }


    displayWindow = () => {
        if (this.state.Unit !== '' && this.state.Rooms !== 'null') {
            this.setState({ InstallDisplay: 'none', WindowDisplay: 'flex', CameraDisplay: 'none', PhotoDisplay: 'none', GalleryDisplay: 'none', },
                () => {
                })
        } else if (this.state.Unit.length === 0) {
            this.setState({ continueMeasure: false }, () => {
                return (<Text>Please select the Number of Rooms</Text>)
            })
            return (<Text>Please fill out the Unit Number</Text>)
        } else if (this.state.Rooms === 'null') {
            this.setState({ continueMeasure: false }, () => {
                return (<Text>Please select the Number of Rooms</Text>)
            })
        }
    }
    validateInstall = () => {
        if (this.state.Unit !== '' && this.state.Rooms !== 'null' && this.state.RoomType !== 'null' && this.state.Windows !== 'null') {
            this.setState({ RoomNumber: this.state.RoomNumber + 1 }, () => {
                this.sendData()
            })
        } else {
            console.log('error please completly fill out the fomr to submit')
        }
    }
    sendData = () => {
        //Make this a push route to the database.
        if (this.state.RoomNumber >= this.state.Rooms + 1) {
            this.props.navigation.navigate('Home')
        } else if (this.state.RoomNumber >= this.state.Rooms) {
            this.setState({ RoomType: null, Windows: null, SubmitTitle: 'Submit' })
        }
        else {
            //clear form and display number
            this.setState({ RoomType: null, Windows: null })
        }

    }
    saveImage = (id, job_id, is_approved, manuv, url, thumburl, uri, filename, label, uploaded_by, photo_date, submmitted_at, photo_type_id, room_number, room_tag, floor_id, detail_image) => {
        //save uri to the db
        let d = new Date();
        let date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
        console.log(date)
        let SavedImage = {
            id: this.props.ID,
            job_id: this.props.JOB_ID,
            manuv: 1,
            url: 'returned url from AWS string',
            thumburl: 'returned url from AWS string',
            filename: uri,
            label: label,
            uploaded_by: this.props.USER_ID,
            photo_date: date,
            submmitted_at: date,
            photo_type_id: 2,
            room_number: this.state.Unit + " " + this.state.Building,
            room_tag: 'No',
            floor_id: null,
            detail_image: 'Yes'
        }
        console.log(uri)
        this.displayWindow()
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
    displayInstall = () => {
        this.setState({ InstallDisplay: 'flex', WindowDisplay: 'none', CameraDisplay: 'none', PhotoDisplay: 'none', GalleryDisplay: 'none', })
    }

    DisplayPhoto = (capture) => {
        if (this.state.PhotoDisplay === 'none') {
            this.setState({ CameraDisplay: 'none', InstallDisplay: 'none', WindowDisplay: 'none', PhotoDisplay: 'flex', GalleryDisplay: 'none', DisplayCapture: capture })

        }
        else if (this.state.PhotoDisplay === 'flex') {
            this.DisplayCamera()
            return
        }
    }


    DisplayCamera = () => {
        if (this.state.CameraDisplay === 'none') {
            this.setState({ CameraDisplay: 'flex', InstallDisplay: 'none', WindowDisplay: 'none', PhotoDisplay: 'none', GalleryDisplay: 'none', })
        }
        else if (this.state.CameraDisplay === 'flex') {
            this.displayWindow()
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    DisplayGallery = () => {
        // if (this.state.GalleryDisplay === 'none') {
        //     this.setState({ GalleryDisplay: 'flex', InstallDisplay: 'none', WindowDisplay: 'none', PhotoDisplay: 'none', CameraDisplay: 'none' }),
        //     this.GalleryDisplay()
        // }
        // else if (this.state.GalleryDisplay === 'flex') {
        //     this.displayWindow()
        // }
        this.GalleryDisplay()
    }
    GalleryDisplay = () => {


        // RNCameraRoll.getPhotos({
        //     first: 50,
        //     groupTypes: 'all',
        //     assetType: 'image',
        // })
        //     .then(r => {
        //         console.log(r.edges),
        //         console.log('should be working'),
        //             () => {
        //                 console.log('r= ', r.edges);
        //                 if (this.state.photos.length === 0) {
        //                     return <Text> Error, No photos found. (404) </Text>
        //                 } else if (this.state.photos.length >= 0) {
        //                     this.setState({ photos: r.edges }, console.log(r.edges))
        //                 }

        //             };
        //     })
        //     .catch((err) => {
        //         //Error Loading Images
        //         console.log(err)
        //     });
        // RNCameraRoll.getAssets({
        //     assetType: 'all', limit: 10, })
        //     .then(response => console.log(response + 'hello world'))
        //     .catch(err => console.error(err + 'bye world'));
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
                iconStyle={{ height: 85, width: '100%', marginBottom: -50, backgroundColor: 'black', paddingLeft: '44%', paddingRight: '44%', paddingTop: 10, paddingBottom: '50%', color: '#00c387' }}
                color={tintColor}
            />
        ),
    });

    Picker = (check) => {
        if (check) {
            return (
                <Picker
                    selectedValue={this.state.Rooms}
                    itemStyle={{ color: 'black', fontSize: 25 }}
                    style={{ height: 210, width: '70%', marginHorizontal: '15%', borderColor: '#00c387', borderRadius: 10, borderWidth: 3, backgroundColor: '#F5F5F5', overflow: 'hidden', marginVertical: '3%' }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ Rooms: itemValue })
                    }>
                    <Picker.Item label="Rooms" value={null} />
                    <Picker.Item label="2" value={2} />
                    <Picker.Item label="3" value={3} />
                    <Picker.Item label="4" value={4} />
                    <Picker.Item label="5" value={5} />
                </Picker>
            )
        }
        else {
            return
        }
    }
    WindowCapture = (windows) => {
        let WindowSelections = [];
        let letters = ['A', 'B', 'C', 'D', 'E',]
        if (windows === 0) {
            return (
                <View><Text style={{ fontSize: 20, color: 'red' }}>Select the windows in this room</Text></View>
            )
        }
        else if (windows >= 1) {
            for (i = 0; i < windows; i++) {
                WindowSelections.push(
                    <View key={i} style={{ flexDirection: 'row', width: '95%', borderColor: '#00c387', borderWidth: 2, borderRadius: 5, paddingTop: 5, paddingBottom: 5, marginTop: 15, marginHorizontal: '2.5%', backgroundColor: 'white' }}>
                        <View style={{ width: '70%', }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> Capture or Select a photo for <Text style={{ fontSize: 22, color: '#00c387', fontWeight: '600' }}>Window {letters[i]}</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '30%' }}>

                            {/* OnClick => go to users gallery give option to select just one or multiple. */}
                            <TouchableOpacity style={{ width: '45%', height: 50, marginHorizontal: '2.5%' }} onPress={() => { this._pickImage() }}>
                                <View style={{ flexDirection: 'row', width: '100%', height: 50, backgroundColor: '#ff8802', borderRadius: 10, borderColor: '#ff8802', borderWidth: 5, overflow: 'hidden', alignContent: 'center' }}>
                                    <Icon
                                        name={'image'}
                                        type='font-awesome'
                                        iconStyle={{ color: 'white', }}
                                        size={40} style={{ width: '100%', height: 40, }} />
                                </View>
                            </TouchableOpacity>

                            {/* OnClick => access users camera and have them take of job. */}
                            <TouchableOpacity style={{ width: '45%', height: 50, marginHorizontal: '2.5%' }} onPress={() => { this.DisplayCamera() }}>

                                <View style={{ flexDirection: 'row', width: '100%', height: 50, backgroundColor: '#00ace3', borderRadius: 10, borderColor: '#00ace3', borderWidth: 4, overflow: 'hidden', alignItems: 'center' }}>
                                    <Icon
                                        name={'camera'}
                                        type='font-awesome'
                                        iconStyle={{ color: 'white', }}
                                        size={38} style={{ height: 40, }} />
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View className='row' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {this.state.window &&
                                <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                        </View>
                    </View>
                )
            }
            return (WindowSelections)
        }
    }





    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container} style={{ backgroundColor: 'white', height: '100%' }} >
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
                    <View style={{ display: this.state.InstallDisplay }}>
                        <ScrollView>
                            {/* Job title is recived from the db selected by the user passed down as a prop then saved as state. */}
                            <Text style={{ fontSize: 30, textDecorationLine: 'underline', fontWeight: 'bold', marginVertical: '3%', textAlign: 'center', marginTop: '15%' }}>
                                {this.state.JobName}
                            </Text>

                            <View style={{ flexDirection: 'row', marginTop: 25, width: '65%', alignContent: "center", marginHorizontal: '17.5%' }}>
                                <Text style={{ height: 40, fontSize: 25, fontWeight: '700', width: '30%', paddingRight: 5, paddingTop: 5 }}>Unit # </Text>
                                <TextInput
                                    style={{ maxHeight: 35, borderColor: '#00c387', borderWidth: 2, width: '70%', fontSize: 20, borderRadius: 25, backgroundColor: '#F5F5F5', paddingLeft: 10 }}
                                    keyboardType='default'
                                    onChangeText={(text) => this.setState({ Unit: text })}
                                    value={this.state.Unit}
                                />
                            </View>

                            {/* If it a single room The box will be checked however whilethe box is unchecked the Room #s will be required. */}
                            <CheckBox
                                style={{ paddingLeft: '15%', width: '100%', height: 30, marginVertical: '6%', paddingRight: '15%' }}
                                onClick={() => {
                                    this.setState({
                                        isChecked: !this.state.isChecked,
                                    }, () => {
                                        if (this.state.isChecked === false) {
                                            this.setState({ Rooms: 1, SubmitTitle: 'Submit', })
                                        }
                                    })
                                }}
                                isChecked={!this.state.isChecked}
                                leftText={"THIS IS A SINGLE ROOM"}
                                leftTextStyle={{ fontSize: 20 }}
                                checkedImage={<Image source={require('../assets/images/active.png')} style={{ height: 30, width: 60 }} />}
                                unCheckedImage={<Image source={require('../assets/images/disable.png')} style={{ height: 30, width: 60 }} />}
                            />
                            {/* If the amount of rooms is not one then the crew can select the number of rooms in that unit.
               It will be hidden if the check is true and showing if it is false. */}
                            {this.Picker(this.state.isChecked)}
                            {/* Button will check if we have received all of the information 
                then save all ofthe information to state and pass it down as a prop 
                Once full form is filled out then we can send it to the DB */}
                            <TouchableOpacity style={{ marginTop: 25, height: 65, backgroundColor: '#F5F5F5', width: 150, marginHorizontal: '33%', marginBottom: 50, borderColor: 'transparent', borderBottomColor: '#00c387', borderTopColor: '#00c387', borderWidth: 2, textAlign: 'center' }}
                                onPress={() => { this.setState({ continueMeasure: true }, () => { this.displayWindow(true) }) }}>
                                <Text style={{ fontSize: 32, color: '#00c387', fontWeight: '600', marginTop: '8%', }}> Continue </Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>


                    <View style={{ display: this.state.WindowDisplay, height: '100%' }}>
                        {/* Lets the crew easily pick what type of room it is 
                 while keeping all of the answers uniform. */}
                        <ScrollView>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '50%', fontSize: 30, textDecorationLine: 'underline', fontWeight: '600', marginVertical: '6%', textAlign: 'center', }}>Unit: {this.state.Unit}</Text>
                                <Text style={{ width: '50%', fontSize: 30, textDecorationLine: 'underline', fontWeight: '600', marginVertical: '6%', textAlign: 'center', }}>Room: {this.state.RoomNumber}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                {/* RoomType and Windows will be passed down through state/propsto the MeasureWindowv2Screen. */}
                                <Text style={{ height: 40, fontSize: 25, marginTop: '4%', marginHorizontal: '10%', }}>Room Type </Text>
                                <Text style={{ height: 40, fontSize: 25, marginTop: '4%', marginHorizontal: '10%', }}>Window # </Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Picker
                                    selectedValue={this.state.RoomType}
                                    style={{ height: 210, width: '45%', marginHorizontal: '2.5%', borderColor: '#00c387', borderRadius: 10, borderWidth: 3, backgroundColor: '#F5F5F5', overflow: 'hidden', marginBottom: 20 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ RoomType: itemValue })
                                    }>
                                    <Picker.Item label="(Default)" value="Default" />
                                    <Picker.Item label="Living Room" value="LivingRoom" />
                                    <Picker.Item label="Master Bedroom" value="MasterBedroom" />
                                    <Picker.Item label="Guest Room" value="GuestRoom" />
                                    <Picker.Item label="Kitchen" value="Kitchen" />
                                </Picker>
                                <Picker
                                    selectedValue={this.state.Windows}
                                    itemStyle={{ color: 'black', fontSize: 25 }}
                                    style={{ height: 210, width: '45%', marginHorizontal: '2.5%', borderColor: '#00c387', borderRadius: 10, borderWidth: 3, backgroundColor: '#F5F5F5', overflow: 'hidden' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ Windows: itemValue })
                                    }>
                                    <Picker.Item label="Windows" value="null" />
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                </Picker>
                            </View>
                            {this.WindowCapture(this.state.Windows)}

                            <View style={{ flexDirection: 'row', marginBottom: 150 }}>
                                <View style={{ marginTop: 10, width: '50%', }}>
                                    <Button
                                        icon={{
                                            name: 'arrow-left',
                                            type: 'font-awesome',
                                            color: 'black',
                                            size: 30
                                        }}
                                        buttonStyle={{ backgroundColor: 'white', width: '100%' }}
                                        label={'Back'}
                                        onPress={() => { this.displayInstall() }}
                                    />
                                    <Text style={{ color: 'black', width: '90%', paddingHorizontal: '5%', textAlign: 'center', marginTop: -3, fontSize: 18 }}>Back</Text>
                                </View>
                                <View style={{ marginTop: 10, width: '50%', }}>
                                    <Button
                                        icon={{
                                            name: 'arrow-right',
                                            type: 'font-awesome',
                                            color: 'black',
                                            size: 30
                                        }}
                                        buttonStyle={{ backgroundColor: 'white', width: '100%' }}
                                        label={this.state.SubmitTitle}
                                        onPress={() => { this.validateInstall() }}
                                    />
                                    <Text style={{ color: 'black', width: '90%', paddingHorizontal: '5%', textAlign: 'center', marginTop: -3, fontSize: 18 }} >{this.state.SubmitTitle}</Text>
                                </View>
                            </View>
                            {/* Button will be used to check if everything is filled out
                     and advance the room count while sending the data recived to the DB */}
                        </ScrollView>
                    </View>


                    <View style={{ flex: 1, display: this.state.CameraDisplay }}>
                        <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.Camera = ref }} >
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
                                        <TouchableOpacity
                                            style={{

                                            }}
                                            onPress={() => {
                                                this.DisplayCamera()
                                                // this.setState({
                                                //     type:
                                                //         this.state.type === Camera.Constants.Type.back
                                                //             ? Camera.Constants.Type.front
                                                //             : Camera.Constants.Type.back,
                                                // });
                                            }}>
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
