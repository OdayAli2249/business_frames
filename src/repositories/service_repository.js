import { ServiceRemoteDataSource } from "../data_sources/remote_data_sources/service_remote_data_source";
import { BaseRepositoy } from "./base_repository";

export class ServiceRepository extends BaseRepositoy {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.serviceDataSource = ServiceRemoteDataSource.getInstance()

        this.instance = this;
    }

    static getInstance() {
        return new ServiceRepository();
    }

    async createService(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceDataSource.createService, params));
        })
    }

    async updateService(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceDataSource.updateService, params));
        })
    }

    async deleteService(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceDataSource.deleteService, params));
        })
    }

    async getServices(params) {}

    async getServicesWithPermissions(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceDataSource.getServicesWithPermissions, params));
        })
    }
}