import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Picker,
    Animated
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Colors from '../Icon/Colors';

//Code for JobSearch Needs Notes
export default class JobSearch extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        Filter: 'JobName',
        JobName: null,
        Location: null,
        Date: null,
        DateMonth: '',
        DateYear: '',
        DateDay: '',
        MainSearch: 'auto',
        JobnNameDisplay: 'flex',
        LocationDisplay: 'none',
        DateDisplay: 'none',
    }
    Search = (Filter) => {
        if (Filter === 'JobName') {
            this.JobName(this.state.JobName)
        } else if (Filter === 'Location') {
            this.Location(this.state.Location)
        } else if (Filter === 'Date') {
            this.Date(this.state.DateMonth, this.state.DateDay, this.state.DateYear)
        }
    }
    JobName = (jobName) => {
        if (jobName === 'DB jobName ') {
            return ('Lots of stuff')
        }
    }
    Location = (location) => {
        if (location === 'DB Location ') {
            return ('Lots of stuff')
        }
    }
    Date = (month, day, year) => {
        if (month <= 12 && month >= 0 && day <= 31 && day >= 0 && year >= 2000 && year <= 2030) {
            const date = [month, '-', day, '-', year].join()
            console.log(date)
            this.setState({ Date: date })
            if (date === ' Dates Pulled from DB ') {
                return ('Lots of stuff')
            }
        }
    }
    DisplayFilters = (filter) => {
        if (filter === 'Date') {
            this.setState({ DateDisplay: 'flex', LocationDisplay: 'none', JobnNameDisplay: 'none' })
        } else if (filter === 'Location') {
            this.setState({ DateDisplay: 'none', LocationDisplay: 'flex', JobnNameDisplay: 'none' })
        } else {
            this.setState({ DateDisplay: 'none', LocationDisplay: 'none', JobnNameDisplay: 'flex' })
        }
    }


    Picker = (check) => {
        if (check) {
            return (
                <FadeInView>
                    <Picker
                        selectedValue={this.state.Filter}
                        itemStyle={{ color: 'black', fontSize: 25 }}
                        style={{ height: 210, width: '70%', marginHorizontal: '15%', borderColor: '#fe4444', borderRadius: 10, borderWidth: 3, backgroundColor: 'white', overflow: 'hidden', marginTop: '15%' }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ Filter: itemValue, isChecked: !this.state.isChecked },
                                () => {
                                    this.DisplayFilters(itemValue)
                                })
                        }}>
                        <Picker.Item label="Job Name" value="JobName" />
                        <Picker.Item label="Location" value="Location" />
                        <Picker.Item label="Date" value='Date' />
                    </Picker>
                </FadeInView >

            )
        }
    }


    render() {
        return (
            <View style={{}} style={{ backgroundColor: 'white', height: '100%' }} >
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
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#00c387', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#00ace3', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#fe4444', }}></View>
                    <View style={{ width: '25%', height: 15, backgroundColor: '#ff8802', }}></View>
                </View>
                <View style={{ marginVertical: '5%', }}></View>
                <View style={{ flexDirection: 'row', width: '100%', height: this.state.MainSearch }}>
                    <View style={{ width: '17.5%', }}>
                        <Icon
                            onPress={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked,
                                })
                            }}
                            name={'filter'}
                            type='font-awesome'
                            iconStyle={{ backgroundColor: 'white', color: 'black', }}
                            size={32}
                            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                        />
                    </View>
                    <TextInput
                        style={{ maxHeight: 23, maxWidth: '65%', borderColor: 'white', borderBottomColor: 'black', borderWidth: 2, width: '77%', fontSize: 23, marginTop: '3%', backgroundColor: 'white', paddingRight: 10, display: this.state.JobnNameDisplay }}
                        keyboardType='default'
                        size={25}
                        onChangeText={(text) => this.setState({ JobName: text })}
                        value={this.state.text}
                        placeholder={'Job Name'}
                    />
                    <TextInput
                        style={{ maxHeight: 23, maxWidth: '65%', borderColor: 'white', borderBottomColor: 'black', borderWidth: 2, width: '77%', fontSize: 23, marginTop: '3%', backgroundColor: 'white', paddingRight: 10, display: this.state.LocationDisplay }}
                        keyboardType='default'
                        size={25}
                        onChangeText={(text) => this.setState({ Location: text })}
                        value={this.state.text}
                        placeholder={'Location'}
                    />
                    <View style={{ flexDirection: 'row', }}>

                    </View>
                    <TextInput
                        style={{ maxHeight: 23, maxWidth: '17.5%', borderColor: 'white', borderBottomColor: 'black', borderWidth: 2, width: '77%', fontSize: 23, marginTop: '3%', backgroundColor: 'white', display: this.state.DateDisplay, paddingLeft: 10 }}
                        keyboardType='numeric'
                        size={25}
                        onChangeText={(text) => this.setState({ DateMonth: text })}
                        value={this.state.text}
                        placeholder={'MM'}
                        maxLength={2}
                    />
                    <Text style={{ paddingTop: 5, fontSize: 25, display: this.state.DateDisplay }}> / </Text>
                    <TextInput
                        style={{ maxHeight: 23, maxWidth: '17.5%', borderColor: 'white', borderBottomColor: 'black', borderWidth: 2, width: '77%', fontSize: 23, marginTop: '3%', backgroundColor: 'white', display: this.state.DateDisplay, paddingLeft: 10 }}
                        keyboardType='numeric'
                        size={25}
                        onChangeText={(text) => this.setState({ DateDay: text })}
                        value={this.state.text}
                        placeholder={'DD'}
                        maxLength={2}
                    />
                    <Text style={{ paddingTop: 5, fontSize: 25, display: this.state.DateDisplay }}> / </Text>
                    <TextInput
                        style={{ maxHeight: 23, maxWidth: '20%', borderColor: 'white', borderBottomColor: 'black', borderWidth: 2, width: '77%', fontSize: 23, marginTop: '3%', backgroundColor: 'white', display: this.state.DateDisplay, paddingLeft: 10, color: this.state.YearColor }}
                        keyboardType='numeric'
                        size={25}
                        onChangeText={(text) => { this.setState({ DateYear: text }) }}
                        maxLength={4}
                        value={this.state.text}
                        placeholder={'YYYY'}
                    />
                    <View style={{ width: '17.5%', }}>
                        <Icon
                            onPress={this.Search(this.state.Filter)}
                            name={'search'}
                            type='font-awesome'
                            iconStyle={{ backgroundColor: 'white', color: 'black', }}
                            size={32}
                            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                        />
                    </View>
                </View>
                {this.Picker(this.state.isChecked)}
                <ScrollView>
                    {/* If it a single room The box will be checked however whilethe box is unchecked the Room #s will be required. */}

                    {/* If the amount of rooms is not one then the crew can select the number of rooms in that unit.
                         It will be hidden if the check is true and showing if it is false. */}


                    {/* Button will check if we have received all of the information 
                then save all ofthe information to state and pass it down as a prop 
                Once full form is filled out then we can send it to the DB */}
                    <Text style={{ fontSize: 23, color: '#fe4444', marginTop: '8%', }}> Results:    Results will be listed here based on the information reveived from the DB</Text>

                </ScrollView>

                {/* Style for the Page layout */}
                <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                    <View style={{ width: '25%', height: 20, backgroundColor: '#ff8802', }}></View>
                    <View style={{ width: '25%', height: 20, backgroundColor: '#fe4444', }}></View>
                    <View style={{ width: '25%', height: 20, backgroundColor: '#00ace3', }}></View>
                    <View style={{ width: '25%', height: 20, backgroundColor: '#00c387', }}></View>
                </View>
            </View>
        );
    }
}

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 100,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    };
};