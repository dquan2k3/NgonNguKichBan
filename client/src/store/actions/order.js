import { apiDone, apiLoadOrder } from '../../services/order'

export const loadOrder = (page) => async () =>{
    const data = await apiLoadOrder({page})
    return data
}

export const done = (_id) => async () =>{
    const data = await apiDone({_id})
    return data
}

