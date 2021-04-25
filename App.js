const persons =[
    {
        id:1,
        name:"Arto Hellas",
        number:"040-123456"
    },
    {
        id:2,
        name:"Ada Lovelace",
        number:"39-44-5323523"
    },
    {
        id:3,
        name:"Dan Abramov",
        number: "12-43-234345"
    },
    {
        id:4,
        name:"Mary Poppendick",
        number:"39-23-6423122"
    }
]

const http = require('http');

http.createServer( (req, res )=>{

    res.writeHead(200, {'Content-Type' : 'application/json'})
    

    
    res.write(JSON.stringify(persons));
    res.end();
})
.listen( 3001 );

console.log("Escuchando el puerto", 3001);