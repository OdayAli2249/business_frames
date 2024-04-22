import { ProductRemoteDataSource } from "../data_sources/remote_data_sources/product_remote_data_source";
import { BaseRepositoy } from "./base_repository";

export class ProductRepository extends BaseRepositoy {

    constructor() {
        super();
        if (this.instance != null)
            return this.instance;

        this.productDataSource = ProductRemoteDataSource.getInstance()

        this.instance = this;
    }

    static getInstance() {
        return new ProductRepository();
    }

    async createProduct(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.productDataSource.createProduct, params));
        })
     }

    async updateProduct(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.productDataSource.updateProduct, params));
        })
     }
    

    async deleteProduct(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.productDataSource.deleteProduct, params));
        })
     }

    async getProducts(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.productDataSource.getProductsWithPermissions, params));
        })
     }

    async getProductsWithPermissions(params) {
        return new Promise(async (resolve, _) => {
            resolve(await this.requestWrapper(this.productDataSource.getProductsWithPermissions, params));
        })
     }
}