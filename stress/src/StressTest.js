import axios from "axios"


setInterval(()=>{
    axios.post("http://localhost:2000/input/1c-student/", {
        
            "name":"Carlinhos maia",
            "firstNote": 9.0,
            "secondNote": 8.0,
            "thirdNote": 8.2,
            "fourthNote": 5.2,
            "cpf": "73624635401",
            "token": "eyJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI2MjcyZGJkZjlmMzc3OGU1ZGFjY2VmNWUiLCJuYW1lIjoibWF0ZXVzIGRvIHN1ZMOhcmlvIiwiY3BmIjoiMTIzNDU2Nzg5MDEiLCJwYXNzd29yZCI6IjZlOGE2MDZhNzk2MjljNzBhMWViNzJhYTliYjRhNDg4YTc3ZTkzYzQwYWIyZGY2Nzk5YTA4ZGMwOWRhM2RiODUiLCJfX3YiOjB9._Ged4Uci5pB1SLYn4qC0nhEnSjtcblp1nBZOxTtAPgcb7beebainMbMWuysIK0ru"
        
    }).then((res)=>{
        console.log(res.data)
    }).catch((err)=>{
        console.log(err)
    })
}, 100)


/*axios.get("http://localhost:2000/all/1b-students", {
    data: {
        "token": "eyJhbGciOiJIUzM4NCJ9.eyJfaWQiOiI2MjcyZGJkZjlmMzc3OGU1ZGFjY2VmNWUiLCJuYW1lIjoibWF0ZXVzIGRvIHN1ZMOhcmlvIiwiY3BmIjoiMTIzNDU2Nzg5MDEiLCJwYXNzd29yZCI6IjZlOGE2MDZhNzk2MjljNzBhMWViNzJhYTliYjRhNDg4YTc3ZTkzYzQwYWIyZGY2Nzk5YTA4ZGMwOWRhM2RiODUiLCJfX3YiOjB9._Ged4Uci5pB1SLYn4qC0nhEnSjtcblp1nBZOxTtAPgcb7beebainMbMWuysIK0ru"
    }
}).then((response) => {
    console.log(response.data)
}).catch((err) => {
    console.log(err)
})*/