import { Server } from "@overnightjs/core";
import * as http from "http";
import express from "express";
import cors from "cors"
import { ApiErrorHandller, NotFoundErrorHandller } from "./utils/ApiErrorHandller";
import {BlogController} from "./controller/blog.controller"
import "./utils/MongoDBConection"
import { AuthController } from "./controller/auth.controller";
export class SetupServer extends Server {
    private server? : http.Server;
    constructor(private port : number = 3500){
        super()
    };
    public init() : void{
        this.setupExpress();
        this.setupControllers();
        this.setupErrorHandler;

    };
    public setupExpress() : void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : true}));
        this.app.use(cors({origin : "*"}))

    };
    private setupControllers(){
        const controllers = [
            new BlogController(),
            new AuthController()
        ];
        super.addControllers(controllers)
        
    }
    public setupErrorHandler() : void{
        this.app.use(NotFoundErrorHandller)
        this.app.use(ApiErrorHandller)
    };
    public start() : void{
        this.server = http.createServer(this.app);
        this.server.listen(this.port , ()=>{
            console.log(`Server listen run on port : http://localhost:${this.port}`);
            
        })
    }

    
}