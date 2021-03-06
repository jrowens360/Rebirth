
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Image
} from 'react-native';
import RadioButton from 'react-native-radio-button'
import Constants from '../constants';
import { connect } from 'react-redux';
class FlateListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            cardDetail: '',
            cardSlectedlist: []

        };
    }


    render() {

        return (
            <View style={styles.flatview}>
                <RadioButton
                
                    animation={'bounceIn'}
                    isSelected={this.props.selectIndex == this.props.index}
                    onPress={() => {
                        this.props.onselectPress(this.props.index);
                    }
                    }
                />
                <View style={{ flexDirection: 'row', alignItems: 'center',paddingLeft:5 }}>
                    {this.creditCardImg(this.props.item)}
                    <Text style={{ paddingLeft: 10 }}>{"**************" + this.props.item.number.substr(this.props.item.number.length - 4, this.props.item.number.length)}</Text>
                </View>

            </View>
        );
    }

    creditCardImg(item) {
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    flatview: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
});


const mapStateToProps = state => ({

    selectIndex: state.user.selectIndex

});


//   const mapDispatchToProps = dispatch => ({
//     UserActions: bindActionCreators(UserActions, dispatch)});

export default connect(mapStateToProps, null)(FlateListView);

