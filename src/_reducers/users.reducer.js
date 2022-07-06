import {
  userConstants
} from '../_constants';

export function users(state = {}, action) {

  switch (action.type) {

    //LOGIN
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        UserLoginEmailSuccess: true,
        UserLoginSuccess: false,
        UserLoginFailure: false,
        UserEmailToken: action.user.userinfoToken.token

      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        UserLoginFailure: true


      };

    //LOGIN OTP
    case userConstants.LOGIN_OTP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.LOGIN_OTP_SUCCESS:
      return {
        ...state,
        UserLoginSuccess: true,
        UserLoginEmailSuccess: false,
        UserLoginOTPFailure: false,
        // UserCurrentStage: action.user.userinfo.currentStage,
        token: action.user.userinfo.token
      };
    case userConstants.LOGIN_OTP_FAILURE:
      return {
        ...state,
        error: action.error,
        UserLoginOTPFailure: true
      };

    case userConstants.LOGOUT_OTP_SUCCESS:
      return {
        ...state,
        UserLoginSuccess: false,
        UserLoginEmailSuccess: false,
        UserLoginOTPFailure: false,
        UserCurrentStage: null,
        token: null
      };

    case userConstants.FILE_UPLOAD_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.FILE_UPLOAD_STATUS_SUCCESS:
      return {
        ...state,
        uploadProfileSuccess: true
      };
    case userConstants.FILE_UPLOAD_STATUS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case userConstants.SEND_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.SEND_SUCCESS:
      return {
        ...state,
        sendCoinSuccess: true,
        sendCoinTXOTPSuccess: false,
      };
    case userConstants.SEND_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case userConstants.CLEAR_SEND_SUCCESS:
      return {
        ...state,
        sendCoinSuccess: false,
        sendCoinTXOTPSuccess: false,
      };


    case userConstants.SEND_OTP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.SEND_OTP_SUCCESS:
      return {
        ...state,
        sendCoinTXOTPSuccess: true,
      };
    case userConstants.SEND_OTP_FAILURE:
      return {
        ...state,
        sendCoinTXOTPSuccess: false,
        error: action.error
      };

    case userConstants.SEND_OTP_CLEAN:
      return {
        ...state,
        sendCoinSuccess: false,
        sendCoinTXOTPSuccess: false,
      };

      case userConstants.USER_TX_REQUEST:
        return {
          ...state,
          loading: true
        };
      case userConstants.USER_TX_SUCCESS:
        return {
          ...state,
          getTxData: action.users.getTxData
        };
      case userConstants.USER_TX_FAILURE:
        return {
          ...state,
          error: action.error
        };

    default:
      return state
  }
}