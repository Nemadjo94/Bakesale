/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
// In this file are all the ajax request used by this app
import { Alert } from 'react-native';

// API adress
const apiHost = 'https://bakesaleforgood.com';

// Export default object which defines fetching various types of data
export default {
  // Do fetch request to Bakesale API
  // When using await declare the function async
  // This is used to fetch only
  async fetchInitialDeals() {
    try {
      // Default method for fetch is GET
      const response = await fetch(`${apiHost}/api/deals`);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      //Display error in a message box
      Alert.alert(error);
    }
  },

  // Pass the id of the deal when pressed
  // and return more info about the deal
  async fetchDealDetail(dealId) {
    try {
      // Default method for fetch is GET
      const response = await fetch(`${apiHost}/api/deals/${dealId}`);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      //Display error in a message box
      Alert.alert(error);
    }
  },

  //Fetch search results for the SearchBar
  async fetchDealsSearchResults(searchTerm) {
    try {
      // Default method for fetch is GET
      const response = await fetch(`${apiHost}/api/deals?searchTerm=${searchTerm}`);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      //Display error in a message box
      Alert.alert(error);
    }
  },

};