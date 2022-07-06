import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";

function ListItem({
  title,
  subTitle,
  imageUrl,
}) {
  return (
   
        <View style={styles.container}>
          {imageUrl && <Image style={styles.image} source={{ uri:   imageUrl }} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
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
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "bold",
  },
});

export default ListItem;
