import React from "react";
import { View, StyleSheet, Image, TouchableHighlight,TouchableWithoutFeedback } from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";


function CardTrackDimension({
  title,
  subTitle,
  imageUrl,
  background,
  weightage,
  onPress
}) {
  return (
    <TouchableWithoutFeedback  onPress={onPress}>
        <View style={styles.container}>
            <View style={{backgroundColor: background , width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"}} >
{imageUrl && <Image style={styles.image} source={{ uri:   imageUrl }} />}
    </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
        

          </View>
         
        </View>
        </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    margin:8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,  
    elevation: 5,
    padding:16,
    borderRadius:16,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 32,
    height: 32,
   
  },
  subTitle: {
    color: colors.medium,
    fontWeight:'500',
    fontSize:16
  },
  title: {
    fontWeight: "bold",
  },
});

export default CardTrackDimension;
