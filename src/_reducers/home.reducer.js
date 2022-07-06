import {
    homeConstants
} from '../_constants';

export function home(state = {}, action) {

    switch (action.type) {
        case homeConstants.GET_SLIDER_LIST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case homeConstants.GET_SLIDER_LIST_SUCCESS:
            return {
                ...state,
                addCategorySuccess: false,
                // CategoryList: action.category.getAllCategory
                getAllSliderList: action.category.getAllSliderList
            };
        case homeConstants.GET_SLIDER_LIST_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case homeConstants.GET_ARRIVALS_ID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case homeConstants.GET_ARRIVALS_ID_SUCCESS:
            return {
                ...state,
                addCategorySuccess: false,
                // CategoryList: action.category.getAllCategory
                getArrivalsListId: action.category.getArrivalsListId
            };
        case homeConstants.GET_ARRIVALS_ID_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case homeConstants.GET_ARRIVALS_LIST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case homeConstants.GET_ARRIVALS_LIST_SUCCESS:
            return {
                ...state,
                addCategorySuccess: false,
                // CategoryList: action.category.getAllCategory
                GetArrivalsList: action.category.getArrivalsList.list
            };
        case homeConstants.GET_ARRIVALS_LIST_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case homeConstants.GET_FEATURED_LIST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case homeConstants.GET_FEATURED_LIST_SUCCESS:
            return {
                ...state,
                addCategorySuccess: false,
                // CategoryList: action.category.getAllCategory
                GetFeaturedList: action.category.getFeaturedList
            };
        case homeConstants.GET_FEATURED_LIST_FAILURE:
            return {
                ...state,
                error: action.error
            };


        case homeConstants.GETALL_TOP_MOST_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case homeConstants.GETALL_TOP_MOST_CATEGORY_SUCCESS:
            return {
                ...state,
                addCategorySuccess: false,
                // CategoryList: action.category.getAllCategory
                TopMostCategoryList: action.category.getTopMostCategoryList
            };
        case homeConstants.GETALL_TOP_MOST_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.error
            };


        case homeConstants.GETALL_HOME_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case homeConstants.GETALL_HOME_CATEGORY_SUCCESS:
            return {
                ...state,
                addCategorySuccess: false,
                CategoryList: action.category.getAllCategory
            };
        case homeConstants.GETALL_HOME_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case homeConstants.GETALL_HOME_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case homeConstants.GETALL_HOME_PRODUCT_SUCCESS:
            return {
                ...state,
                addProductSuccess: false,
                ProductItems: action.product.getProductList.list,
                total: action.product.getProductList.total
            };
        case homeConstants.GETALL_HOME_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case homeConstants.GETALL_HOME_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case homeConstants.GETALL_HOME_REVIEW_SUCCESS:
            return {
                ...state,
                addProductSuccess: false,
                ReviewItems: action.review.getReviewList.list,
                total: action.review.getReviewList
            };
        case homeConstants.GETALL_HOME_REVIEW_FAILURE:
            return {
                ...state,
                error: action.error
            };



        default:
            return state
    }
}