import React from "react";
import { View, StyleSheet, Image, useWindowDimensions,TouchableWithoutFeedback } from "react-native";
import HTMLView from 'react-native-htmlview';




import Text from "./Text";
import colors from "../config/colors";

function CardExpert({ title, subTitle, imageUrl, onPress }) {
  const contentWidth = useWindowDimensions().width;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>


       <View style={styles.container}>
       <Image style={styles.image} source={{ uri: imageUrl }} />
     
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <Text style={styles.subTitle} numberOfLines={1}>
          {subTitle}
        </Text>

        <Text style={styles.submit} numberOfLines={1}>
          SubmitQuery
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
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    flex: 1

    
  },
  detailsContainer: {
    
    margin: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 16

  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign:"center"
  },
  title: {
    marginBottom: 8,
    marginLeft:16,
    marginRight:16
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

export default CardExpert;
