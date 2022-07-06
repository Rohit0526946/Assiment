import { homeConstants } from '../_constants';
import { homeService } from '../_services';
import { alertActions } from '.';

export const homeActions = {
    getAllCategory,
    getProductList,
    getReviewList,
    getTopMostCategoryList,
    getFeaturedList,
    getArrivalsList,
    getAllSlider,
    getArrivalsById
};

function getAllSlider(data) {
    return dispatch => {
        dispatch(request());
        homeService.getAllSlider(data)
            .then(
                category => {
                    console.log("we are in action ", category);
                    dispatch(success(category))
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );

    };
    function request() { return { type: homeConstants.GET_SLIDER_LIST_REQUEST } }
    function success(category) { return { type: homeConstants.GET_SLIDER_LIST_SUCCESS, category } }
    function failure(error) { return { type: homeConstants.GET_SLIDER_LIST_FAILURE, error } }
}
function getArrivalsById(data) {
    return dispatch => {
        dispatch(request());
        homeService.getArrivalsById(data)
            .then(
                category => {
                    console.log("we are in action ", category);
                    dispatch(success(category))
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );

    };
    function request() { return { type: homeConstants.GET_ARRIVALS_ID_REQUEST } }
    function success(category) { return { type: homeConstants.GET_ARRIVALS_ID_SUCCESS, category } }
    function failure(error) { return { type: homeConstants.GET_ARRIVALS_ID_FAILURE, error } }
}

function getArrivalsList(data) {
    return dispatch => {
        dispatch(request());
        homeService.getArrivalsList(data)
            .then(
                category => {
                    console.log("we are in action ", category);
                    dispatch(success(category))
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );

    };
    function request() { return { type: homeConstants.GET_ARRIVALS_LIST_REQUEST } }
    function success(category) { return { type: homeConstants.GET_ARRIVALS_LIST_SUCCESS, category } }
    function failure(error) { return { type: homeConstants.GET_ARRIVALS_LIST_FAILURE, error } }
}

function getFeaturedList(data) {
    return dispatch => {
        dispatch(request());
        homeService.getFeaturedList(data)
            .then(
                category => {
                    console.log("we are in action ", category);
                    dispatch(success(category))
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );

    };
    function request() { return { type: homeConstants.GET_FEATURED_LIST_REQUEST } }
    function success(category) { return { type: homeConstants.GET_FEATURED_LIST_SUCCESS, category } }
    function failure(error) { return { type: homeConstants.GET_FEATURED_LIST_FAILURE, error } }
}

function getTopMostCategoryList(data) {
    return dispatch => {
        dispatch(request());
        homeService.getTopMostCategoryList(data)
            .then(
                category => {
                    console.log("we are in action ", category);
                    dispatch(success(category))
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );

    };
    function request() { return { type: homeConstants.GETALL_TOP_MOST_CATEGORY_REQUEST } }
    function success(category) { return { type: homeConstants.GETALL_TOP_MOST_CATEGORY_SUCCESS, category } }
    function failure(error) { return { type: homeConstants.GETALL_TOP_MOST_CATEGORY_FAILURE, error } }
}

function getAllCategory(data) {
    return dispatch => {
        dispatch(request());
        homeService.getAllCategory(data)
            .then(
                category => {
                    console.log("we are in action ", category);
                    dispatch(success(category))
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );

    };


    function request() { return { type: homeConstants.GETALL_HOME_CATEGORY_REQUEST } }
    function success(category) { return { type: homeConstants.GETALL_HOME_CATEGORY_SUCCESS, category } }
    function failure(error) { return { type: homeConstants.GETALL_HOME_CATEGORY_FAILURE, error } }
}


function getProductList(data) {
    return dispatch => {
        dispatch(request());
        homeService.getProductList(data)
            .then(
                product => {
                    console.log("we are in action ", product);
                    dispatch(success(product))
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );

    };


    function request() { return { type: homeConstants.GETALL_HOME_PRODUCT_REQUEST } }
    function success(product) { return { type: homeConstants.GETALL_HOME_PRODUCT_SUCCESS, product } }
    function failure(error) { return { type: homeConstants.GETALL_HOME_PRODUCT_FAILURE, error } }
}

function getReviewList(data) {
    return dispatch => {
        dispatch(request());
        homeService.getReviewList(data)
            .then(
                review => {
                    console.log("we are in action ", review);
                    dispatch(success(review))
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );

    };


    function request() { return { type: homeConstants.GETALL_HOME_REVIEW_REQUEST } }
    function success(review) { return { type: homeConstants.GETALL_HOME_REVIEW_SUCCESS, review } }
    function failure(error) { return { type: homeConstants.GETALL_HOME_REVIEW_FAILURE, error } }
}