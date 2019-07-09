import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

export default class App extends React.Component {

  state = {
    //Deals are empty at the start of the app
    deals: [],
    //If we click on the block, grab its id and pass it
    //to this state
    currentDealId: null,
    //Array for the deals from SearchBar
    dealsFromSearch: [],
  };

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if(searchTerm){
    dealsFromSearch =  await ajax.fetchDealsSearchResults(searchTerm);
    }
    this.setState({ dealsFromSearch })
  };

  clearSearch = () => {
    this.setState({ dealsFromSearch: [] });
  }

  //After everything loads fetch the data
  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    //When the data fetches fill the deals array
    this.setState({deals});
  }

  //When the block is pressed, grab its id and pass it
  //to the currentDealId
  setCurrentDealId = (dealId) => {
    this.setState({
      currentDealId: dealId,
    });
  };

  //This is passed to the DealDetail component
  //when the backlink is pressed 
  //the current state id is unset
  //so the deal items are re rendered once more
  unsetCurrentDealId = () => {
    this.setState({
      currentDealId: null,
    });
  };

  //Return the current deal that needs to be rendered
  //in DealDetail component
  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  };

  render() {
    //If the deal block is pressed render new component to 
    //display more detail about the deal
    if(this.state.currentDealId){
      return (
      <View style={styles.main}>
        <DealDetail 
          initialDealData={this.currentDeal()} 
          onBack={this.unsetCurrentDealId}
        />
      </View>
      );
    }
    //Display the scrollable list of deal block elements 
    const dealsToDisplay = this.state.dealsFromSearch.length > 0 ?
      this.state.dealsFromSearch : this.state.deals;
    if(dealsToDisplay.length > 0){ //if > 0 means that it exists
      return (
      <View style={styles.main}>
        <SearchBar searchDeals={this.searchDeals} />
        <DealList 
          //Pass these props to DealList.js
          deals={this.state.deals}//Pass the deals to be rendered as blocks
          onItemPress={this.setCurrentDealId}
        />
      </View>
      );
    }
    //Display the message at the beggining
    return (
      <View style={styles.container}>       
          <Text style={styles.header}>Bakesale!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  },
  main: {
    marginTop: 30,
  },
});
