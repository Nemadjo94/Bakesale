/* eslint-disable no-trailing-spaces */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {

  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
  }

  state = {
      searchTerm: '',
  };

  debouncedSearchDeals = debounce(this.props.searchDeals, 300);

  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
        //debounce
        this.debouncedSearchDeals(this.state.searchTerm);
    });
  };

  render() {
    return (
      <TextInput 
        style={styles.input} 
        placeholder="Search All Deals..."
        onChangeText={this.handleChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  },
});

export default SearchBar;
