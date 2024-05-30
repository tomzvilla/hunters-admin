import axios from "../api/axios"

const fetchSupplier = async () => {
    try {
        const response = await axios.get('/v1/supplier');
        return response.data;
    } catch (err) {
        throw err;
    }
} 

export default fetchSupplier;