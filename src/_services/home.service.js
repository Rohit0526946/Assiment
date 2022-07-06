import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const homeService = {
    logout,
    getAllCategory,
    getProductList,
    getReviewList,
    getTopMostCategoryList,
    getFeaturedList,
    getArrivalsList,
    getAllSlider,
    getArrivalsById,

    
};


function getAllSlider(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getAllSlider`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let categoryObj = {
                getAllSliderList: data.data
            }
            return categoryObj;
        });
}

function getArrivalsById(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getArrivalsById`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let categoryObj = {
                getArrivalsListId: data.data
            }
            console.log("we are in service",data.data);
            return categoryObj;
        });
}

function getArrivalsList(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getArrivalsList`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let categoryObj = {
                getArrivalsList: data.data
            }
            console.log("we are in servicewe are in servicewe are in service",data.data);
            return categoryObj;
        });
}

function getFeaturedList(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getFeaturedList`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let categoryObj = {
                getFeaturedList: data.data.list
            }
            return categoryObj;
        });
}

function getTopMostCategoryList(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getTopMostCategoryList`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let categoryObj = {
                getTopMostCategoryList: data.data.list
            }
            return categoryObj;
        });
}

function getAllCategory(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getAllCategory`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let categoryObj = {
                getAllCategory: data.data.list
            }
            // console.log("we are in service",data.data);

            return categoryObj;
        });
}

function getProductList(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/client/getProductList`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let productObj = {
                getProductList: data.data
            }
            // console.log("we are in service",data.data);

            return productObj;
        });
}

function getReviewList(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/client/getReviewList`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let reviewObj = {
                getReviewList: data.data
            }
            // console.log("we are in service",data.data);

            return reviewObj;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (data.error) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function logout() {
    localStorage.removeItem('category');
}