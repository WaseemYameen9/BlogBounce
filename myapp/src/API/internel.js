import axios from 'axios'


const api = axios.create({
    baseURL: 'http://192.168.1.10:4000/user',
    headers: {
        "Content-Type": "application/json",
    }
})

export const sigup = async (data)=>
{
    let response;
    try{
        response = await api.post("/create",data)
    }
    catch(error){
        return error;
    }
    return response;
}

export async function LoginAPI(data)
{
    let response;
    try{
        response = await api.post('/login',data)
    }
    catch(error)
    {
        return(error)
    }
    return response;

}

export async function Logout()
{
    let response;
    try
    {
        response = await api.post('/logout')
    }
    catch(error)
    {
        return error;
    }
    return response;
}
