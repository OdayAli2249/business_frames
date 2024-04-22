import { UserRemoteDataSource } from "../data_sources/remote_data_sources/user_remote_data_source";
import { BaseRepositoy } from "./base_repository";

export class UserRepository extends BaseRepositoy {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.userDataSource = UserRemoteDataSource.getInstance()

        this.instance = this;
    }

    static getInstance() {
        return new UserRepository();
    }

    async createUser(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.userDataSource.createUser, params));
        })
    }

    async login(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.userDataSource.login, params));
        })
    }

    async updateUser(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.userDataSource.updateUser, params));
        })
    }

    async getUser(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.userDataSource.getUser, params));
        })
    }

    async getUsers(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.userDataSource.getUsers, params));
        })
    }

    async getUserById(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.userDataSource.getUserById, params));
        })
    }

}