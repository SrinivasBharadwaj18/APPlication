import axios, { AxiosInstance, AxiosResponse } from "axios"



export default class AAPIService{
    Base = import.meta.env.VITE_BASE_URL
    api: AxiosInstance
    constructor(){
        this.api = axios.create({
            baseURL:this.Base
        })
    }

    public async get<T>(url: string, headers?: any): Promise<AxiosResponse<T>>{
        const response = await this.api.get<T>(`${url}`,headers)
        return response

    }

    public async  post<T>(url: string, requestBody: unknown, headers?:any ): Promise<AxiosResponse<T>> {
        const response = await this.api.post<T>(`${url}`, requestBody, headers ) 
            return response;

    }

    public async  patch<T>(url: string, headers:any, requestBody: unknown): Promise<AxiosResponse<T>> {
        const response = await this.api.patch<T>(`${url}`, requestBody, headers );
            return response;
            
    }
}