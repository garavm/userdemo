import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import Toolbar from './toolbar/Toolbar'
import { IconToggle } from 'react-native-material-ui';
import { COLOR } from 'react-native-material-ui';
export default class App extends Component {

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  openModal = () => {
    this.setModalVisible(true);
  }
  render() {
    return (
      <View style={styles.container}>
        <Toolbar />
        <View style={{
          position: 'absolute',
          top: 64, left: 0, right: 0, height: 48,
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
          top: 112, left: 0, right: 0, height: 42,
          backgroundColor: '#ecf0f1',
          justifyContent: 'flex-start',
          alignItems: 'center', flexDirection: 'row', paddingLeft: 8
        }}>

          <Text style={{ color: '#7f8c8d' }}>Showing <Text style={{ color: 'black', fontWeight: 'bold' }}>240</Text> results</Text>

        </View>



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
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text></Text>
              </TouchableHighlight>
            </View>
            <View>
              <Text>Hello World!</Text>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>fvfv</Text>
              </TouchableHighlight>

            </View>

          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
