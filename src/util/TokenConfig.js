export const tokenConfig = getState => {
    const token = getState().authReducer.access || null;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token){
       config.headers["Authorization"] = `JWT ${token}`;
      }else{
          delete config.headers["Authorization"]
      }
    return config;
}
