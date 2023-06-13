import { validateSync } from "class-validator";
import { BlogModel } from "../models/blog.model";
import { BlogIdDTO, CreatBlogDTO } from "../dto/blog.dto";
import { IBlog } from "../types/blog.type";
import { FindDoc } from "../types/public.type";
import { errorhandler } from "../utils/ApiErrorHandller";


export class BlogService{
  async Creat(blogdto : CreatBlogDTO) : Promise<IBlog>{ 
        const errors = validateSync(blogdto);
        const errorcheck = errorhandler(errors);
        if(errorcheck.length > 0) throw {status : 400 ,errors : errorcheck , message : "validation  error"};
        const blog : IBlog = await new BlogModel(blogdto);
        return blog
      };
    async FetchAll() : Promise<IBlog[]>{
      const blogs : IBlog[] = await BlogModel.find({});
      return blogs
    }
    async FetchById(blogid : BlogIdDTO) : Promise<FindDoc<IBlog>>{
      const blog_id :FindDoc<IBlog> = await BlogModel.findById(blogid.id);
      if(!blog_id) throw {status : 404 , message : "not fund blog"}
      return blog_id

    }
    async RemoveById(blogid : BlogIdDTO): Promise<string> {
    const blog : FindDoc<IBlog> = await this.FetchById(blogid);
    const delete_result : any = await BlogModel.deleteOne({_id : blogid.id});
    if(delete_result.deletedCount > 0)return "delete blog succesfuly";
    return "cant remove blog "
  }
                                                                                   
}