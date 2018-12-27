import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native'

import Icon from "react-native-vector-icons/Feather";

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

export default class Header extends PureComponent {

    static propTypes = {
        navigation: PropTypes.object,
        leftButton: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ]),
        rightButton: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ]),
        title: PropTypes.string
    }
    static defaultProps = {
        leftButton: null,
        title: ' ',
    }
    constructor(props) {
        super(props);
        
        this.state = {

        }
    }

    render(){
        const { leftButton, rightButton } = this.props;
        const defaultLeftButton = {
            icon: <Icon name={'chevron-left'} size={18} color={styles.headerCenterText.color} />,
            title: '返回',
            textColor: 'white'
        }
        const defaultRightButton = {
            icon: <Icon name={'plus'} size={24} color={'#66b0ef'} />,
            title: ' ',
            textColor: '#06f'
        }
        return(
            <View style={styles.headerContainer}>
                <StatusBar barStyle='light-content' />
                <View style={styles.headerBtn}>
                    {
                        leftButton ?
                            <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'row', alignItems:'center', flex: 1}} onPress={() => {
                                if (this.props.navigation) {
                                    this.props.navigation.goBack();
                                }
                            }} >
                                { leftButton.icon || defaultLeftButton.icon}
                                <Text style={{color: leftButton.textColor || defaultLeftButton.textColor, fontSize: 16}}>{leftButton.title || defaultLeftButton.title}</Text>
                            </TouchableOpacity> : 
                            null
                    }
                </View>
                <View style={styles.headerCenterContainer}>
                    <Text style={styles.headerCenterText}>{this.props.title}</Text>
                </View>
                <View style={styles.headerBtn}>
                {
                    rightButton ?
                        <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'row', alignItems:'center', flex: 1}} onPress={() => {
                            if (this.props.navigation) {
                                this.props.navigation.goBack();
                            }
                        }} >
                            { rightButton.icon || defaultRightButton.icon}
                            <Text style={{color: rightButton.textColor || defaultRightButton.textColor, fontSize: 16}}>{rightButton.title || defaultRightButton.title}</Text>
                        </TouchableOpacity> : 
                        null
                }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#d81e06',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44 + StatusBar.currentHeight,
        paddingTop: StatusBar.currentHeight
    },
    headerLeftIcon: {
        color: '#fff'
    },
    headerCenterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        flex: 4,
    },
    headerCenterText: {
        fontSize: 18,
        color: '#f8f8f8',
    },
    headerBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLeftBtn: {
    },
    headerRightBtn: {
    },
})