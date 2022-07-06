import { alertConstants } from '../_constants';//Raman
// import {  toast } from 'react-toastify'; //temp
import { Toast } from "native-base";
import {
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    let messagetest = message;
    // toast(messagetest)
    if (Platform.OS === 'android') {
        // ToastAndroid.show(messagetest, ToastAndroid.LONG, ToastAndroid.TOP);
        Toast.show({
            text: messagetest,
            type: "success"
        })
    } else {
        AlertIOS.alert(messagetest);
        Toast.show({
            text: messagetest,
            type: "success"
        })
    }
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    let messagetest = message;
    // toast(messagetest)
    if (Platform.OS === 'android') {
        // ToastAndroid.show(messagetest, ToastAndroid.SHORT)
        Toast.show({
            text: messagetest,
            type: "warning"
        })
    } else {
        // AlertIOS.alert(messagetest);
        Toast.show({
            text: messagetest,
            type: "warning"
        })
    }
    return { type: alertConstants.ERROR, message: messagetest };
}

function clear() {
    return { type: alertConstants.CLEAR };
}