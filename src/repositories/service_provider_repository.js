import { ServiceProviderRemoteDataSource } from "../data_sources/remote_data_sources/service_provider_remote_data_source";
import { BaseRepositoy } from "./base_repository";

export class ServiceProviderRepository extends BaseRepositoy {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.serviceProviderDataSource = ServiceProviderRemoteDataSource.getInstance()

        this.instance = this;
    }

    static getInstance() {
        return new ServiceProviderRepository();
    }

    async createServiceProvider(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.createServiceProvider, params));
        })
     }

    async getServiceProviders(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.getServiceProviders, params));
        })
     }

    async addSubMasterUser(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.addSubMasterUser, params));
        })
     }

    async removeSubMasterUser(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.removeSubMasterUser, params));
        })
     }

    async binJobOfferCollectionItem(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.binJobOfferCollectionItem, params));
        })
     }

     async unbinJobOfferCollectionItem(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.unbinJobOfferCollectionItem, params));
        })
     }

     async getServiceProviderById(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.getServiceProviderById, params));
        })
     }

     async getServiceProviderUsers(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.getServiceProviderUsers, params));
        })
     }

     async getUserServiceProviders(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.serviceProviderDataSource.getUserServiceProviders, params));
        })
     }

}