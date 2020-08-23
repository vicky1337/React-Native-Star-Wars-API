import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import apiCall from '../../../redux/ActionCreator';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isRefresh: false,
    };
  }

  componentDidMount() {
    this.props
      .apiCall('https://swapi.dev/api/people/')
      .then(() => {
        const data = this.props.data;
        this.setState({
          data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const handleRefresh = () => {
      this.setState({isRefresh: true}, () => {
        this.props
          .apiCall('https://swapi.dev/api/people/')
          .then(() => {
            const data = this.props.data;
            this.setState({data});
          })
          .catch((error) => {
            console.log(error);
          });
        this.setState({isRefresh: false});
      });
    };

    const getInitials = (name = '') => {
      var initials = name.toUpperCase().match(/\b(\w)/g);
      return initials?.slice(0, 2);
    };
    const Item = ({name, birth, sex}) => (
      <View style={style.item}>
        <View style={style.initail}>
          <Text style={style.name}>{getInitials(name)}</Text>
        </View>
        <View style={style.description}>
          <Text>Name: {name}</Text>
          <Text style={style.dob}>DOB: {birth}</Text>
          <Text>Gender:{sex}</Text>
        </View>
      </View>
    );
    const renderItem = ({item}) => (
      <Item name={item?.name} birth={item?.birth_year} sex={item?.gender} />
    );
    const results = this.props?.data?.results;
    return (
      <View style={style.container}>
        <Text style={style.label}>Name with Description</Text>
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.created}
          onRefresh={handleRefresh}
          refreshing={this.state.isRefresh}
          // onEndReachedThreshold={0}
          // onEndReached={handleEnd}
        />
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  label: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  item: {
    backgroundColor: '#e8e8eb',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  description: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  name: {
    flex: 8,
    fontSize: 18,
    color: '#000000',
    marginTop: 13,
  },
  initail: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9593a4',
    borderRadius: 50,
  },
  dob: {
    flex: 7,
    fontSize: 12,
    color: '#000000',
  },
});

const mapDispatchToProps = (dispatch) => ({
  apiCall: (url) => dispatch(apiCall(url)),
});

const mapStateToProps = (state) => ({
  data: state.apiReducer.data,
  error: state.apiReducer.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
