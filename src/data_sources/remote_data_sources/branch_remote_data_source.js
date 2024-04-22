import { Request } from "../../helpers/request";
import { BranchDataSource } from "../branch_data_source";
import { ApiClient } from "./api_client";

export class BranchRemoteDataSource extends BranchDataSource {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.apiClient = ApiClient.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new BranchRemoteDataSource();
    }

    async addNewUsersToBranch(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'branch/add-new-users-to-branch/' + request.branchId;
                var response = await ApiClient.getInstance().post(Request.build(endPoint, null, null,
                    { users: request.users }), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async addExistedUsersToBranch(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'branch/add-existred-users-to-branch';
                var response = await ApiClient.getInstance().put(Request.build(endPoint, null, null,
                    {
                        sourceBranches: [{
                            id: request.userBranchParams.sourceBranches[0],
                            userIds: request.userBranchParams.users
                        }],
                        targetBranch: request.userBranchParams.targetBranch[0]
                    }
                ), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async removeExistedUsersFromBranch(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'branch/remove-existed-users-from-branch';
                var response = await ApiClient.getInstance().put(Request.build(endPoint, null, null,
                    {
                        sourceBranches: [{
                            id: request.userBranchParams.sourceBranches[0],
                            userIds: request.userBranchParams.users
                        }],
                    }
                ), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async transferExistedUsersToBranch(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'branch/transfer-existed-users-to-branch';
                var response = await ApiClient.getInstance().put(Request.build(endPoint, null, null,
                    {
                        sourceBranches: [{
                            id: request.userBranchParams.sourceBranches[0],
                            userIds: request.userBranchParams.users
                        }],
                        targetBranch: request.userBranchParams.targetBranch[0]
                    }
                ), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getBranches(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'branch/get-branches/service-provider/' + request.serviceProviderId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { limit: request.limit, offset: request.offset, name: request.query }, null, null

                ));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async createBranch(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'branch/create/service-provider/' + request.serviceProviderId;
                var response = await ApiClient.getInstance().post(Request.build(endPoint, null, null, request.branch
                ), ['promotionPhotos', 'reviews'], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getBrancheUsers(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'branch/get-branch-users/branch/' + request.branchId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { limit: request.limit, offset: request.offset, name: request.name }, null, null));
                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getBranchById(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'branch/get-by-id/' + request.branchId;
                var response = await ApiClient.getInstance().get(
                    Request.build(endPoint, { withRoles: request.withRoles }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

}