/**
 * Created by Layman(http://github.com/anysome) on 16/3/16.
 */
import React from 'react';
import {StyleSheet, ScrollView, View, Text, ListView} from 'react-native';
import moment from 'moment';

import {analytics, styles, colors, px1, airloy, api, toast, L} from '../../app';

export default class Timeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    analytics.onPageStart('page_check_timeline');
    this.reload();
  }

  componentWillUnmount() {
    analytics.onPageEnd('page_check_timeline');
  }

  async reload() {
    let result = await airloy.net.httpGet(api.agenda.list.target, {
      targetId: this.props.targetId,
      days: 180
    });
    if (result.success) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result.info)
      });
    } else {
      toast(L(result.message));
    }
  }

  _renderRow(rowData, sectionId, rowId) {
    if ( rowData.detail ) {
      return (
        <View style={style.rowBig}>
          <Text style={style.progress}>{rowData.doneAmount ? '+ ' + rowData.doneAmount : '-'}</Text>
          <Text style={style.progress}>{rowData.doneTotal}</Text>
          <View style={style.body}>
            <Text style={styles.text}>{rowData.detail}</Text>
            <Text style={style.hint}>{moment(rowData.doneTime||rowData.today).calendar()}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={style.row}>
          <Text style={style.progress}>{rowData.doneAmount ? '+ ' + rowData.doneAmount : '-'}</Text>
          <Text style={style.progress}>{rowData.doneTotal}</Text>
          <Text style={styles.hint}>{moment(rowData.doneTime||rowData.today).calendar()}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <Text style={style.title}>{this.props.title}</Text>
        <ListView
          enableEmptySections={true}
          initialListSize={10} pageSize={5}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionId, rowId) => this._renderRow(rowData, sectionId, rowId)}
        />
      </ScrollView>
    );
  }
}


const style = StyleSheet.create({
  title: {
    margin: 10,
    color: colors.dark2,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: px1,
    borderBottomColor: colors.bright1,
    backgroundColor: 'white'
  },
  rowBig: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 16,
    alignItems: 'center',
    borderBottomWidth: px1,
    borderBottomColor: colors.bright1,
    backgroundColor: 'white'
  },
  progress: {
    color: colors.dark2,
    width: 70,
    fontSize: 14,
    textAlign: 'center'
  },
  hint: {
    color: colors.border,
    fontSize: 12,
    marginTop: 3
  },
  body: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  }
});
