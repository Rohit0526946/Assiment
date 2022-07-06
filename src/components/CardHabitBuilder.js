import React from "react";
import { View, StyleSheet, Image, useWindowDimensions,TouchableWithoutFeedback, Progress } from "react-native";
import HTMLView from 'react-native-htmlview';
import { ProgressBar, Colors } from 'react-native-paper';

import Text from "./Text";
import colors from "../config/colors";

function CardHabitBuilder({ title, subTitle, imageUrl, onPress,background, barColor,completeActivity,totalActivity }) {
  const contentWidth = useWindowDimensions().width;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
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

        <Text style={styles.title} numberOfLines={1}>
          {completeActivity}/{totalActivity}
        </Text>

        <ProgressBar progress={completeActivity/totalActivity} color={background} />
      
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
    
    flex:1,
    flexDirection: "column",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,  
    elevation: 5

  },
  container: {
  
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

export default CardHabitBuilder;
