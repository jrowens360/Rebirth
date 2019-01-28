import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Constants from '../constants';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Info_Profile from "../containers/info_profile";
import Background from '../components/common/BackgroundImg';
import { connect } from 'react-redux';


class Info extends Component {


    constructor(props) {
        super(props);
        this.state = {
            index: 1
        };
    }
    onPress() {

        this.props.navigation.navigate("dashboard")

    }



    render() {

        return (
            <Background style={styles.container} src={Constants.Images.user.infobg}>
                <Text style={styles.maintext}>How to take Photos?</Text>
                {/* <Text style={styles.text}>Please select how you prefer to take photos</Text> */}
                <View style={styles.mainContainer}>
                    <ScrollableTabView
                        onChangeTab={(value) => {
                            this.setState(
                                {
                                    index: value.i
                                }
                            );
                        }}                  >
                        <Info_Profile tabLabel="Front View" img={Constants.Images.user.infoFront} />
                        <Info_Profile tabLabel="Side View" img={Constants.Images.user.infoSide} />
                    </ScrollableTabView>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3, }}>
                    <View style={this.state.index == 0 ? styles.activeDot : styles.inactiveDot}></View>
                    <View style={[this.state.index == 1 ? styles.activeDot : styles.inactiveDot, { marginLeft: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5, }]}></View>

                </View>
                <TouchableOpacity
                    onPress={() => this.onPress()}
                    style={styles.buttonStyle} >
                    <Text style={{ color: "#fff" }}>I Understand</Text>
                </TouchableOpacity>
            </Background>
        );
    }
}
const styles = StyleSheet.create({
    container: {

        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    maintext: {
        marginTop: 18,
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    text: {
        color: "white",
        fontSize: 14,
        textAlign: "center"
    },
    activeDot: { backgroundColor: Constants.Colors.Purple, height: 8, width: 8, borderRadius: 4 },
    inactiveDot: { backgroundColor: 'gray', height: 8, width: 8, borderRadius: 4 },
    mainContainer: {
        flex: 1,
        paddingTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
        //paddingBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*10,
        marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
        backgroundColor: Constants.Colors.White,
        marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        borderRadius: 10

    },
    buttonStyle: {
        marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        borderRadius: 20,
        backgroundColor: Constants.Colors.Purple,
        padding: 12,
        width: "40%",
        alignSelf: 'center',
        justifyContent: "center", alignItems: 'center'
    },
})

export default connect(null, null)(Info);