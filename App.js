import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image, Animated, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import {
  Toolbar,
  COLOR, IconToggle
} from 'react-native-material-ui';
import { createStackNavigator } from 'react-navigation';
import Profile from './Profile'

import _ from "lodash";
let sortData = [
  { "key": "Name (A-Z)", "isSelected": false },
  { "key": "Name (Z-A)", "isSelected": false },
  { "key": "Rank(Assending)", "isSelected": false },
  { "key": "Rank(Decending)", "isSelected": false }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: [],
      selected: [],
      searchText: 'a',
      active: 'people',
      moveAnimated: new Animated.Value(0),
      isLoading: false,
      page: 1,
      error: null,
      totalCount: 0,
      sortDirection: 'descending',
    }
  }


  renderToolbar = () => {
    if (this.state.selected.length > 0) {
      return (
        <Toolbar
          key="toolbar"
          leftElement="clear"
          onLeftElementPress={() => this.setState({ selected: [] })}
          centerElement={this.state.selected.length.toString()}
          rightElement={['delete']}
          style={{
            container: { backgroundColor: 'white' },
            titleText: { color: 'rgba(0,0,0,.87)' },
            leftElement: { color: 'rgba(0,0,0,.54)' },
            rightElement: { color: 'rgba(0,0,0,.54)' },
          }}
        />
      );
    }
    return (
      <Toolbar
        key="toolbar"
        leftElement="menu"
        centerElement="Home"
        searchable={{
          autoFocus: true,
          placeholder: 'Search',
          onChangeText: value => this.setState({ searchText: value }, () => {
            this._searchUsers()
          }),
          onSearchClosed: () => this.setState({ searchText: '' }),
          onSubmitEditing: () => {
            this._searchUsers()
          },
        }}
      />
    );
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  openModal = () => {
    this.setModalVisible(true);
  }
  closeModal = () => {
    this.setModalVisible(false);
  }
  _searchUsers = () => {
    const { searchText, page } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}&page=${page}`;
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
          data: responseJson.items,
          isLoading: false,
          error: responseJson.error || null,
          totalCount: responseJson.total_count
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this._searchUsers()
  }

  _sortFun = (item) => {
    switch (item.key) {
      case 'Name (A-Z)':
        this.setState({
          data: _.orderBy(this.state.data, ["login"], ["asc"])
        }, () => {
          console.log(item.key,this.state.data)
        })
        break;
      case 'Name (Z-A)':
        this.setState({
          data: _.orderBy(this.state.data, ["login"], ["desc"])
        }, () => {
          console.log(item.key,this.state.data)
        })
        break;
      case 'Rank(Assending)':
        this.setState({
          data: _.orderBy(this.state.data, ["score"], ["asc"])
        }, () => {
          console.log(item.key,this.state.data)
        })
        break;
      case 'Rank(Decending)':
        this.setState({
          data: _.orderBy(this.state.data, ["score"], ["desc"])
        }, () => {
          console.log(item.key,this.state.data)
        })
        break;
    }


  }
  _keyExtractor = (item, index) => JSON.stringify(item.node_id);
  _changeModalState = () => {
    this.closeModal()
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderToolbar()}
        <View style={{
          position: 'absolute',
          top: 56, left: 0, right: 0, height: 48,
          borderBottomColor: 'grey', elevation: 4,
          justifyContent: 'center',
          alignItems: 'center', flexDirection: 'row'

        }}>
          <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16 }}>Sort By</Text>
          <IconToggle
            name='sort'
            color={COLOR.grey600}
            onPress={this.openModal}
          />

        </View>
        <View style={{
          position: 'absolute',
          top: 106, left: 0, right: 0, height: 42,
          backgroundColor: '#ecf0f1',
          justifyContent: 'flex-start',
          alignItems: 'center', flexDirection: 'row', paddingLeft: 8
        }}>

          <Text style={{ color: '#7f8c8d' }}>Showing <Text style={{ color: 'black', fontWeight: 'bold' }}>{this.state.totalCount ? this.state.totalCount : 0}</Text> results</Text>

        </View>
        <FlatList style={{ marginTop: 90 }}
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          // onEndReached={this._handleLoadMore}
          // onEndReachedThreshold={10}
          // ListFooterComponent={this.renderFooter}
          renderItem={({ item }) =>
            <View style={styles.profileList}>
              <View style={{
                width: Dimensions.get("window").width - 90, height: 100,
                justifyContent: 'flex-start', paddingLeft: 8, flexDirection: 'row', alignItems: 'center'
              }}>
                <Image
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                  source={{ uri: `${item.avatar_url}` }}
                />
                <View style={{
                  height: 100, width: 100, flexDirection: 'column',
                  paddingLeft: 8, justifyContent: 'center', alignItems: 'flex-start'
                }}>

                  <Text>{item.login}</Text>
                  <Text>Score : <Text style={{ color: 'black', fontWeight: 'bold' }}>{Number((item.score).toFixed(0))}</Text></Text>

                </View>
              </View>
              <View style={{
                width: 90, height: 100, justifyContent: 'center', alignItems: 'center',
              }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {
                  login: item,
                })}>
                  <Text style={{ color: 'blue' }}>View details</Text>

                </TouchableOpacity>

              </View>

            </View>
          }
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'black', flex: 0.7, opacity: 0.4 }} >
              <TouchableHighlight style={{ flex: 1 }}
                onPress={this._changeModalState}>
                <Text></Text>
              </TouchableHighlight>
            </View>
            <View style={{ flex: 0.3, backgroundColor: 'white' }}>
              <View style={{
                height: 40, borderBottomWidth: 0.5,
                borderBottomColor: '#ecf0f1', borderBottomEndRadius: 8,
                borderBottomStartRadius: 8, justifyContent: 'center',
                alignItems: 'flex-end', flexDirection: 'row'
              }}>
                <View style={{
                  flex: 0.8, height: 40,
                  alignItems: 'flex-start', justifyContent: 'space-around', paddingLeft: 8
                }}>
                  <Text style={{ color: 'grey' }}>Sort By</Text>
                </View>
                <View style={{
                  flex: 0.2, justifyContent: 'space-around', height: 40,
                  alignItems: 'flex-end'
                }}>
                  <IconToggle
                    name='close'
                    color={COLOR.grey600}
                    onPress={this._changeModalState}
                  />
                </View>

              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <FlatList
                  data={sortData}
                  renderItem={({ item }) =>
                    <SortList item={item} onsubmit={this._sortFun} />
                  }
                />
              </View>
            </View>

          </View>
        </Modal>
      </View>
    );
  }
}

class SortList extends Component {
  onSelect = () => {
    const { onsubmit, item } = this.props;
    onsubmit(item);
  }
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity style={styles.modalList} onPress={this.onSelect}>
        <Text style={{ color: item.isSelected ? COLOR.blue400 : COLOR.grey600 }}>{item.key}</Text>
      </TouchableOpacity>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  modalList: {
    width: Dimensions.get("window").width,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingLeft: 8
  },
  profileList: {
    flexDirection: 'row',
    width: Dimensions.get("window").width,
    height: 100,
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 1
  }
});



export default createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      title: 'Home',
      header: null //this will hide the header
    },
  },
  Profile: {
    screen: Profile
  },

});