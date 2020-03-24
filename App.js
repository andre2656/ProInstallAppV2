import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';



import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MainJobTabs, { createSimpleTabs } from './navigation/MainJobTabs';
import CheckBox from 'react-native-check-box';

const data = [
  { component: MainJobTabs, title: 'Job', routeName: 'JobTabs' },
  { component: RouteNav, title: 'MainMenu', routeName: 'Main' },
];

['initialRoute', 'none', 'order', 'history'].forEach(backBehavior => {
  data.push({
    component: createSimpleTabs({
      backBehavior: backBehavior,
      initialRouteName: 'Main', // more easy to test initialRoute behavior
    }),
    title: `Tabs backBehavior=${backBehavior}`,
    routeName: `Tabs backBehavior=${backBehavior}`,
  });
});
Asset.loadAsync(StackAssets);

export class App extends React.Component {

  state = {
    isLoadingComplete: false,
    menuOpen: false,
    displayMenu: 0,
    isChecked: true,
    email: 'andre2656@gmail.com',
    password: 'password'
  };
  login = (e) => {
    console.log('login commencing')
    this.props.navigation.navigate('Main')

    // loginController.login('andre2656@gmail.com', 'test', (err, user) => {

    //   if (err) {
    //     console.log(err)
    //   } else {
    //    console.log('login success ')
    //     
    //   }
    // });
  }


  setUser = (user) => {
    console.log("setUser", user);
    this.setState({ user: user });
  }

  _renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      onPress={() => this.props.navigation.navigate(item.routeName)}
    />
  );
  menuClicked = () => {
    if (this.state.menuOpen) {
      this.setState({
        menuOpen: false,
        displayMenu: 0,
      })
    } else if (!this.state.menuOpen) {
      this.setState({
        menuOpen: true,
        displayMenu: 65,
      })
    }
  };
  submitPressed = () => {

    //add verification here
    this.props.navigation.navigate('Main')

  }
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: navigation.getParam('title'),
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={navigation.getParam('icon')}
        type='font-awesome'
        iconStyle={{ height: 100, width: '100%', marginBottom: -50, backgroundColor: 'black', paddingLeft: '44%', paddingRight: '44%', paddingTop: 10, paddingBottom: '50%', color: 'white' }}
        color={tintColor}
      />
    ),
  });
  static navigationOptions = {
    header: null,
  };

  _keyExtractor = item => item.routeName;

  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="dark" />
        <SafeAreaView style={{ backgroundColor: '#CCCCCC', height: '100%' }}>
          {/* Header Photos With Styling Included */}
          <View style={{ backgroundColor: '#CCCCCC', flexDirection: 'row', paddingTop: 15, width: '100%', height: 50 }}>
            <View style={{ width: '15%', paddingLeft: '5%' }}>
              <Image style={{ width: 30, height: 30, marginLeft: 10 }} source={require('./assets/images/welcome.png')} />
            </View>
            <View style={{ marginTop: 5, width: '50%', paddingLeft: '5%' }}>
              <Image style={{ width: 200, height: 25, marginLeft: 10, }} source={require('./assets/images/logo.png')} />
            </View>
            <View style={{ width: '40%', paddingLeft: '10%', height: 55 }}></View>
          </View>
          {/* Header Styling */}
          <View style={{ width: '100%', flexDirection: 'row', }}>
            <View style={{ width: '25%', height: 15, backgroundColor: '#00c387', }}></View>
            <View style={{ width: '25%', height: 15, backgroundColor: '#00ace3', }}></View>
            <View style={{ width: '25%', height: 15, backgroundColor: '#fe4444', }}></View>
            <View style={{ width: '25%', height: 15, backgroundColor: '#ff8802', }}></View>
          </View>

          <View style={{ marginTop: '45%' }}>
            {/* Username For Login Sent to the Database on Submit see UsernameAuth function for verification procedure */}
            <View style={{ borderColor: 'transparent', width: '90%', flexDirection: 'row', marginTop: 20, marginHorizontal: '5%', borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, marginTop: '5%' }}>
              <TextInput style={{ maxHeight: 150, maxWidth: 350, width: '100%', fontSize: 23, padding: 10 }}
                keyboardType='default'
                onChange={this.UsernameAuth}
                placeholder={'Username'}
                placeholderTextColor={'black'}
                returnKeyType={'next'}
                type={'username'} />
            </View>
            {/* Password For Login Sent to the Database on Submit see UsernameAuth function for verification procedure*/}
            <View style={{ borderColor: 'transparent', width: '90%', flexDirection: 'row', marginTop: '6%', marginHorizontal: '5%', borderColor: 'transparent', borderBottomColor: 'black', borderWidth: 2, }}>
              <TextInput style={{ maxHeight: 150, maxWidth: 350, width: '100%', fontSize: 23, padding: 10 }}
                keyboardType='default'
                onChange={this.PasswordAuth}
                placeholder={'Password'}
                placeholderTextColor={'black'}
                secureTextEntry={this.state.isChecked}
                returnKeyType={'done'}
                type={'password'}
              />
            </View>
            <View style={{ flexDirection: 'row', marginVertical: '5%' }}>
              {/* Checkbox for visability of password */}
              <CheckBox
                style={{ paddingLeft: '35%', width: '100%', height: 30, paddingRight: '5%' }}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked,
                  })
                }}
                isChecked={!this.state.isChecked}
                leftText={"Show Password?"}
                leftTextStyle={{ fontSize: 23 }}
                checkedImage={<Image source={require('./assets/images/active.png')} style={{ height: 30, width: 60 }} />}
                unCheckedImage={<Image source={require('./assets/images/disable.png')} style={{ height: 30, width: 60 }} />}
              />

            </View>
            <View style={{ width: '90%', flexDirection: 'row', marginTop: '15%', marginHorizontal: '5%', }}>
              {/* Submit button Calls Login function to verify and compair with DB */}
              <TouchableOpacity
                style={{ marginTop: 25, height: 65, backgroundColor: '#CCCCCC', width: '30%', marginHorizontal: '35%', paddingVertical: 0, borderColor: 'transparent', borderBottomColor: '#282828', borderTopColor: '#282828', borderWidth: 2, textAlign: 'center' }}
                onPress={() => this.login()} >
                <Text style={{ fontSize: 32, color: 'black', fontWeight: '600', marginTop: '8%', textAlign: "center" }}> Login </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Styling */}
          <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0 }}>
            <View style={{ width: '25%', height: 20, backgroundColor: '#ff8802', }}></View>
            <View style={{ width: '25%', height: 20, backgroundColor: '#fe4444', }}></View>
            <View style={{ width: '25%', height: 20, backgroundColor: '#00ace3', }}></View>
            <View style={{ width: '25%', height: 20, backgroundColor: '#00c387', }}></View>
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
