
// const APP_BACKEND_API = process.env.EXPO_PUBLIC_API_URL;

const APP_BACKEND_API = 'https://ec5a-2409-40d0-f8-123a-188-99fc-2396-601a.ngrok-free.app';
const DRIVER_API_URL = APP_BACKEND_API + "/api/driver";
const USER_API_URL = APP_BACKEND_API + "/api/user";
const ORDER_API_URL = APP_BACKEND_API + "/api/orders";

console.log("api url by env=",APP_BACKEND_API);
export const Key = {
    APP_BACKEND_API,
    DRIVER_API_URL,
    USER_API_URL,
    ORDER_API_URL,
    mapApiKey: 'AIzaSyASRGQshp6t0wfi0WA-6MoHQsD0qAfflaM',
    unsplashApiKey: "nsjVrH4CnoI197tnVB1miQ9Q3gkfeaWfYRkm-1cAPR4",
};

export default Key;
