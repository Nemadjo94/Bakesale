import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../util/util';
import ajax from '../ajax';

//This component is rendered when we click on the
//DealItem block to display more info about the deal
class DealDetail extends React.Component{

  //This prop is passed from DealList.js
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };
  state = {
    deal: this.props.initialDealData,
  };

  async componentDidMount(){
    //Get the data after components mount
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    //Re render the new deal state
    this.setState({deal: fullDeal,})
}

  render(){
    //Define the deal out of the props
    //so we dont have to type this.props.deal everytime
    const {deal} = this.state;
    
    return(
      <View style={styles.deal}>
          <TouchableOpacity onPress={this.props.onBack}>
              <Text style={styles.backLink}>Back</Text>
          </TouchableOpacity>
          <Image
            source={{uri: deal.media[0]}} 
            style={styles.image}
          />
          <View style={styles.detail}>  
              <View>
                  <Text style={styles.title}>{deal.title}</Text>
              </View>   
              <View style={styles.footer}>
                <View style={styles.info}>
                  <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                  <Text style={styles.cause}>{deal.cause.name}</Text> 
               </View>  
           { deal.user && (
            <View style={styles.user}>
                <Image
                style={styles.avatar}
                source={{ uri: deal.user.avatar }}
                />
                <Text>{deal.user.name}</Text>
            </View>
           )}
           </View>
          <View style={styles.description}>
              <Text>{deal.description}</Text>
          </View>
      </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({   
    deal: {
      marginHorizontal: 12,
      marginTop: 50,
    },
    description: {

    },
    backLink: {
      marginBottom: 5,
      color: '#22f',
    },
    image: {
      width: '100%',
      height: 150,
      backgroundColor: '#ccc',
    },
    detail: {
      borderColor: '#bbb',
      borderWidth: 1,
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    cause: {
        flex: 2,
    },
    price: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    avatar: {
        width: 60,
        height: 60,
    },
    user: {
        alignContent: 'center',
    }
});

export default DealDetail;