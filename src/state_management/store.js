import getServiceProvidersReducer from './reducers/get_service_providers_reducer';
import createServiceProviderReducer from './reducers/create_service_provider_reducer';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getBrancheUsersReducer from './reducers/get_branch_users_reducer';
import createPermissionGroupReducer from './reducers/create_permission_group_reducer';
import getServicesReducer from './reducers/get_services_reducer';
import getProductsReducer from './reducers/get_products_reducer';
import getPostsReducer from './reducers/get_posts_reducer';
import createServiceReducer from './reducers/create_service_reducer';
import createHiringRequestReducer from './reducers/create_hiring_request_reducer';
import updateUserReducer from './reducers/update_user_reducer';
import createBranchReducer from './reducers/create_branch_reducer';
import createJobOfferReducer from './reducers/create_job_offer_reducer';
import modifyUserBranchesReducer from './reducers/modify_user_branches_reducer';
import modifyProductReducer from './reducers/modify_product_reducer';
import modifyPermissionGroupReducer from './reducers/modify_permission_group_reducer';
import getPermissionGroupsReducer from './reducers/get_permission_groups_reducer';
import getUsersReducer from './reducers/get_users_reducer';
import blanlReducer from './reducers/blank_reducer';
import modifyServiceReducer from './reducers/modify_service_reducer';
import modifyPostReducer from './reducers/modify_post_reducer';
import modifyHiringRequestReducer from './reducers/modify_hiring_request_reducer';
import getHiringRequestReducer from './reducers/get_hiring_requests_reducer';
import getJobOffersReducer from './reducers/get_job_offers_reducer';
import modifyJobOfferReducer from './reducers/modify_job_offer_reducer';
import modifyUserRoleReducer from './reducers/modify_user_role_reducer';
import getServiceProviderUsersReducer from './reducers/get_service_provider_users_reducer';
import getUserServiceProvidersReducer from './reducers/get_user_service_providers_reducer';
import getBranchesReducer from './reducers/get_branches_reducer';
import getBranchByIdReducer from './reducers/get_branch_by_id_reducer';
import getServiceProviderByIdReducer from './reducers/get_service_provider_by_id_reducer';
import getUserReducer from './reducers/get_user_reducer';
import signReducer from './reducers/sign_reducer';
import getUserByIdReducer from './reducers/get_user_by_id_reducer';
import getCEOsReducer from './reducers/get_ceos_reducer';

const rootReducer = combineReducers({
    blank: blanlReducer,
    serviceProviders: getServiceProvidersReducer,
    createServiceProvider: createServiceProviderReducer,
    branchUsers: getBrancheUsersReducer,
    createPermissionGroup: createPermissionGroupReducer,
    services: getServicesReducer,
    products: getProductsReducer,
    posts: getPostsReducer,
    modifyProduct: modifyProductReducer,
    createService: createServiceReducer,
    createHiringRequest: createHiringRequestReducer,
    updateUser: updateUserReducer,
    createBranch: createBranchReducer,
    createJobOffer: createJobOfferReducer,
    modifyUserBranches: modifyUserBranchesReducer,
    modifyPermissionGroup: modifyPermissionGroupReducer,
    permissionGroups: getPermissionGroupsReducer,
    users: getUsersReducer,
    modifyService: modifyServiceReducer,
    modifyPost: modifyPostReducer,
    modifyHiringRequest: modifyHiringRequestReducer,
    hiringRequests: getHiringRequestReducer,
    jobOffers: getJobOffersReducer,
    modifyJobOffer: modifyJobOfferReducer,
    modifyUserRole: modifyUserRoleReducer,
    serviceProviderUsers: getServiceProviderUsersReducer,
    userServiceProviders: getUserServiceProvidersReducer,
    branches: getBranchesReducer,
    branchById: getBranchByIdReducer,
    serviceProviderById: getServiceProviderByIdReducer,
    userById: getUserByIdReducer,
    user: getUserReducer,
    sign: signReducer,
    ceos: getCEOsReducer
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

