import { createAxiosPrivate } from './axios';
import axios from './axios';
import store from '../store/index';
import { authActions } from '../store/authSlice';

const getToken = () => store.getState().auth.user?.token;

export const axiosPrivate = createAxiosPrivate(getToken);

export const refreshToken = async () => {
    const response = await axios.get('/v1/auth/refresh', {
        withCredentials: true
    })
    store.dispatch(authActions.setUser(response.data))

    return response.data.token
}

export const logout = async () => {
    try {
        const response = await axios.get('/v1/auth/logout', {
            withCredentials: true,
        });
        if(response.status === 200) {
            store.dispatch(authActions.setUser({}));
        }
    } catch (err) {
        console.log(err);
    }
}

export const fetchAmmo = async () => {
    try {
        const response = await axiosPrivate.get('/v1/ammunition');
        return response.data;
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export const fetchSupplier = async () => {
    try {
        const response = await axiosPrivate.get('/v1/supplier');
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const fetchAmmoType = async () => {
    try {
        const response = await axiosPrivate.get('/v1/ammo-type');
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const fetchBrand = async () => {
    try {
        const response = await axiosPrivate.get('/v1/brand');
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const fetchCaliber = async () => {
    try {
        const response = await axiosPrivate.get('/v1/caliber');
        return response.data;
    } catch (err) {
        throw err;
    }
}