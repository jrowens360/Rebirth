import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Modal, Button,
    FlatList
} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';
import moment from "moment";
import { ToastActionsCreators } from 'react-native-redux-toast';
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserActions from '../redux/modules/user';
import Background from '../components/common/BackgroundImg';
import { bindActionCreators } from "redux";
import _ from "lodash";
import Regex from '../utilities/Regex';
//import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {

            cardList: this.props.cardList != null || typeof (this.props.cardList.cardList) != "undefined" ? this.props.cardList.cardList : [],
        };
    }

    componentWillMount() {
        this.props.UserActions.cardsFromFirebase();

    }

    componentDidMount() {
        this.setState({
            cardList: this.props.cardList != null || typeof (this.props.cardList.cardList) != "undefined" ? this.props.cardList.cardList : []
        }, () => {
            // console.log("card lISt from  did mount redux" + JSON.stringify(this.state.cardList))
        });

    }
    componentWillReceiveProps(props) {

        this.setState({

            cardList: this.props.cardList != null || typeof (this.props.cardList.cardList) != "undefined" ? props.cardList.cardList : []
        });
        //console.log("card lISt from redux"+JSON.stringify(props.cardList.cardList))

    }

    DeteleCardItem(index) {

        if (index > -1) {
            this.state.cardList.splice(index, 1);
            //   console.log("deleted card******", this.state.cardList);
            this.props.UserActions.deleteCardFromFirebase({ ...this.state });

        }




    }



    render() {
        return (
            <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >

                <KeyboardAwareScrollView>
                    <ScrollView keyboardDismissMode='on-drag'>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
                            <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
                                <Icon name="angle-left" size={40} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.headerTxt}>Payment Methods</Text>
                            <View style={{width:30}}></View>
                        </View>
                        <View style={styles.mainContainer}>
                            <FlatList
                                style={styles.flatlist}
                                data={this.state.cardList}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ index, item }) =>
                                    <View style={styles.flatview}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            {this.creditCardImg(item)}
                                            <Text style={{ paddingLeft: 10 }}>{"**************" +item.number.substr(item.number.length - 4, item.number.length)}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.DeteleCardItem(index)}>

                                            <Text style={{ color: 'blue', }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.email}
                            />
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate("AddCard", {
                                data: this.state.cardList == null ? [] : this.state.cardList,

                            })}>
                                <Text style={styles.savetxt}>+ Add New</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </Background>
        );
    }


    creditCardImg(item) {
         //console.log("data of item", item)
        // alert(JSON.stringify(item))
        switch (item.type) {
            case 'master-card':
                return (
                    <Image source={Constants.Images.user.masterCard} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

                );
            case 'visa':
                return (
                    <Image source={Constants.Images.user.visa} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

                );
            case 'american-express':
                return (
                    <Image source={Constants.Images.user.american} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

                );
            case 'discover':
                return (
                    <Image source={Constants.Images.user.discover} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

                );
            case 'diners-club':
            return (
                <Image source={Constants.Images.user.diners} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

            );
            case 'jcb':
            return (
                <Image source={Constants.Images.user.jcb} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

            );
            default:
                return (
                    <Image source={Constants.Images.user.unknown} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

                );
        }
    }

}






const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,

    },
    textInputStyle: {
        padding: 10,
        marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
        color: 'black'

    },
    navBar: {
        backgroundColor: "black",
    },
    mainContainer: {

        paddingTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
        paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
        backgroundColor: Constants.Colors.White,
        marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
        borderRadius: 10

    },


    buttonStyle: {
        marginTop: 15,
        alignSelf: 'center',
        borderRadius: 25,
        backgroundColor: Constants.Colors.Purple,
        padding: 9,
        width: "42%",
        justifyContent: "center", alignItems: 'center'
    },
    navIcons: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
    },
    headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
    savetxt: { color: 'white', alignSelf: 'center', padding: 5 },

    ModalInsideView: {


        backgroundColor: "#00BCD4",
        height: 300,
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'

    },
    flatlist: {
        flexGrow: 0

    },
    flatview: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between',

    },


})
const mapStateToProps = state => ({
    cardList: state.user.cardList == null ? [] : state.user.cardList,

});


const mapDispatchToProps = dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
