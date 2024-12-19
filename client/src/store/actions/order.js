import { apiDone, apiLoadOrder } from '../../services/order'

export const loadOrder = (page, user) => async () =>{
    const data = await apiLoadOrder({page, user})
    return data
}

export const done = (_id) => async () =>{
    const data = await apiDone({_id})
    return data
}

