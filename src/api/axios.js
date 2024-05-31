import axios from "axios";
import Swal from "sweetalert2";
import { refreshToken, logout } from './api'
const BASE_URL = import.meta.env.VITE_URL_API;

export default axios.create({
    baseURL: BASE_URL
})

export const createAxiosPrivate = (getToken) => {
    try {
        const axiosPrivate = axios.create({
            baseURL: BASE_URL,
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true
        });
        // Interceptor para agregar el JWT a cada solicitud
        axiosPrivate.interceptors.request.use(
            (config) => {
                const token = getToken();
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    try {
                      const newAcessToken = await refreshToken()
                      prevRequest.headers['Authorization'] = `Bearer ${newAcessToken}`
                      return axiosPrivate(prevRequest)
                    } catch (err) {
                      Swal.fire({
                        title: 'La sesion expiró',
                        text: 'Por favor, inica sesión nuevamente',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    }).then((result) => {
                        if(result.isConfirmed || result.isDismissed) {
                            logout();
                            navigate('/home', { replace: true });
                        }
                      })
                    }
    
                }
                return Promise.reject(error)
            })
        return axiosPrivate;
    } catch (err) {
        console.log(err)
    }

    
}