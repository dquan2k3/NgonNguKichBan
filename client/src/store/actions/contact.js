import { apiLoadContact, apiReadContact } from '../../services/contact'

export const loadContact = (page) => async () =>{
    const data = await apiLoadContact({page})
    return data
}


export const readContact = (_id) => async () =>{
    const data = await apiReadContact({_id})
    return data
}
