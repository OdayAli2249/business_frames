import { ServiceProviderDataSource } from "../service_provider_data_source";
import { ApiClient, RequestDataType } from "./api_client";
import { Request } from "../../helpers/request";

export class ServiceProviderRemoteDataSource extends ServiceProviderDataSource {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.apiClient = ApiClient.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new ServiceProviderRemoteDataSource();
    }

    async createServiceProvider(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'service-provider/create';
                var response = await ApiClient.getInstance().post(Request.build(endPoint,
                    null, null, request.serviceProvider), [], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getServiceProviders(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'service-provider/get';
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { offset: request.offset, limit: request.limit, name: request.query }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getServiceProviderUsers(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'service-provider/get-service-provider-users/' + request.serviceProviderId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { offset: request.offset, limit: request.limit, name: request.query, roles: request.roles }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async addSubMasterUser(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'service-provider/add-sub-master/service-provider/' + request.serviceProviderId + '/user/' +
                    request.userId;
                var response = await ApiClient.getInstance().put(Request.build(endPoint, null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async removeSubMasterUser(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'service-provider/remove-sub-master/service-provider/' + request.serviceProviderId + '/user/' +
                    request.userId;
                var response = await ApiClient.getInstance().put(Request.build(endPoint, null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getUserServiceProviders(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'service-provider/get-user-service-providers/' + request.userId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint, null, null, null), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async binJobOfferCollectionItem(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'service-provider/bin-job-offer-collection/' + request.serviceProviderId;
                var response = await ApiClient.getInstance().put(Request.build(endPoint,
                    null, null, request.jobOffer), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async unbinJobOfferCollectionItem(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'service-provider/unbin-job-offer-collection/service-provider/'
                    + request.serviceProviderId + '/job-offer/' + request.jobOfferId;
                var response = await ApiClient.getInstance().delete(Request.build(endPoint, null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getServiceProviderById(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'service-provider/get-by-id/' + request.serviceProviderId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint, { withRoles: request.withRoles }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }
}