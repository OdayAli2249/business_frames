import { ProductDataSource } from "../product_data_source";
import { ApiClient } from "./api_client";
import { Request } from "../../helpers/request";

export class ProductRemoteDataSource extends ProductDataSource {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.apiClient = ApiClient.getInstance();

        this.instance = this;
    }

    static getInstance() {
        return new ProductRemoteDataSource();
    }

    async updateProduct(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'content/product/update/' + request.product.id;
                var response = await ApiClient.getInstance().put(Request.build(endPoint,
                    null, null, request.product), ['sizes', 'features', 'colors', 'images'], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async createProduct(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'content/product/create/' + request.branchId;
                var response = await ApiClient.getInstance().post(Request.build(endPoint,
                    null, null, request.product), ['sizes', 'features', 'colors'], true);

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async deleteProduct(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'content/product/delete/' + request.productId;
                var response = await ApiClient.getInstance().delete(Request.build(endPoint, null, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

    async getProducts(request) { }

    async getProductsWithPermissions(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var endPoint = 'content/product/get-products-with-permission/branch/' + request.branchId;
                var response = await ApiClient.getInstance().get(Request.build(endPoint,
                    { offset: request.offset, limit: request.limit, name: request.query }, null, null));

                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    }

}