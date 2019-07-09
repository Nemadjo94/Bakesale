import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../util/util';

//This component displays the deal block
//in the list
class DealItem extends React.Component{

  //This prop is passed from DealList.js
  static propTypes = {
    deal: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  //Handle press on the TouchableOpacity element
  handlePress = () =>{
    this.props.onPress(this.props.deal.key);
  }

  render(){

    //Define the deal out of the props
    //so we dont have to type this.props.deal everytime
    const {deal} = this.props;
    
    return(
      <TouchableOpacity 
        style={styles.deal} 
        onPress={this.handlePress}
      >
        <Image
          source={{uri: deal.media[0]}} 
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}> 
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>             
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 150,
      backgroundColor: '#ccc',
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
    },
    cause: {
        flex: 2,
    },
    price: {
        flex: 1,
        textAlign: 'right',
    },
});

export default DealItem;