import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";

function CardTrack({
  title,
  subTitle,
  imageUrl,
  background,
  weightage
}) {
  return (
   
        <View style={styles.container}>
            <View style={{backgroundColor: background , width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"}} >
    {imageUrl && <Image style={styles.image} source={{ uri:   imageUrl }} />}
        </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {weightage && (
              <Text style={styles.subTitle} numberOfLines={1}>
                {weightage}/12
              </Text>
            )}
          </View>
         
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom:16,
    marginLeft:16,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 24,
    height: 24,
   
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

export default CardTrack;
