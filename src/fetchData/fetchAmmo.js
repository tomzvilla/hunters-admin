import axios from "../api/axios"

const fetchAmmo = async () => {
    try {
        const response = await axios.get('/v1/ammunition');
        return response.data;
    } catch (err) {
        throw err;
    }
} 

export default fetchAmmo;