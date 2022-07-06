import React from "react";
import { View, StyleSheet, Image, useWindowDimensions,TouchableWithoutFeedback } from "react-native";
import HTMLView from 'react-native-htmlview';




import Text from "./Text";
import colors from "../config/colors";

function CardStories({ title, subTitle, imageUrl, onPress }) {
  const contentWidth = useWindowDimensions().width;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>

<View style={styles.container}>
       

         
       <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
       
        <HTMLView
        value={subTitle} style={styles.webview}
      />
    

      
      </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    width: "70%",
    padding: 20,
  },
  image: {
    width: "40%",
    
    borderRadius: 15,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },

  webview: {
height: 60
  },
   container: {
    
    flexDirection: "row",
    
    backgroundColor: colors.white,
  },

});

export default CardStories;
