import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DealItem from './DealItem';

//This component displays the list of elements
class DealList extends React.Component{

    //Declare properties which are required to be 
    //passed from App.js
    static propTypes = {
        deals: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired,
    }

    render(){
        return(
         <View style={styles.list}>
            <FlatList //This is a scrollable list
              data={this.props.deals}
              renderItem=
              {({item}) => (
                //Create DealItem component and pass the deal prop
                <DealItem 
                  deal={item}
                  onPress={this.props.onItemPress}
                />
              )}
            />    
         </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        
        width: '100%',
        
    },
});

export default DealList;