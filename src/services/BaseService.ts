import axios from "axios";

class BaseService {
    protected baseURL: string;
    protected configHeaders: any;
    public http: any;

    constructor(baseURL: string, configHeaders?: any) {
        this.baseURL = baseURL;
        this.configHeaders = configHeaders;
        this.http = axios.create({
            baseURL: baseURL,
            timeout: 100000,
        });
        this.http.interceptors.response.use(
            (response: any) => response,
            (error: any) => {
                const { response } = error;
                return Promise.reject(response);
            }
        );
    }

    public setConfigHeaders() {
        const token = localStorage.getItem("accessToken") || "";
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            ...this.configHeaders,
        };

        return config;
    }

    public get(url: string, configHeaders?: any) {
        return this.http.get(url, {
            ...this.setConfigHeaders(),
            ...configHeaders,
        });
    }

    public post(url: string, data: any, configHeaders?: any) {
        return this.http.post(url, data, {
            ...this.setConfigHeaders(),
            ...configHeaders,
        });
    }
}

export default BaseService;
