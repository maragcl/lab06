import express from 'express';
import bodyParser from 'body-parser';

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


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.jsonParser = bodyParser.json();
        this.routes();
    }

    routes(){

        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        
        this.app.get('/', (req,res)=>{
            res.send("Esta es la ruta inicial porfavor ingrese a api/persons para la correcta visualizacion.");
        })

        this.app.get('/api/persons', (req,res)=>{
            res.json(persons);
        })

        this.app.get('/info', (req,res)=>{
            var datetime = new Date();
            console.log(datetime);
            res.send(`Phoneboook has info for  ${persons.length} people <br/> ${datetime}`)
        })

        this.app.get('/api/persons/:id', (req,res)=>{

            const id = req.params.id;
            const person = persons.filter(person => person.id == id)
            if(person.length>0){
                res.json(person);
            }else{
                res.sendStatus( 404 );
            }                        
        })

        this.app.delete('/api/persons/:id', (req,res)=>{

            const id = req.params.id;
            const people = persons.filter(person => person.id != id)
            res.json(people);
                                        
        })

        this.app.post('/api/persons', (req,res)=>{
            const {name, number } = req.body;
            const id = getRandomArbitrary(1,100);

            if(name === undefined || number === undefined){
                return res.status(400).json({
                    error:`Se debe ingresar un nombre y número de contacto`
                })
            }

            const resultado = persons.find( persona => persona.name === name );
            if(resultado){
                return res.status(400).json({
                    error:`El nombre ${name} ya se encuentra registrado`
                })
            }
            const newPerson = {
                id,
                name,
                number
            }
            res.json({
                msg: "Acoplacion exitosa",
                id,
                name, 
                number
            })

            persons.push(newPerson);
        })


    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("El servidor se encuentra corriendo en el puerto: ", this.port);
        });
    }

}

export default Server;