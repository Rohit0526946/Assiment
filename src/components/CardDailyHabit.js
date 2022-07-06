import React from "react";
import { View, StyleSheet, Image, useWindowDimensions,TouchableWithoutFeedback, Progress } from "react-native";
// import HTMLView from 'react-native-htmlview';
import { ProgressBar, Colors } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Text from "./Text";
import colors from "../config/colors";

function CardDailyHabit({ 
  
  openDateBox,showDatapicker,handleConfirm,hideDatePicker,item,
  title, subTitle, imageUrl, onPress,background, barColor,completeActivity,totalActivity,currentStatus,isComplete,isDateAssigned }) {
  // const contentWidth = useWindowDimensions().width;

  return (
      
    <View>
      {(currentStatus===1)?
        <TouchableWithoutFeedback>
        <View style={{borderRadius: 20,marginLeft:16, backgroundColor: background, marginBottom: 20, flex:1, flexDirection: "column"}}>
          <View style={styles.container}>
      
          <Text style={styles.title} numberOfLines={2} >
            {title}
          </Text>

          <Text style={{color: colors.white, marginTop: 16, marginBottom:8}} numberOfLines={1}>
            {completeActivity}/{totalActivity}
          </Text>

          <ProgressBar progress={completeActivity/totalActivity} color={Colors.green600} />

          <Text style={{color: colors.white, marginTop: 16, marginBottom:8, fontSize: 14}}  numberOfLines={1} >
            LOCKED
          </Text>

          </View>
        </View>
        </TouchableWithoutFeedback>
      :null}

      {(currentStatus===2)?
                  <TouchableWithoutFeedback onPress={()=>onPress(2,item)}>
          <View style={{borderRadius: 20,marginLeft:16, backgroundColor: background, marginBottom: 20, flex:1, flexDirection: "column"}}>
            <View style={styles.container}>
     
        <Text style={styles.title} numberOfLines={2} >
          {title}
        </Text>

        <Text style={{color: colors.white, marginTop: 16, marginBottom:8}} numberOfLines={1}>
          {completeActivity}/{totalActivity}
        </Text>

        <ProgressBar progress={completeActivity/totalActivity} color={Colors.green600} />

        <Text style={{color: colors.white, marginTop: 16, marginBottom:8, fontSize: 14}}  numberOfLines={1} >
          CONTINUE
        </Text>

        </View>
      </View>
      </TouchableWithoutFeedback>
    :null}

    
    {(currentStatus===3)?

      <TouchableWithoutFeedback onPress={()=>onPress(3,item)}>
      <View style={{borderRadius: 20,marginLeft:16, backgroundColor: background, marginBottom: 20, flex:1, flexDirection: "column"}}>
       <View style={styles.container}>
     
        <Text style={styles.title} numberOfLines={2} >
          {title}
        </Text>

        <Text style={{color: colors.white, marginTop: 16, marginBottom:8}} numberOfLines={1}>
          {completeActivity}/{totalActivity}
        </Text>

        {/* <ProgressBar progress={completeActivity/totalActivity} color={Colors.green600} /> */}

                   
                      <Text style={{
                       
                        color:'#fff',
                        fontWeight:'bold',
                       
                        textAlign:'center',
                        
                        
                      }}
                      // onPress={()=>openDateBox()}
                      >Pick a date to Continue</Text>
                           
                      <DateTimePickerModal
                        isVisible={showDatapicker}
                        mode={'date'}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />


            {/* <Text style={{color: colors.white, marginTop: 16, marginBottom:8, fontSize: 14}}  numberOfLines={1} >
            LET'S START
            </Text> */}

        </View>
      </View>
      </TouchableWithoutFeedback>

      :null}

    {(currentStatus===4)?

      <TouchableWithoutFeedback onPress={()=>onPress(4,item)}>
        <View style={{borderRadius: 20,marginLeft:16, backgroundColor: background, marginBottom: 20, flex:1, flexDirection: "column"}}>
          <View style={styles.container}>
     
        <Text style={styles.title} numberOfLines={2} >
          {title}
        </Text>

        <Text style={{color: colors.white, marginTop: 16, marginBottom:8}} numberOfLines={1}>
          {completeActivity}/{totalActivity}
        </Text>

        <ProgressBar progress={completeActivity/totalActivity} color={Colors.green600} />

        <Text style={{color: colors.white, marginTop: 16, marginBottom:8, fontSize: 14}}  numberOfLines={1} >
        COMPLETED
        </Text>

        </View>
      </View>
      </TouchableWithoutFeedback>
      :null}

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

export default CardDailyHabit;
