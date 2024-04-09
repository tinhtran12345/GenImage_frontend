import BaseService from "./BaseService";

const backend_url = "http://localhost:5555/api/v1";

class ImageService extends BaseService {
    constructor(backend_url: string) {
        super(backend_url);
    }
}

export default new ImageService(backend_url);
