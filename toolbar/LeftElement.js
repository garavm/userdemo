import React, { Component } from 'react';
import { StyleSheet, Text, View,Animated,Easing,Platform } from 'react-native'
import { IconToggle } from 'react-native-material-ui';
import { COLOR } from 'react-native-material-ui';
export default class LeftElement extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            leftElement: 'menu',
            spinValue: new Animated.Value(0),
        };
    }
    componentWillReceiveProps(nextProps) {
        // goes to search state
        if (nextProps.isSearchActive && !this.props.isSearchActive) {
            this.animate({ toValue: 1, leftElement: 'arrow-forward' });
        }
        // goes to default look
        if (!nextProps.isSearchActive && this.props.isSearchActive) {
            this.animate({ toValue: 0, leftElement: 'menu' });
        }
    }
    animate = ({ toValue, leftElement }) => {
        Animated.timing(this.state.spinValue, {
            toValue: 0.5,
            duration: 112,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.setState({ leftElement });

            Animated.timing(this.state.spinValue, {
                toValue,
                duration: 112,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'android',
            }).start();
        });
    }
    render() {
        const { leftElement, spinValue } = this.state;
        const { isSearchActive, onSearchClose } = this.props;

        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });

        return (
            <Animated.View style={[styles.container, { transform: [{ rotate: spin }] }]} >
                <IconToggle
                    name={leftElement}
                    color={isSearchActive ? COLOR.grey600 : 'white'}
                    onPress={onSearchClose}
                />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  });