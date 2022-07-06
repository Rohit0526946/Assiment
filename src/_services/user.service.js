import { CONST } from '../_config';
import { authHeader } from '../_helpers';
import axios from 'axios';

import { store } from '../_helpers/store';


export const userService = {
    getTransactions,
    forgotPassword,
    register,
    userlogin,
    sendFromWithOTP,
    sendOtpTX,
    validateOtp,
    // uploadProfile,
    logout

};
function logout() {

}



function userlogin(data) {

    // let header = new Headers({
    //     'Content-Type': 'application/json'
    // });
    // const requestOptions = {
    //     method: "POST",
    //     headers: header,
    //     body: JSON.stringify(data)
    // }
    // //console.log('service ', data);
    // return fetch(CONST.BACKEND_URL + `/login`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         //console.log("user  ", user);
    //         let userObj = {
    //             userinfoToken: user.data
    //         }
    //         //console.log("userObj  ", userObj);
    //         return userObj;
    //     });
    const options = {
        url: CONST.BACKEND_URL + `/userlogin`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(user => {
            console.log("hello.... ", user.data.data);
            let userObj = {
                userinfoToken: user.data.data
            }
            return userObj;
        });
}



function register(data) {

    // let header = new Headers({
    //     'Content-Type': 'application/json'
    // });
    // const requestOptions = {
    //     method: "POST",
    //     headers: header,
    //     body: JSON.stringify(data)
    // }
    // //console.log('service ', data);
    // return fetch(CONST.BACKEND_URL + `/register`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         //console.log("user  ", user);
    //         let userObj = {
    //             userinfoToken: user
    //         }
    //         //console.log("userObj  ", userObj);
    //         return userObj;
    //     });


    const options = {
        url: CONST.BACKEND_URL + `/registerClient`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(user => {
            console.log("register ", user.data);
            let userObj = {
                userinfoToken: user.data
            }
            return userObj;
        });
}

function forgotPassword(data) {

    // let header = new Headers({
    //     'Content-Type': 'application/json'
    // });
    // const requestOptions = {
    //     method: "POST",
    //     headers: header,
    //     body: JSON.stringify(data)
    // }
    // //console.log('service ', data);
    // return fetch(CONST.BACKEND_URL + `/forgotPassword`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // //console.log("user  ", user);
    //         let userObj = {
    //             userInfo: user
    //         }
    //         //console.log("userObj  ", userObj);
    //         return userObj;
    //     });

    const options = {
        url: CONST.BACKEND_URL + `/forgotPassword`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(user => {
            console.log("forgotPassword ", user.data);
            let userObj = {
                userInfo: user.data
            }
            return userObj;
        });
}
function getTransactions(data) {
    // let header = new Headers({
    //     'Content-Type': 'application/json',
    //     "Authorization": authHeader().Authorization
    // });
    // const requestOptions = {
    //     method: "POST",
    //     headers: header,
    //     body: JSON.stringify(data)
    // }
    // return fetch(CONST.BACKEND_URL + `/getTransactions`, requestOptions)
    //     .then(handleResponse)
    //     .then(data => {

    //         let userObj = {
    //             getTxData: data.data
    //         }
    //         //console.log();
    //         return userObj;
    //     });
    let { users } = store.getState();
    const options = {
        url: CONST.BACKEND_URL + `/getTransactions`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        // data: JSON.stringify(data)
    };
    return axios(options)
        .then(user => {
            console.log("forgotPassword ", user.data);
            let userObj = {
                getTxData: user.data.data
            }
            return userObj;
        });
}

async function sendFromWithOTP(data) {

    let { users } = store.getState();

    // let header = new Headers({
    //     'Content-Type': 'application/json',
    //     "Authorization": users ? "Bearer " + users.token : null
    // });

    // const requestOptions = {
    //     method: "POST",
    //     headers: header,
    //     body: JSON.stringify(data)
    // }
    // return fetch(CONST.BACKEND_URL + `/sendFromWithOTP`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         let userObj = {
    //             userinfoSend: user
    //         }
    //         return userObj;
    //     });


    const options = {
        url: CONST.BACKEND_URL + `/sendFromWithOTP`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("userinfoSend ", data.data);
            let bucketObj = {
                userinfoSend: data.data
            }
            return bucketObj;
        });

}

async function sendOtpTX(data) {

    let { users } = store.getState()
    // let header = new Headers({
    //     'Content-Type': 'application/json',
    //     "Authorization": users ? "Bearer " + users.token : null
    // });

    // const requestOptions = {
    //     method: "POST",
    //     headers: header,
    //     body: JSON.stringify(data)
    // }
    // return fetch(CONST.BACKEND_URL + `/sendOtpTX`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         let userObj = {
    //             userinfo: user
    //         }
    //         return userObj;
    //     });

    const options = {
        url: CONST.BACKEND_URL + `/sendOtpTX`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("userinfoSend ", data.data);
            let bucketObj = {
                userinfo: data.data
            }
            return bucketObj;
        });
}

function validateOtp(data) {

    // let header = new Headers({
    //     'Content-Type': 'application/json'
    // });
    // const requestOptions = {
    //     method: "POST",
    //     headers: header,
    //     body: JSON.stringify(data)
    // }

    // return fetch(CONST.BACKEND_URL + `/loginValidateOtp`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         let userObj = {
    //             userinfo: user.data
    //         }
    //         return userObj;
    //     });
    const options = {
        url: CONST.BACKEND_URL + `/loginValidateOtp`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("userinfoSend ", data.data);
            let bucketObj = {
                userinfo: data.data.data
            }
            return bucketObj;
        });
}

// async function uploadProfile(filedata) {

//     let { users } = store.getState()
//     let header = new Headers({
//         // 'Content-Type': 'application/json',
//         "Authorization": users ? "Bearer " + users.token : null
//     });

//     var data = new FormData();
//     data.append('image', filedata);

//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: data
//     }
//     return fetch(CONST.BACKEND_URL + `/uploadProfile`, requestOptions)
//         .then(handleResponse)
//         .then(res => {
//             let userObj = {
//                 filesDetails: res.data
//             }
//             return userObj;
//         });
// }


// function handleResponse(response) {

//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         //console.log(data);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 logout();
//             }
//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }
//         if (data.error) {
//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }