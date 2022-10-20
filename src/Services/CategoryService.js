import axios from "axios"
import { apibaseUrl, getCategoryListApi } from "../Helpers/ApiUrlHelper"

export const GetCategoryListService= async ()=>{
    return await axios.get(apibaseUrl+ getCategoryListApi);
}