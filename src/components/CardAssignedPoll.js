import React from "react";
import { View, StyleSheet, Image, useWindowDimensions,TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import HTMLView from 'react-native-htmlview';
import { ProgressBar, Colors } from 'react-native-paper';

import Text from "./Text";
import colors from "../config/colors";

function CardAssignedPoll({  pollName, isComplete, onPress,status,endDate }) {
  const contentWidth = useWindowDimensions().width;

  return (
    <View>

    {/* <TouchableWithoutFeedback onPress={onPress} style={{flex:1}}> */}
    <View style={{borderRadius: 20,marginLeft:12,marginRight:8,backgroundColor: "#fff", marginBottom: 20, flex:1, flexDirection: "column"}}>
       <View style={styles.container}>
     
        <Text style={styles.title} numberOfLines={1} >
          {pollName}
        </Text>

        <Text style={{color: colors.black, marginTop: 16, marginBottom:8}} numberOfLines={1}>
          {(isComplete === "false")? "Pending":"Done"}
        </Text>

        {/* <Text style={{color: colors.black, marginTop: 16, marginBottom:8,fontSize:14}} numberOfLines={1}>
         Valid Till {endDate}
        </Text> */}
      
        <Text style={{color: colors.black,  marginBottom:16, fontSize: 14,color:"#ff0000"}}  numberOfLines={1} >
         {  (status === 2)? "Expired": "Valid Till "+ endDate }
        </Text>

        

        {(isComplete !== "true")?
         <TouchableOpacity style={{borderColor:"#2196f3",borderWidth:1,
         width:160,alignSelf:"flex-start",
                             borderRadius:12,padding:10}} onPress={onPress}> 
                         <Text style={{
                             fontSize:17,
                             
                             
                             textAlign:'center',
                             
                             fontWeight:'bold',
                             color:'#2196f3',
                             
                         }}>View Result</Text>
                         </TouchableOpacity> :

    <TouchableOpacity style={{backgroundColor:"#2196f3",
    width:160,alignSelf:"flex-start",
                        borderRadius:12,padding:10}} onPress={onPress}> 
                    <Text style={{
                        fontSize:17,
                        
                        
                        textAlign:'center',
                        
                        fontWeight:'bold',
                        color:'#fff',
                        
                    }}>Take Poll</Text>
                    </TouchableOpacity>
}
</View>
      </View>
     
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
    color: colors.black,
    fontWeight: "bold",
    textAlign:"center"
  },
  title: {
      
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

export default CardAssignedPoll;
