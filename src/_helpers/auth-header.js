
export function authHeader() {

  let user = {
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBfaWQiOiJuZXd1c2VyNzciLCJ1c2VySWQiOiI1ZmRlMDA0ZGNjZTYyNTZlMjg0MmVlMDYiLCJjb21wYW55SWQiOiI1ZmRiMTcyNDEwMTJjNzZiM2JhYTA3NTMiLCJyb2xlIjoiRU1QIiwiY2h1bmsiOjEsImlzQWRtaW4iOmZhbHNlLCJlbWFpbCI6Im5ld3VzZXI3N0BtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTYxMTkwNjMwMCwiZXhwIjoxNjI0ODY2MzAwfQ.D4-45FtLlWasvXYFBS4wzcNVwqaQ9cOqsgwBDkB79pg"
    }
    // //console.log('userToken:------- c///-------------->>> ',user)

    if (user && user.token) {
      // //console.log('only token:------- c///-------------->>> ',user.token)
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}