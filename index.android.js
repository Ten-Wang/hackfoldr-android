/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  WebView,
  DrawerLayoutAndroid,
  TouchableOpacity
} from 'react-native';

class AwesomeProject extends Component {
  state = {
    contentList: null,
    contentListDs: null,
    currentIndex: 1
  }

  render() {
    console.log('render AwesomeProject')
    
    if(this.state.contentList == null) {
      return null;
    }

    var navigationView = (
       <ListView
        dataSource={this.getNavDataSource()}
        renderRow={this.getNavRenderRow}
      />
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <WebView
          source={{uri: this.state.contentList[this.state.currentIndex][0]}}
          style={{marginTop: 20}}
        />
      </DrawerLayoutAndroid>
    );
  }

  componentWillMount() {
    var that = this;
    fetch('https://ethercalc.org/hackfoldr-Android.csv.json').then(res => {
      if(res.ok) {
        res.json().then(function(json) {
          console.log('json array:', json);
          json.forEach(element => {
            console.log('element:', element);
          });

          json.splice(0, 1); // remove first element

          that.setState({
            contentList: json
          });
        });
      } else {
        console.log('fetch json failed');
      }
    });    
  }

  getNavDataSource = () => {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.state.contentList);
  }

  getNavRenderRow = (rowData, sectionID, rowID) => {
    var onItemClick = () => {
      console.log('[onItemClick]', rowData, rowID);
      this.setState({
        currentIndex: rowID
      });
    };

    return(
      <TouchableOpacity onPress={rowData[0] === "" ? null : onItemClick}>
        <Text>{rowData[1]}</Text>
      </TouchableOpacity>
      );
  }
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
