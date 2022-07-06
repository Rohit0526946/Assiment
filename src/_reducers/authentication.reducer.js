import AsyncStorage from '@react-native-async-storage/async-storage';
import { userConstants } from '../_constants';
const initialState =  {};

export async function authentication(state = initialState, action) {
  let userData = await AsyncStorage.getItem("UserData");
  let temp={}
  if (userData) {
     temp={loggedIn: true, 'user':JSON.parse(userData)}
  }
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: {}
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return {...state,...temp}
  }
}