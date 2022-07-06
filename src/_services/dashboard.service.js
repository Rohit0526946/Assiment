import { CONST } from '../_config';
import { store } from '../_helpers/store';
import axios from 'axios';
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log("responseresponseresponse  ", response.data.message);
    if (response.data.error) {
        const error = (response.data.error && response.data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export const dashboardService = {
    getClientProfile,
    addAddress,
    logout,
    getAddress,
    updatepassword,
    createTicket,
    getTicketList,
    createMessage,
    getMessagesByTicketId,
    getUserInfo,
    updateUserInfo,
    getPriceHistory,
    createNotification,
};
async function logout() {

}
async function getClientProfile() {


    let { users } = store.getState()

    const options = {
        url: CONST.BACKEND_URL + `/overView`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        }
    };
    return axios(options)
        .then(data => {
            // console.log("getClientProfile ", data.data.data);
            let bucketObj = {
                clientProfile: data.data.data
            }
            return bucketObj;
        });
}




async function getUserInfo(data) {

    let { users } = store.getState()

    const options = {
        url: CONST.BACKEND_URL + `/getUserInfo`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("getUserInfo::::: ", data.data.data);
            let bucketObj = {
                getUserInfo: data.data.data
            }
            return bucketObj;
        });
}


async function updateUserInfo(data) {
    let { users } = store.getState()


    const options = {
        url: CONST.BACKEND_URL + `/updateUserInfo`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("updateUserInfo ", data.data);
            let bucketObj = {
                updateUserInfo: data.data
            }
            return bucketObj;
        });
}



async function getPriceHistory(data) {

    let { users } = store.getState()

    const options = {
        url: CONST.BACKEND_URL + `/getPriceHistory`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("getPriceHistory ", data.data.data);
            let dateTime = data.data.data ? data.data.data.map((element) => (element.dateV2)):[]
            let price = data.data.data ? data.data.data.map((element) => (element.dollerPrice)):[]
            let bucketObj = {
                getPriceHistory: {
                    dateTime,price
                }
            }
            return bucketObj;
        });
}







async function getAddress(data) {

    let { users } = store.getState()

    const options = {
        url: CONST.BACKEND_URL + `/getAddress`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("getAddress ", data.data.data);
            let bucketObj = {
                getAddress: data.data.data
            }
            return bucketObj;
        });
}


async function addAddress(data) {

    let { users } = store.getState();
    const options = {
        url: CONST.BACKEND_URL + `/addAddress`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    console.log("options  ", options);
    return axios(options)
        .then(data => {
            console.log("addAddress ", data.data);
            let bucketObj = {
                addAddress: data.data
            }
            return bucketObj;
        });
}

async function updatepassword(data) {
    let { users } = store.getState()


    const options = {
        url: CONST.BACKEND_URL + `/updatepassword`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("updatepassword ", data.data);
            let bucketObj = {
                updatePassword: data.data
            }
            return bucketObj;
        });
}


async function createTicket(data) {
    let { users } = store.getState()


    const options = {
        url: CONST.BACKEND_URL + `/createTicket`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("createTicket ", data.data);
            let bucketObj = {
                createTicket: data.data
            }
            return bucketObj;
        });
}


async function createNotification(data) {
    let { users } = store.getState()


    const options = {
        url: CONST.BACKEND_URL + `/createNotification`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("createNotification ", data.data);
            let bucketObj = {
                createNotification: data.data
            }
            return bucketObj;
        });
}


async function getTicketList(data) {

    let { users } = store.getState()

    const options = {
        url: CONST.BACKEND_URL + `/getTicketList`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("getTicketList ", data.data.data);
            let bucketObj = {
                getTicketList: data.data.data
            }
            return bucketObj;
        });
}


async function getMessagesByTicketId(data) {

    let { users } = store.getState()
    console.log('service getMessagesByTicketId ', data);

    const options = {
        url: CONST.BACKEND_URL + `/getMessageListByUserIdAndTicket`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("getMessagesByTicketId uuuuuuuuuuuuuu  ", data.data);
            let bucketObj = {
                getMessagesByTicketId: data.data.data
            }
            return bucketObj;
        }).catch((error) => {
            console.log(error);
        });
}




async function createMessage(data) {
    let { users } = store.getState()


    const options = {
        url: CONST.BACKEND_URL + `/createMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": users ? "Bearer " + users.token : null
        },
        data: JSON.stringify(data)
    };
    return axios(options)
        .then(data => {
            console.log("createMessage ", data.data);
            let bucketObj = {
                createMessage: data.data
            }
            return bucketObj;
        });
}
