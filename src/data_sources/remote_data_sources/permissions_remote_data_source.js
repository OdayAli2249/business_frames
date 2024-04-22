import { PermissionsDataSource } from "../permissions_data_source";
import { ApiClient } from "./api_client";
import { Request } from "../../helpers/request";

export class PermissionsRemoteDataSource extends PermissionsDataSource {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.apiClient = ApiClient.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new PermissionsRemoteDataSource();
    }

    async createPermissionGroup(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'permission/create/' + request.branchId;
                var response = await ApiClient.getInstance().post(Request.build(endPoint,
                    null, null, request.permissionGroup),
                    ['userIds', 'postIds', 'productIds', 'serviceIds'],
                    false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async updatePermissionGroup(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'permission/update/' + request.permissionGroupId;
                var response = ApiClient.getInstance().put(Request.build(endPoint,
                    null, null, request.permissionGroup),
                    ['userIds', 'postIds', 'productIds', 'serviceIds']);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async deletePermissionGroup(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'permission/delete/' + request.permissionGroupId;
                var response = await ApiClient.getInstance().delete(Request.build(endPoint,
                    null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getPermissionGroups(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'permission/get/' + request.branchId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { offset: request.offset, limit: request.limit, name: request.query }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

}