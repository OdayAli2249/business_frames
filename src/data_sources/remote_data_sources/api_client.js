import axios, { Axios } from 'axios';
import { ServerError, AxiosError } from '../../helpers/error';
import { BaseResponse } from '../../helpers/base_response';
import { Cookies } from 'react-cookie';

export class ApiClient {

    constructor() {
        if (this.instance != null)
            return this.instance;

        this.baseURL = 'http://localhost:5001/api/';

        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true,
            timeout: 60000, // request timeout in milliseconds
            headers: {
                'Authorization': 'Bearer your-access-token',
                'Content-Type': 'application/json',
            },
        });

        this.configure()

        this.instance = this;
    }

    static getInstance() {
        return new ApiClient();
    }

    configure() {
        this.axiosInstance.interceptors.request.use(
            config => {
                console.log('Requests sent:', config);
                return config;
            },
            error => { }
        );

        this.axiosInstance.interceptors.response.use(
            response => {
                console.log('Response received:', response);
                const cookies = new Cookies();
                if (response.data && response.data['jwtToken']) {
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 7)
                    cookies.set('_jwt', response.data['jwtToken'], {
                        path: '/', expires: expirationDate,
                    });
                }
                if (response.status == 401)
                    cookies.remove('_jwt', { path: '/' });
                return response;
            },
            error => {
                const cookies = new Cookies();
                if (error.response.status == 401)
                    cookies.remove('_jwt', { path: '/' });
                if (error.response.status)
                    error.response.data.statusCode = error.response.status;
                return Promise.resolve(error.response.data ?
                    error.response : { data: { description: '---Error: something went wrong', statusCode: 400 } });
            }
        );

    }

    async get(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var response = await this.axiosInstance.get(this.baseURL + request.endPoint,
                    {
                        params: request.queryParams,
                        data: request.data
                    }
                );

                if (400 <= response.data.statusCode && response.data.statusCode <= 500)
                    reject(ServerError.build(response.data))
                else resolve(BaseResponse.build(response.data));
            } catch (err) {
                reject(AxiosError.build(err))
            }
        })
    }

    async post(request, listProps, asFromData) {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData();
                Object.keys(request.data).map((field) => {
                    if (field != 'images' && !listProps.includes(field))
                        formData.append(field, request.data[field])
                });
                if (request.data['images']) {
                    request.data['images'].map((_, index) => {
                        formData.append('images', request.data['images'][index])
                    })
                }

                listProps.map((prop, _) => {
                    request.data[prop].map((_, index) => {
                        formData.append(prop, request.data[prop][index])
                    })
                });

                var response
                if (!asFromData)
                    response = await this.axiosInstance.post(this.baseURL + request.endPoint, request.data, {
                        withCredentials: true,
                    });
                else
                    response = await this.axiosInstance.postForm(this.baseURL + request.endPoint, formData);


                if (400 <= response.data.statusCode && response.data.statusCode <= 500)
                    reject(ServerError.build(response.data))
                else resolve(BaseResponse.build(response.data));
            } catch (err) {
                reject(AxiosError.build(err))
            }
        })
    }

    async put(request, listProps, asFromData) {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData();
                if (request.data) {
                    Object.keys(request.data).map((field) => {
                        if (field != 'images' && !listProps.includes(field)
                            && request.data[field] != null && request.data[field] != undefined)
                            formData.append(field, request.data[field])
                    });


                    listProps.map((prop, _) => {
                        request.data[prop].map((_, index) => {
                            if (request.data[prop] && request.data[prop][index] != null)
                                formData.append(prop, request.data[prop][index])
                        })
                    });
                }

                var response
                if (!asFromData) {
                    if (request.data)
                        response = await this.axiosInstance.put(this.baseURL + request.endPoint, request.data);
                    else
                        response = await this.axiosInstance.put(this.baseURL + request.endPoint);
                }
                else
                    response = await this.axiosInstance.putForm(this.baseURL + request.endPoint, formData);

                if (400 <= response.data.statusCode && response.data.statusCode <= 500)
                    reject(ServerError.build(response.data))
                else resolve(BaseResponse.build(response.data));
            } catch (err) {
                reject(AxiosError.build(err))
            }
        })
    }

    async delete(request) {
        return new Promise(async (resolve, reject) => {
            try {
                var response = await this.axiosInstance.delete(this.baseURL + request.endPoint);

                if (400 <= response.data.statusCode && response.data.statusCode <= 500)
                    reject(ServerError.build(response.data))
                else resolve(BaseResponse.build(response.data));
            } catch (err) {
                reject(AxiosError.build(err))
            }
        })
    }
}

export class RequestDataType {
    static JSON = "JSON";
    static FORM_DATA = "FORM_DATA";
}