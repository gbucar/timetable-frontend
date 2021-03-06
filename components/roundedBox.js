import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, Easing, TextInput } from 'react-native';

export default class RoundedBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            widthValue: new Animated.Value(0),
            width: "",
            height: ""       
        }
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount () {
        Animated.timing(
            this.state.widthValue,
            {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
              easing: Easing.back(),
            }
          ).start();
          this.setState({
              width: this.state.widthValue.interpolate({inputRange: [0,1], outputRange: ["0%", this.props.width || "90%"]}),
              height: this.state.widthValue.interpolate({inputRange: [0,1], outputRange: ["0px",  this.props.height && this.props.height.endsWith("px") ? this.props.height : false || "53px"]})
            });
    }

    componentWillUnmount () {
        Animated.timing(
            this.state.widthValue,
            {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
              easing: Easing.back(),
            }
        ).start();
        this.setState({
            width:this.state.widthValue.interpolate({inputRange: [0,1], outputRange: ["0%", this.props.width || "90%"]}),
            height: this.state.widthValue.interpolate({inputRange: [0,1], outputRange: ["0px", this.props.height && this.props.height.endsWith("px") ? this.props.height : false || "53px"]})
        });
    }

    handlePress() {
        this.props.onPress();
    }

    render() {
        return(
            <Animated.View onPress={this.props.onPress} onRelease style = {[styles.box, {width: this.props.overrideWidth ? this.props.overrideWidth : this.state.width, overflow: this.props.overflow? this.props.overflow : "hidden", paddingRight: this.props.paddingRight, justifyContent: this.props.justifyContent?this.props.justifyContent : "center", padding:this.props.padding, height: this.props.height? this.props.height : this.state.height, margin:this.props.margin, borderRasius: this.props.borderRadius?this.props.borderRadius : "25px", backgroundColor: this.props.backgroundColor? this.props.backgroundColor : "#EFEFEF", minWidth: this.props.minWidth, marginRight: this.props.marginRight}]}>
                {this.props.children}
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        borderRadius: "25px",
        height: "53px",
        backgroundColor: "#EFEFEF",
        justifyContent: "space-around",
        overflow: "hidden",
        alignItems: "center",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        flexDirection: 'row',
    }
})