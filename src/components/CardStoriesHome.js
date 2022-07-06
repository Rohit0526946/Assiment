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
    <Image style={styles.image} source={{ uri: imageUrl }} />
  

       <View style={styles.container}>
        <Text style={styles.title} numberOfLines={2}>
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
    overflow: "hidden",
    flex:1,
    flexDirection: "column",

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
  width: "100%",
  height: 150

  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign:"center"
  },
  title: {
 
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
