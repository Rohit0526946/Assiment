import { dashboardConstants } from '../_constants';
import { dashboardService } from '../_services';
import { alertActions } from '.';

export const dashboardActions = {
    addAddress,
    getAddress,
    getClientProfile,
    updatepassword,
    createTicket,
    getTicketList,
    getMessagesByTicketId,
    createMessage,
    getUserInfo,
    updateUserInfo,
    getPriceHistory,
    createNotification,
};
function getClientProfile() {
    return dispatch => {
        dispatch(request());
        dashboardService.getClientProfile()
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.CLIENT_PROFILE_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.CLIENT_PROFILE_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.CLIENT_PROFILE_FAILURE, error } }
}


function getUserInfo() {
    return dispatch => {
        dispatch(request());
        dashboardService.getUserInfo()
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.GET_USER_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.GET_USER_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.GET_USER_FAILURE, error } }
}




function updateUserInfo(data, props) {
    return dispatch => {
        dispatch(request());
        dashboardService.updateUserInfo(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard))
                    let message = dashboard && dashboard.updateUserInfo && dashboard.updateUserInfo.message ? dashboard.updateUserInfo.message : "Success";
                    dispatch(alertActions.success(message));
                    setTimeout(() => {
                        dispatch(this.getUserInfo());
                    }, 500);
                },
                error => {
                    console.log("error  ", error);
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: dashboardConstants.UPDATE_USERINFO_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.UPDATE_USERINFO_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.UPDATE_USERINFO_FAILURE, error } }
}





function getPriceHistory() {
    return dispatch => {
        dispatch(request());
        dashboardService.getPriceHistory()
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.GET_PRICE_HISTORY_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.GET_PRICE_HISTORY_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.GET_PRICE_HISTORY_FAILURE, error } }
}









function getAddress() {
    return dispatch => {
        dispatch(request());
        dashboardService.getAddress()
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.GET_ADDRESS_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.GET_ADDRESS_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.GET_ADDRESS_FAILURE, error } }
}
function addAddress(data) {
    return dispatch => {
        dispatch(request());
        dashboardService.addAddress(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                    let message = dashboard && dashboard.addAddress && dashboard.addAddress.message ? dashboard.addAddress.message : "Success";
                    dispatch(alertActions.success(message));
                    setTimeout(() => {
                        dispatch(this.getAddress());
                    }, 500);
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.ADD_ADDRESS_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.ADD_ADDRESS_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.ADD_ADDRESS_FAILURE, error } }

}



function updatepassword(data, props) {
    return dispatch => {
        dispatch(request());
        dashboardService.updatepassword(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard))
                    let message = dashboard && dashboard.updatePassword && dashboard.updatePassword.message ? dashboard.updatePassword.message : "Success";
                    dispatch(alertActions.success(message));
                    setTimeout(() => {
                        // props.navigation.navigate('dashboard')
                        dispatch(this.getClientProfile());
                    }, 500);
                },
                error => {
                    console.log("error  ", error);
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: dashboardConstants.UPDATE_PASSWORD_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.UPDATE_PASSWORD_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.UPDATE_PASSWORD_FAILURE, error } }
}


function createTicket(data, props) {
    return dispatch => {
        dispatch(request());
        dashboardService.createTicket(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard))
                    let message = dashboard && dashboard.createTicket && dashboard.createTicket.message ? dashboard.createTicket.message : "Success";
                    dispatch(alertActions.success(message));
                    dispatch(this.getTicketList());
                    // setTimeout(() => {
                    //     dispatch(this.getClientProfile());
                    // }, 500);
                },
                error => {
                    console.log("error  ", error);
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: dashboardConstants.CREATE_TICKET_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.CREATE_TICKET_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.CREATE_TICKET_FAILURE, error } }
}



function createNotification(data, props) {
    return dispatch => {
        dispatch(request());
        dashboardService.createNotification(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard))
                    let message = dashboard && dashboard.createTicket && dashboard.createTicket.message ? dashboard.createTicket.message : "Success";
                    dispatch(alertActions.success(message));
                    dispatch(this.getTicketList());
                    // setTimeout(() => {
                    //     dispatch(this.getClientProfile());
                    // }, 500);
                },
                error => {
                    console.log("error  ", error);
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: dashboardConstants.CREATE_TICKET_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.CREATE_TICKET_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.CREATE_TICKET_FAILURE, error } }
}

// function getTicketList() {
//     return dispatch => {
//         dispatch(request());
//         dashboardService.getTicketList()
//             .then(
//                 dashboard => {
//                     dispatch(success(dashboard));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                 }
//             );
//     };
//     function request() { return { type: dashboardConstants.GET_TICKET_REQUEST } }
//     function success(dashboard) { return { type: dashboardConstants.GET_TICKET_SUCCESS, dashboard } }
//     function failure(error) { return { type: dashboardConstants.GET_TICKET_FAILURE, error } }
// }

function getTicketList() {
    return dispatch => {
        dispatch(request());
        dashboardService.getTicketList()
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.GET_TICKET_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.GET_TICKET_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.GET_TICKET_FAILURE, error } }
}




function createMessage(data, props) {
    return dispatch => {
        dispatch(request());
        dashboardService.createMessage(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard))
                    let message = dashboard && dashboard.createMessage && dashboard.createMessage.message ? dashboard.createMessage.message : "Success";
                    // dispatch(alertActions.success(message));
                    dispatch(this.getMessagesByTicketId({ ticketId: data.ticketId }));
                    // setTimeout(() => {
                    //     dispatch(this.getClientProfile());
                    // }, 500);
                },
                error => {
                    console.log("error  ", error);
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: dashboardConstants.CREATE_MESSAGE_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.CREATE_MESSAGE_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.CREATE_MESSAGE_FAILURE, error } }
}


function getMessagesByTicketId(data) {
    console.log('kkkkkkkkkkkkkkkkkkkkkk getMessagesByTicketId ', data);
    return dispatch => {
        dispatch(request());
        dashboardService.getMessagesByTicketId(data)
            .then(
                dashboard => {
                    dispatch(success(dashboard));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: dashboardConstants.GET_MESSAGE_BY_ID_REQUEST } }
    function success(dashboard) { return { type: dashboardConstants.GET_MESSAGE_BY_ID_SUCCESS, dashboard } }
    function failure(error) { return { type: dashboardConstants.GET_MESSAGE_BY_ID_FAILURE, error } }
}
