import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import {
    COLOR,
} from 'react-native-material-ui';
import Icons from 'react-native-vector-icons/Octicons';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repodata: [],
            isLoading: true,
        }
    }
    static navigationOptions = {
        headerTitle: 'User Details',
        headerStyle: {
            backgroundColor: COLOR.blue500,
        },
        headerTitleStyle: {
            fontSize: 20, fontWeight: '700', color: 'white',
        }

    }
    _searchRepos = () => {
        const { navigation } = this.props;
        const item = navigation.getParam('login', 'NO-ID');

        const url = `https://api.github.com/users/${item.login}/repos`;
        console.log('serarchuser', url)
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    repodata: responseJson,
                    isLoading: false,
                })
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    isLoading: false,
                })
            });
    };
    componentDidMount() {
        this._searchRepos()
    }
    _keyExtractor = (item, index) => JSON.stringify(item.id);
    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('login', 'NO-ID');
        return (
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <View style={styles.profileList}>
                    <View style={{
                        width: Dimensions.get("window").width - 90, height: 100,
                        justifyContent: 'flex-start', paddingLeft: 8,
                        flexDirection: 'row', alignItems: 'center'
                    }}>
                        <Image
                            style={{ width: 80, height: 80, borderRadius: 40 }}
                            source={{ uri: `${item.avatar_url}` }}
                        />
                        <View style={{
                            height: 100, width: 100, flexDirection: 'column',
                            paddingLeft: 8, justifyContent: 'center', alignItems: 'flex-start'
                        }}>

                            <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.login}</Text>
                            <View style={{
                                height: 40, justifyContent: 'space-around',
                                alignContent: 'space-around', padding: 4, borderColor: 'grey',
                                borderTopWidth: 0.5, borderLeftWidth: 0.5, borderRightWidth: 0.5,
                                borderBottomWidth: 0.5, borderRadius: 5
                            }}>
                                <TouchableOpacity >

                                    <Text style={{ color: 'blue' }}>View Profile</Text>

                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>
                {
                    !this.state.isLoading ? 
                    <FlatList
                    data={this.state.repodata}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) =>
                        <View style={styles.repoList}>
                            <View style={styles.repoContainer}>
                                <View style={styles.icon}>
                                    <Icons name="repo" size={30} />
                                </View>
                                <View style={styles.repoContent}>

                                    <Text>Repository Name: </Text>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </View>
                            <View style={styles.repoContainer}>
                                <View style={styles.icon}>
                                    <Icons name="fold" size={30} />
                                </View>
                                <View style={styles.repoContent}>
                                    <Text>Repository Description: </Text>
                                    <Text style={styles.text}>{item.description}</Text>
                                </View>
                            </View>
                            <View style={styles.repoContainer}>
                                <View style={styles.icon}>
                                    <Icons name="link" size={30} />
                                </View>
                                <View style={styles.repoContent}>
                                    <Text>Resository URL: </Text>
                                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>{item.url}</Text>
                                </View>
                            </View>
                            <View style={styles.repoContainer}>
                                <View style={styles.icon}>
                                    <Icons name="tag" size={30} />
                                </View>
                                <View style={styles.repoContent}>
                                    <Text>Language: </Text>
                                    <Text style={styles.text}>{item.language}</Text>
                                </View>
                            </View>
                            <View style={styles.repoContainer}>
                                <View style={styles.icon}>
                                    <Icons name="clock" size={30} />
                                </View>
                                <View style={styles.repoContent}>
                                    <Text>Created At: </Text>
                                    <Text style={styles.text}>{item.created_at}</Text>
                                </View>
                            </View>
                        </View>
                    }
                /> :
                <View style={{width:Dimensions.get("window").width,justifyContent:'center',alignItems:'center',flex:1}}>
                    <ActivityIndicator />
                </View>

                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileList: {
        flexDirection: 'row',
        width: Dimensions.get("window").width,
        height: 100,
        borderBottomColor: '#ecf0f1',
        borderBottomWidth: 2
    },
    repoList: {
        flexDirection: 'column',
        width: Dimensions.get("window").width,
        borderBottomColor: '#ecf0f1',
        borderBottomWidth: 2,
        padding: 8
    },
    repoContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        width: Dimensions.get("window").width,
    },
    icon: {
        width: 40,
        justifyContent: 'space-around',
        alignContent: 'space-around'
    },
    repoContent: {
        paddingLeft: 8,
        height: 50,
        flexDirection: 'column',
        width: Dimensions.get("window").width - 40,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    text: {
        color: 'black',
        fontWeight: 'bold'
    }
});