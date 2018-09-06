
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Platform, TextInput} from 'react-native'
import { COLOR } from 'react-native-material-ui';

export default class CenterElement extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            textInput: props.isSearchActive,
            opacityValue: new Animated.Value(1),
            text: '',
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isSearchActive !== nextProps.isSearchActive) {
            this.animateElements(nextProps.isSearchActive);
        }
    }
    animateElements = (nextIsSearchActive) => {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
            duration: 112,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.setState({
                textInput: nextIsSearchActive,
            });

            Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration: 112,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'android',
            }).start();
        });
    }
    render() {
        const { title, onSearchTextChange, searchValue, isSearchActive } = this.props;
        const { opacityValue, textInput } = this.state;

        const color = isSearchActive ? COLOR.grey600 : 'white';

        let content = <Text style={[styles.text, { color }]}>{title}</Text>;

        if (textInput) {
            content = ( <TextInput underlineColorAndroid='transparent'
            onChangeText={(text) => this.setState({text})} placeholder='Search' 
            value={this.state.text}/> );
        }

        return (
            <Animated.View style={[styles.container, { opacity: opacityValue }]}>
                {content}
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 22,
    },
    text: {
        fontWeight: '500',
        fontSize: 20,
        color: 'white',
    }
});