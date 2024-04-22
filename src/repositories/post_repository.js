import { PostRemoteDataSource } from "../data_sources/remote_data_sources/post_remote_data_source";
import { BaseRepositoy } from "./base_repository";

export class PostRepository extends BaseRepositoy {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.postDataSource = PostRemoteDataSource.getInstance()

        this.instance = this;
    }

    static getInstance() {
        return new PostRepository();
    }

    async createPost(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.postDataSource.createPost, params));
        })
    }

    async updatePost(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.postDataSource.updatePost, params));
        })
    }

    async deletePost(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.postDataSource.deletePost, params));
        })
    }

    async getPosts(params) { }

    async getPostsWithPermissions(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.postDataSource.getPostsWithPermissions, params));
        })
    }
}