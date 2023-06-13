import { BlogService } from "../services/blog.service";
import{Post, Controller , Get , Delete, ClassMiddleware}from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { BlogIdDTO, CreatBlogDTO } from "../dto/blog.dto";
import { plainToClass } from "class-transformer";
import { FindDoc } from "../types/public.type";
import { IBlog } from "../types/blog.type";
import { auth_middleware } from "../middlewares/auth.middleware";


@Controller("Blog")
@ClassMiddleware(auth_middleware)
export class BlogController {
    private blogservice : BlogService = new BlogService();
    @Post()
    async CreatBlog(req : Request , res : Response ,  next : NextFunction ){
        try {
            const blogdto : CreatBlogDTO = plainToClass(CreatBlogDTO , req.body)
            const Blogs : IBlog = await this.blogservice.Creat(blogdto);
            
            return res.status(201).json({
                statuscode : 201,
                message : "created" ,
                data : {Blogs}
            });
            
        } catch (error) {
            next(error)
        }
    };
    @Get()
    async GetAllBlog(req : Request , res : Response , next : NextFunction){
        try {
            const blogs : IBlog[] = await this.blogservice.FetchAll();
        res.status(200).json({
            
            status_code : 201 ,
            data : {
                blogs
            }
        }) 
        } catch (error) {
            next(error)
        }
    };
    @Get("find/:id")
    async GetById(req : Request , res : Response , next : NextFunction){
        try {
        const blogdto : BlogIdDTO =  plainToClass(BlogIdDTO , req.params)
        const blogs : FindDoc<IBlog> = await this.blogservice.FetchById(blogdto);
        res.status(200).json({
            
            status_code : 201 ,
            data : {
                blogs
            }
        }) 
        } catch (error) {
            next(error)
        }
    };
    @Delete("delete/:id")
    async RemoveById(req : Request , res : Response , next : NextFunction){
        try {
            const blogdto : BlogIdDTO =  plainToClass(BlogIdDTO , req.params)
            const blogs : string = await this.blogservice.RemoveById(blogdto);
            res.status(200).json({
                
                status_code : 201 ,
                data : {
                    blogs
                }
            }) 
            } catch (error) {
                next(error)
            }
    }

}