import {
  dashboardConstants
} from '../_constants';

export function dashboard(state = {}, action) {

  switch (action.type) {

    case dashboardConstants.SUBMIT_ENQUIRY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.SUBMIT_ENQUIRY_SUCCESS:
      return {
        ...state,
        submitEnquirySuccess: true
      };
    case dashboardConstants.SUBMIT_ENQUIRY_FAILURE:
      return {
        ...state,
        error: action.error
      };



    case dashboardConstants.CLIENT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        submitEnquirySuccess: false,
        isUpdated: false,
        clientProfileSuccess: false,
        makeDailyHappinessSuccess: false,
        clientProfile: action.dashboard.clientProfile,
        getEmployeeTrackerSuccess: false,
        startActivitySuccess: false,
        getExploreTrackSuccess: false


      };
    case dashboardConstants.CLIENT_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error
      };

    // getUser info 

    case dashboardConstants.GET_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.GET_USER_SUCCESS:
      return {
        ...state,
        // addedSuccessfully: false,
        isUpdated: false,
        userInfo: action.dashboard.getUserInfo,
      };
    case dashboardConstants.GET_USER_FAILURE:
      return {
        ...state,
        error: action.error
      };


    // update passdword


    case dashboardConstants.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isUpdated: true,

        updatePassword: action.dashboard.updatePassword,
      };
    case dashboardConstants.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.error
      };




    // update user Info



    case dashboardConstants.UPDATE_USERINFO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.UPDATE_USERINFO_SUCCESS:
      return {
        ...state,
        isUpdated: true,
        updateUserInfo: action.dashboard.updateUserInfo,
      };
    case dashboardConstants.UPDATE_USERINFO_FAILURE:
      return {
        ...state,
        error: action.error
      };



    // get  price History 

    case dashboardConstants.GET_PRICE_HISTORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.GET_PRICE_HISTORY_SUCCESS:
      return {
        ...state,

        getPriceHistory: action.dashboard.getPriceHistory,
      };
    case dashboardConstants.GET_PRICE_HISTORY_FAILURE:
      return {
        ...state,
        error: action.error
      };






    // get address 

    case dashboardConstants.GET_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        addedSuccessfully: false,
        addressList: action.dashboard.getAddress,
      };
    case dashboardConstants.GET_ADDRESS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case dashboardConstants.CREATE_TICKET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.CREATE_TICKET_SUCCESS:
      return {
        ...state,
        submitEnquirySuccess: true
      };
    case dashboardConstants.CREATE_TICKET_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case dashboardConstants.GET_TICKET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.GET_TICKET_SUCCESS:
      return {
        ...state,
        ticketCreate: false,
        ticketList: action.dashboard.getTicketList,
      };
    case dashboardConstants.GET_TICKET_FAILURE:
      return {
        ...state,
        error: action.error
      };



    case dashboardConstants.ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addedSuccessfully: true,
      };
    case dashboardConstants.ADD_ADDRESS_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case dashboardConstants.CREATE_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        messageCreate: true
      };
    case dashboardConstants.CREATE_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case dashboardConstants.GET_MESSAGE_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case dashboardConstants.GET_MESSAGE_BY_ID_SUCCESS:
      return {
        ...state,
        messageCreate: false,
        messageList: action.dashboard.getMessagesByTicketId,
      };
    case dashboardConstants.GET_MESSAGE_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error
      };





    default:
      return state
  }
}