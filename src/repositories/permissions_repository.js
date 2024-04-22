import { PermissionsRemoteDataSource } from "../data_sources/remote_data_sources/permissions_remote_data_source";
import { BaseRepositoy } from "./base_repository";

export class PermissionsRepository extends BaseRepositoy {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.permissionsDataSource = PermissionsRemoteDataSource.getInstance()

        this.instance = this;
    }

    static getInstance() {
        return new PermissionsRepository();
    }

    async createPermissionGroup(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.permissionsDataSource.createPermissionGroup, params));
        })
     }

    async updatePermissionGroup(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.permissionsDataSource.updatePermissionGroup, params));
        })
     }

    async deletePermissionGroup(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.permissionsDataSource.deletePermissionGroup, params));
        })
     }

    async getPermissionGroups(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.permissionsDataSource.getPermissionGroups, params));
        })
     }
}