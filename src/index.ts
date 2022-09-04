import { createConnection } from "typeorm";
import entities from "./entity";
import resolvers from "./resolvers";
import { buildSchema } from "type-graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from 'cors'
import { User } from "./entity/User";
var jwt = require('jsonwebtoken');

const main = async () => {
    await createConnection({
        type : "postgres",
        url : 'postgresql://postgres:postgres@localhost:5433/budget',
        entities,
        synchronize : true,
        logging : true
    }).then(() => {
        console.log("Database connected")
    }).catch((e) => {
        console.log(e)
    })

    const schema = await buildSchema({resolvers})
    const server = new ApolloServer({
        schema,
        context :  async ( { req, res } : { req: express.Request, res: express.Response } ) => {
            let user;
            if(req.headers.cookie) {
              const token = req.headers.cookie.split("token=")[1];
              if(token){
                const decoded = await jwt.verify(token, 'secret');
                user = await User.find({where: {id: decoded.id}});
                user = user[0];
              }
            }
            return { req, res, user };
          },
    })

    await server.start()

    const app = express()
    app.use(cors({
        credentials: true,
        origin: ['http://locahost:3001', 'http://localhost:8000', 'https://studio.apollographql.com']
    }))

    server.applyMiddleware({app})

    app.listen(8000, () => console.log("Running on http://localhost:8000"))
}

main()