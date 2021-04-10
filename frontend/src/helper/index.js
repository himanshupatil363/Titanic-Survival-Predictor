import {API} from "../backend";

export const send = info =>{
    return fetch(`${API}/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(info)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
};