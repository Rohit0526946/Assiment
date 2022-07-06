import { userConstants } from '../_constants';
import { userService } from '../_services';
import { dashboardActions } from './dashboard.actions';
import { alertActions } from './alert.actions';


export const userActions = {
    getTransactions,
    navigationSave,
    clearSendTx,
    forgotPassword,
    register,
    sendFromWithOTP,
    sendOtpTX,
    userlogin,
    logout,
    validateOtp,
    uploadProfile

};
function getTransactions() {

    return dispatch => {
        dispatch(request());
        userService.getTransactions()
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.USER_TX_REQUEST } }
    function success(users) { return { type: userConstants.USER_TX_SUCCESS, users } }
    function failure(error) { return { type: userConstants.USER_TX_FAILURE, error } }
}
function userlogin(data,props) {
    return dispatch => {
        dispatch(request({ data }));
        userService.userlogin(data)
            .then(
                user => {
                    dispatch(success(user));
                    console.log('aaa: -----> ', user);
                    setTimeout(() => {
                        props.navigation.navigate('BottomTab');
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'BottomTab' }],
                        });
                    }, 1000);
                    


                },
                error => {
                    dispatch(failure(error));
                    console.log("hell", error);
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(data, props) {
    return dispatch => {
        dispatch(request({ data }));
        userService.register(data)
            .then(
                user => {
                    let message = user && user.userinfoToken && user.userinfoToken.message ? user.userinfoToken.message : "";
                    dispatch(success(user));
                    dispatch(alertActions.success(message));
                    // //console.log('userlogin: -----> ', user)
                    setTimeout(() => {
                        props.navigation.navigate('Login')
                    }, 1000);
                },
                error => {
                    dispatch(failure(error));
                    // //console.log(error);
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function forgotPassword(data, props) {
    return dispatch => {
        dispatch(request({ data }));
        userService.forgotPassword(data)
            .then(
                user => {
                    let message = user && user.userInfo && user.userInfo.message ? user.userInfo.message : "";
                    dispatch(success(user));
                    dispatch(alertActions.success(message));
                    //console.log('userlogin: -----> ', user)
                    setTimeout(() => {
                        props.navigation.navigate('Login')
                    }, 1000);
                },
                error => {
                    dispatch(failure(error));
                    // //console.log(error);
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.FORGOT_REQUEST, user } }
    function success(user) { return { type: userConstants.FORGOT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FORGOT_FAILURE, error } }
}


function validateOtp(data, props) {
    return dispatch => {
        dispatch(request({ data }));
        userService.validateOtp(data)
            .then(
                user => {
                    dispatch(success(user));
                    //console.log("useruseruser  ",user);
                    setTimeout(() => {
                        props.navigation.navigate('Home');
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    }, 1000);

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_OTP_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_OTP_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_OTP_FAILURE, error } }
}

function uploadProfile(data) {
    return dispatch => {
        userService.uploadProfile(data)
            .then(
                user => {
                    dispatch(success(user));
                    // dispatch(dashboardActions.getClientProfile());

                    setTimeout(() => {
                        window.location.reload();
                        dispatch(dashboardActions.getClientProfile());

                    }, 700);
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error));
                }
            );
    };
    function success(user) { return { type: userConstants.FILE_UPLOAD_STATUS_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FILE_UPLOAD_STATUS_FAILURE, error } }
}

function sendFromWithOTP(data) {
    return dispatch => {
        dispatch(request({ data }));
        userService.sendFromWithOTP(data)
            .then(
                user => {
                    dispatch(success(user));
                    let message = user && user.userinfoSend && user.userinfoSend.message ? user.userinfoSend.message : "Success";
                    dispatch(alertActions.success(message));
                    setTimeout(() => {
                        dispatch(dashboardActions.getClientProfile());
                        dispatch(this.clearSendTx());
                    }, 700);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    dispatch(this.clearSendTx());
                }
            );
    };

    function request(user) { return { type: userConstants.SEND_REQUEST, user } }
    function success(user) { return { type: userConstants.SEND_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SEND_FAILURE, error } }
}
function sendOtpTX(data) {
    return dispatch => {
        dispatch(request({ data }));
        userService.sendOtpTX(data)
            .then(
                user => {
                    dispatch(success(user));
                    // dispatch(alertActions.success("Tx sent successfully."));
                    // setTimeout(() => {
                    //     dispatch(dashboardActions.getClientProfile());
                    // }, 700);
                },
                error => {
                    //console.log("errorerror ", error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.SEND_OTP_REQUEST, user } }
    function success(user) { return { type: userConstants.SEND_OTP_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SEND_OTP_FAILURE, error } }
}

function logout() {
    return dispatch => {
        dispatch(request({}));
    };
    function request(user) { return { type: userConstants.LOGOUT_OTP_SUCCESS } }
}


function clearSendTx() {
    return dispatch => {
        dispatch(request({}));
    };
    function request(user) { return { type: userConstants.CLEAR_SEND_SUCCESS } }
}

function navigationSave(props) {
    return dispatch => {
        // console.log("propspropspropspropsprops  ", props.navigation);
        dispatch(request({ navigation: props.navigation }));
    };
    function request(user) { return { type: userConstants.NAVIGATION_SUCCESS, user } }
}