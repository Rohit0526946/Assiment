import React from "react";
import { View, StyleSheet, Image, useWindowDimensions,TouchableWithoutFeedback,Dimensions } from "react-native";
import HTMLView from 'react-native-htmlview';




import Text from "./Text";
import colors from "../config/colors";

const numColumns = 2;
const size = Dimensions.get('window').width/numColumns;

function CardExpertCat({ title, background, imageUrl, onPress }) {
  const contentWidth = useWindowDimensions().width;

  return (
    <TouchableWithoutFeedback onPress={onPress}>

    <View style={styles.card} style={{width: size-20,backgroundColor: background, borderRadius:15, marginBottom:20, overflow:"hidden", }} >


       

<Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
       <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.detailsContainer}>
     
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.primary,
    marginBottom: 16,
    overflow: "hidden",
  },
  detailsContainer: {
    width: "70%",
    
  },
  image: {
    width: 80,
    height: 80,
    alignSelf:"flex-end",
    marginBottom:8,
    marginRight: 8
    
   
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
  
    color: colors.white,
    fontWeight: "700", 
    minHeight: 50,
    maxHeight:50,
    marginTop: 8,
    marginLeft: 8
  },

  webview: {
height: 60
  },
   container: {
    backgroundColor: 'blue',
    
    
    backgroundColor: colors.white,
  },

});

export default CardExpertCat;
