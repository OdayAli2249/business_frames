import { PostDataSource } from "../post_data_source";
import { ApiClient } from "./api_client";
import { Request } from "../../helpers/request";

export class PostRemoteDataSource extends PostDataSource {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.apiClient = ApiClient.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new PostRemoteDataSource();
    }

    async createPost(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'content/post/create/' + request.branchId;
                var response = await ApiClient.getInstance().post(Request.build(endPoint,
                    null, null, request.post), [], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async updatePost(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'content/post/update/' + request.post.id;
                var response = await ApiClient.getInstance().put(Request.build(endPoint,
                    null, null, request.post), [], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async deletePost(request) {
        return new Promise(async (resolve, reject) => {
            try {

                var endPoint = 'content/post/delete/' + request.postId;
                var response = await ApiClient.getInstance().delete(Request.build(endPoint, null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getPosts(request) { }

    async getPostsWithPermissions(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'content/post/get-posts-with-permission/branch/' + request.branchId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { offset: request.offset, limit: request.limit, name: request.name }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }
}