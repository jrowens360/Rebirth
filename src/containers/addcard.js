import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';

import { ToastActionsCreators } from 'react-native-redux-toast';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserActions from '../redux/modules/user';
import Background from '../components/common/BackgroundImg';
import { bindActionCreators } from "redux";
import _ from "lodash";

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            number: '',
            expiry: '',
            cvc: '',
            name: '',
            type: '',
            vaild: false
        };

    }


    componentWillMount() {
        const { params } = this.props.navigation.state;
        console.log("parameters" + JSON.stringify(params))
        const item = params ? params.data : [];
        this.setState({
            cards: item
        });
        // () => {
        //     console.log("i")
        // }

    }



    _onChange = (form) => {
        let cardDetail = {
            'type': typeof (form.values.type) != "undefined" ? form.values.type : '',
            'name': form.values.name,
            'number': form.values.number,
            'expiry': form.values.expiry,
            'cvc': "",
            "postalCode": form.values.postalCode,
            "isSlected": false
        }
        this.setState({
            cardDetail,
            vaild: form.valid,
        });
        //  console.log("card  data" + JSON.stringify(cardDetail), JSON.stringify(form));

    }

    ShowCard() {

        // console.log("CARD DATA BEFORE CARD ADD", this.state.cards);

        let { dispatch } = this.props.navigation;
        if (this.state.vaild) {
            this.state.cards.push(this.state.cardDetail);
            this.props.UserActions.addCardListFirebase({ ...this.state });
        } else {
            dispatch(ToastActionsCreators.displayInfo('Please fill vaild info of card'))
        }

        // console.log("list  data"+JSON.stringify( this.state.cards));

    }


    render() {


        return (
            <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >

                <KeyboardAwareScrollView>
                    <ScrollView keyboardDismissMode='on-drag'>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
                            <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
                                <Icon name="angle-left" size={30} color='white' />
                            </TouchableOpacity>
                            <Text style={styles.headerTxt}> Add Card  </Text>
                            <View></View>

                        </View>
                        <View style={styles.mainContainer}>
                            <CreditCardInput
                                ref={(c) => this._input = c}
                                autoFocus
                                requiresName
                                requiresCVC
                                requiresPostalCode
                                validColor={"black"}
                                invalidColor={"red"}
                                placeholderColor={"darkgray"}
                                onChange={this._onChange}
                            />
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.ShowCard()}>
                                <Text style={styles.savetxt}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </Background>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,

    },


    mainContainer: {

        paddingTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        height: Constants.BaseStyle.DEVICE_HEIGHT,
        backgroundColor: Constants.Colors.White,
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
    headerTxt: { alignSelf: 'center', fontSize: 20, color: 'white', padding: 10 },
    savetxt: { color: 'white', alignSelf: 'center', padding: 5 },

})


const mapDispatchToProps = dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(AddCard);
