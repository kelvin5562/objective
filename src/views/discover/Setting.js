/**
 * Created by Layman(http://github.com/anysome) on 16/3/4.
 */
import React from 'react';
import {StyleSheet, ScrollView, View, Text, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {analytics, styles, colors, airloy} from '../../app';

export default class Setting extends React.Component {

  constructor(props) {
    super(props);
    this.sourceLink = 'https://github.com/anysome/objective';
    this.state = {
      linkText: '欢迎改进APP源码'
    };
  }

  _logout() {
    airloy.auth.logout();
    analytics.onProfileSignOff();
  }

  _linkClick() {
    Linking.canOpenURL(this.sourceLink).then(supported => {
      if (supported) {
        Linking.openURL(this.sourceLink);
      } else {
        console.log('Don\'t know how to open URI: ' + this.sourceLink);
        this.setState({
          linkText: this.sourceLink
        });
      }
    });
  }

  render() {
    return (
      <ScrollView>
        <TouchableOpacity style={styles.row} activeOpacity={0.5} onPress={this._logout}>
          <Text style={styles.link}>退出</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} activeOpacity={0.5} onPress={() => this._linkClick()}>
          <Text style={style.link}>{this.state.linkText}</Text>
          <Icon size={20} name="ios-arrow-forward" color={colors.border}/>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  link: {
    flex: 1,
    fontSize: 16,
    color: colors.dark1,
    textAlign: 'center'
  }
});
