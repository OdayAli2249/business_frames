import { BranchRemoteDataSource } from "../data_sources/remote_data_sources/branch_remote_data_source";
import { BaseRepositoy } from "./base_repository";

export class BranchRepository extends BaseRepositoy {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.branchDataSource = BranchRemoteDataSource.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new BranchRepository();
    }

    async addNewUsersToBranch(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.branchDataSource.addNewUsersToBranch, params));
        })
    }

    async addExistedUsersToBranch(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.branchDataSource.addExistedUsersToBranch, params));
        })
    }

    async removeExistedUsersFromBranch(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.branchDataSource.removeExistedUsersFromBranch, params));
        })
    }

    async transferExistedUsersToBranch(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.branchDataSource.transferExistedUsersToBranch, params));
        })
    }

    async getBranchById(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.branchDataSource.getBranchById, params));
        })
     }

    async getBranches(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.branchDataSource.getBranches, params));
        })
    }

    async createBranch(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.branchDataSource.createBranch, params));
        })
    }

    async getBrancheUsers(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.branchDataSource.getBrancheUsers, params));
        })
    }
}