import { commonrequest } from "./apiCall";
import {BASE_URL} from "./helper"

export const gettickets = async(status,sort)=>{
    return await commonrequest("GET",`${BASE_URL}/api/v1/ticket/ticket-filters?&status=${status}&sort=${sort}`,"");
}

export const statuschange = async(ticketId,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/api/v1/ticket/ticket-status/${ticketId}`,{data})
}
