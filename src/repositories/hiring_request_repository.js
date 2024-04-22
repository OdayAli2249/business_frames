import { HiringRquestRemoteDataSource } from "../data_sources/remote_data_sources/hiring_request_remote_data_source";
import { BaseRepositoy } from "./base_repository";

export class HiringRequestRepository extends BaseRepositoy {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.hiringRequestDataSource = HiringRquestRemoteDataSource.getInstance()

        this.instance = this;
    }

    static getInstance() {
        return new HiringRequestRepository();
    }

    async createHiringRequest(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.hiringRequestDataSource.createHiringRequest, params));
        })
     }

    async rejectHiringRequest(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.hiringRequestDataSource.rejectHiringRequest, params));
        })
     }

    async cancelHiringRequest(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.hiringRequestDataSource.cancelHiringRequest, params));
        })
     }

    async getUserHiringRequests(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.hiringRequestDataSource.getUserHiringRequests, params));
        })
     }

    async getPendingServiceProvidertHiringRequest(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.hiringRequestDataSource.getPendingServiceProvidertHiringRequest, params));
        })
     }
}