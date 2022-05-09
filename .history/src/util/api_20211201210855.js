import axios from 'axios';

// const baseURL = 'https://portal.deghauzimicrolending.com/api/'
const baseURL = 'http://127.0.0.1:8000/api/'


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function(error) {
        const originalRequest = error.config;
        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refreshToken = localStorage.getItem('refresh');

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return axiosInstance
                        .post('auth/jwt/refresh/', {
                            refresh: refreshToken,
                        })
                        .then((response) => {
                            localStorage.setItem('access', response.data.access);
                            localStorage.setItem('refresh', response.data.refresh);

                            axiosInstance.defaults.headers['Authorization'] =
                                'JWT ' + response.data.access;
                            originalRequest.headers['Authorization'] =
                                'JWT ' + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log('Refresh token is expired', tokenParts.exp, now);
                    window.location.href = '/auth';
                }
            } else {
                console.log('Refresh token not available.');
                window.location.href = '/auth';
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);


export default axiosInstance;