import { Request } from "../../helpers/request";
import { HiringRequestDataSource } from "../hiring_request_data_source";
import { ApiClient } from "./api_client";

export class HiringRquestRemoteDataSource extends HiringRequestDataSource {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.apiClient = ApiClient.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new HiringRquestRemoteDataSource();
    }

    async createHiringRequest(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'hiring-request/create/' + request.serviceProviderId;
                var response = await ApiClient.getInstance().post(Request.build(endPoint, null, null, request.hiringRequest), [], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async rejectHiringRequest(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'hiring-request/reject/' + request.hiringRequestId;
                var response = await ApiClient.getInstance().put(Request.build(endPoint, null, null, null), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async cancelHiringRequest(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'hiring-request/cancel/' + request.hiringRequestId;
                var response = await ApiClient.getInstance().delete(Request.build(endPoint, null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getUserHiringRequests(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'hiring-request/get/service-provider/' + request.serviceProviderId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getPendingServiceProvidertHiringRequest(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'hiring-request/get-pending/' + request.serviceProviderId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { offset: request.offset, limit: request.limit }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

}