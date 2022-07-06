import React from "react";
import { View, StyleSheet, Image, useWindowDimensions,TouchableWithoutFeedback, Progress } from "react-native";
import HTMLView from 'react-native-htmlview';
import { ProgressBar, Colors } from 'react-native-paper';

import Text from "./Text";
import colors from "../config/colors";
import moment from 'moment';

function CardHabitDays({ title, onPress,isComplete,isCompleteDelay,dateV2 ,date}) {
  const contentWidth = useWindowDimensions().width;

  //console.log(date);

  return (

    
      
    <View>
        {isComplete?
        <TouchableWithoutFeedback onPress={onPress}>
    <View style={{borderRadius: 20,marginRight:12,marginLeft:8, backgroundColor: colors.colorPastComplete, marginBottom: 20, flex:1, flexDirection: "column"}}>
       <View style={styles.container}>
     
        <Text style={styles.title} numberOfLines={1} >
         Day {title} 
        </Text>

        <Text style={styles.title} numberOfLines={1} >
         {dateV2}
        </Text>

        <Text style={{color: colors.white, marginTop: 16, marginBottom:8, fontSize: 14}}  numberOfLines={1} >
        COMPLETED
        </Text>

        </View>
      </View>
      </TouchableWithoutFeedback>
: moment.unix(date).format("YYYY-MM-DD")<=moment().format('YYYY-MM-DD')?
<TouchableWithoutFeedback onPress={onPress}>
    <View style={{borderRadius: 20,marginRight:12,marginLeft:8, backgroundColor: colors.colorToday, marginBottom: 20, flex:1, flexDirection: "column"}}>
       <View style={styles.container}>
     
        <Text style={styles.title} numberOfLines={1} >
         Day {title} 
        </Text>

        <Text style={styles.title} numberOfLines={1} >
         {dateV2}
        </Text>

        <Text style={{color: colors.white, marginTop: 16, marginBottom:8, fontSize: 14}}  numberOfLines={1} >
        LET'S START
        </Text>

        </View>
      </View>
      </TouchableWithoutFeedback>
      :(isCompleteDelay)?
<TouchableWithoutFeedback onPress={onPress}>
    <View style={{borderRadius: 20,marginRight:12,marginLeft:8, backgroundColor: colors.colorPastIncomplete, marginBottom: 20, flex:1, flexDirection: "column"}}>
       <View style={styles.container}>
     
        <Text style={styles.title} numberOfLines={1} >
         Day {title} 
        </Text>

        <Text style={styles.title} numberOfLines={1} >
         {dateV2}
        </Text>

        <Text style={{color: colors.white, marginTop: 16, marginBottom:8, fontSize: 14}}  numberOfLines={1} >
        LET'S START
        </Text>

        </View>
      </View>
      </TouchableWithoutFeedback>
      :
      <TouchableWithoutFeedback>
    <View style={{borderRadius: 20,marginRight:12,marginLeft:8, backgroundColor: colors.colorPending, marginBottom: 20, flex:1, flexDirection: "column"}}>
       <View style={styles.container}>
     
        <Text style={styles.titlePending} numberOfLines={1} >
         Day {title} 
        </Text>

        <Text style={styles.titlePending} numberOfLines={1} >
         {dateV2}
        </Text>

        <Text style={{color: colors.black, marginTop: 16, marginBottom:8, fontSize: 14}}  numberOfLines={1} >
          LOCKED
        </Text>

        </View>
      </View>
      </TouchableWithoutFeedback>
}



    </View>
  );

}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: colors.white,
    marginBottom: 20,
    marginRight: 12,
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
    width: 40,
    height: 40,

  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign:"center"
  },
  title: {
      height: 50,
    color: colors.white,
    fontSize: 16,
    
    fontWeight:"500"
  },

  titlePending: {
    height: 50,
  color: colors.black,
  fontSize: 16,
  
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

export default CardHabitDays;
