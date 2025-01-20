import axios from 'axios';



const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API,
    // withCredentials: true,
})
const UsePublic = () => {

    return axiosPublic
};

export default UsePublic;