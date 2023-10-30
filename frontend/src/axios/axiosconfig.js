import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance=axios.create(
    {
        baseURL:"https://groomup.shop/",
        headers:{
            'Content-Type':'application/json',
            //Authorization:Cookies.get("accessToken-C")? `Bearer ${JSON.parse(Cookies.get("accessToken-C"))}`  :null,
            accept:'application/json'
        }
    }
)

export default axiosInstance      