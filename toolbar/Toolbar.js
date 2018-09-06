
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated} from 'react-native';
import { COLOR } from 'react-native-material-ui';
import LeftElement from './LeftElement';
import CenterElement from './CenterElement';
import RightElement from './RightElement';

export default class Toolbar extends Component {
    constructor(props, context) {
        super(props, context);
      
        // this.state = { isSearchActive: false, searchValue: '' };
        this.state = {
            // the Green background default value
            defaultScaleValue: new Animated.Value(1),
            // the White background default value
            searchScaleValue: new Animated.Value(0.01),
            // we will resolve the radius and diameter whitin onLayout callback
            radius: 0,
            diameter: 0,
            // it'll change zIndex after the animation is complete
            order: 'defaultFirst',
            isSearchActive: false, searchValue: '' 
        };
    }
    onSearchPressed = () => {
        this.setState({ isSearchActive: true });
    }
    onSearchTextChanged = (searchValue) => {
        this.setState({ searchValue });
    }
    onSearchClearPressed = () => {
        this.onSearchTextChanged('');
    }
    onSearchClosed = () => {
        this.setState({ isSearchActive: false, searchValue: '' });
    }
    render() {
        const { isSearchActive, searchValue } = this.state;

        return (
            <View style={[styles.container, isSearchActive && { backgroundColor: 'white' }]}>
                <View style={styles.statusBar} />
                <View style={styles.toolbarContainer}>
                    <LeftElement
                        isSearchActive={isSearchActive}
                        onSearchClose={this.onSearchClosed}
                    />
                    <CenterElement
                        title="Home"
                        isSearchActive={isSearchActive}
                        onSearchTextChange={this.onSearchTextChanged}
                        searchValue={searchValue}
                    />
                    <RightElement
                        isSearchActive={isSearchActive}
                        onSearchPress={this.onSearchPressed}
                        searchValue={searchValue}
                        onSearchClear={this.onSearchClearPressed}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        backgroundColor: COLOR.blue900,
        elevation: 4,
    },
    statusBar: {
        height: 0,
    },
    toolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        height: 64,
        flex: 1,
    },
});