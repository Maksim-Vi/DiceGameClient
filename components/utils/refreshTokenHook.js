import { getUrl } from "../protocol/API/urlApi";
import { selectLoginUser, setToken } from "../redux/reducers/login/LoginReducer";
import { store } from "../redux/redux-store";

const useRefreshToken = async (username,password) =>{
    return await fetch(`${getUrl()}/refreshToken?username=${username}&password=${password}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        return json
    })
    .catch((err) => {
        console.log(`refresh token ERROR`, err);
    })
}

export const getRefreshToken = async () =>{
    const logedUser = selectLoginUser(store.getState())
    const data = await useRefreshToken(logedUser.username, logedUser.password)
    store.dispatch(setToken(data.newToken))
}

