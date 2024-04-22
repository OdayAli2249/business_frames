import { UserDataSource } from "../user_data_source";
import { ApiClient } from "./api_client";
import { Request } from "../../helpers/request";

export class UserRemoteDataSource extends UserDataSource {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.apiClient = ApiClient.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new UserRemoteDataSource();
    }

    async createUser(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'user/create';
                var response = await ApiClient.getInstance().post(Request.build(endPoint,
                    null, null, request.user), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async login(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'user/login';
                var response = await ApiClient.getInstance().post(Request.build(endPoint,
                    null, null, request.credentials), [], false);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async updateUser(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'user/update';
                var response = await ApiClient.getInstance().put(Request.build(endPoint,
                    null, null, request.user), [], request.asFormData);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getUser(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'user/get';
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getUsers(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'user/get-users';
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { offset: request.offset, limit: request.limit, name: request.query }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getUserById(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'user/get-by-id/' + request.userId;
                var response = await ApiClient.getInstance().get(
                    Request.build(endPoint, null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

}