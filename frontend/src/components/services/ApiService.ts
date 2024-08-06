import axios from "axios"
export function getplayer(){
    return axios.get('http://localhost:8000/api/footinsights/')
       .then(response => response.data)
       .catch(error => console.log(error))
}

// export function addplayer(player)
