import axios from 'axios';

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page,
            }
        });
        return response;
    }

    static async getById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
        return response;
    }

    static async getCommentsById(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }

    static async getAllAlbums(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums', {
            params: {
                _limit: limit,
                _page: page,
            }
        });
        return response;
    }

    static async getPhotosByAlbumId(albumId) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
            params: {
                albumId
            }
        });
        console.log(response);
        return response;
    }
}