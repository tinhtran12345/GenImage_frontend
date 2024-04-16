import BaseService from "./BaseService";

const backend_url = "http://localhost:5555/api/v1";

class ImageService extends BaseService {
    constructor(backend_url: string) {
        super(backend_url);
    }

    generateImage = async () => {};

    fetchImage = async (page: number, limit: number = 4) => {
        return await this.get(`/all?page=${page}&limit=${limit}`);
    };
}

export default new ImageService(backend_url);
