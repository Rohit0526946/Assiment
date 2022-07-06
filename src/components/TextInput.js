import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";

function AppTextInput({ width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
    
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
