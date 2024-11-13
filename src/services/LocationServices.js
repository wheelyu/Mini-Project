// src/services/LocationService.js
import API_CONFIG from '../constant/config';

export const getLocation = (onSuccess, onError) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
        onError('Geolocation is not supported by your browser');
        }
    };
    
    export const fetchLocationName = async (latitude, longitude) => {
        const baseURL = API_CONFIG.regionApi;
        try {
        const response = await fetch(
            `${baseURL}/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        return data.address.city || data.address.village || data.address.town || 'Unknown Location';
        } catch {
        throw new Error('Unable to determine location name');
        }
    };
    