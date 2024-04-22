import { ServiceDataSource } from "../service_data_source";
import { ApiClient } from "./api_client";
import { Request } from "../../helpers/request";

export class ServiceRemoteDataSource extends ServiceDataSource {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.apiClient = ApiClient.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new ServiceRemoteDataSource();
    }

    async createService(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'content/service/create/' + request.branchId;
                var response = await ApiClient.getInstance().post(Request.build(endPoint,
                    null, null, request.service), ['features'], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async updateService(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'content/service/update/' + request.service.id;
                var response = await ApiClient.getInstance().put(Request.build(endPoint,
                    null, null, request.service), ['features', 'images'], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async deleteService(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'content/service/delete/' + request.serviceId;
                var response = await ApiClient.getInstance().delete(Request.build(endPoint, null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getServices(request) { }

    async getServicesWithPermissions(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'content/service/get-services-with-permission/branch/' + request.branchId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { offset: request.offset, limit: request.limit, name: request.query }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

}