import React from "react";
import { View, StyleSheet, Image, useWindowDimensions,TouchableWithoutFeedback, Progress ,Dimensions,FlatList} from "react-native";
import HTMLView from 'react-native-htmlview';
import { ProgressBar, Colors } from 'react-native-paper';

import Text from "./Text";




import colors from '../config/colors';

const numColumns = 2;
const size = Dimensions.get('window').width/numColumns;

function CardDimesionDetail({ title, imageUrl,background }) {

  return (
    <TouchableWithoutFeedback >
    <View style={styles.card}>

  

       <View style={styles.container}>

           
       <View style={{backgroundColor: background , width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"}} >
           <Image style={styles.image} source={{ uri: imageUrl }} />
           </View>
     
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

       
      
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: colors.white,
    marginBottom: 20,
    marginRight:8,
    marginLeft:8,
    marginTop:8,
    flex:1,
    flexDirection: "column",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5

  },
  container: {
    justifyContent:"center",
    alignContent:"center",
    flexDirection: "column",
    flex: 1,
    margin: 16
  },
  detailsContainer: {
    
    margin: 20,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf:"center",
    alignItems: "center"
  },
  image: {
    width: 40,
    height: 40,

  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign:"center"
  },
  title: {
    marginBottom: 8,
    marginTop: 8,
    fontWeight:"500"
  },

  submit: {
    marginBottom: 8,
    marginLeft:16,
    marginRight:16,
    color:colors.accent,
    fontWeight:"bold"

  },

  subTitle: {
    marginBottom: 16,
    marginLeft:16,
    marginRight:16,
    fontSize:14
  },

  webview: {
height: 60
  },
  

});

export default CardDimesionDetail;
