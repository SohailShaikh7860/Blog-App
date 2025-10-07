import conf from "../conf/conf"
import { Client, Databases,Storage,Query, ID } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
         this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    async createPost({title,slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBase,
                conf.appwriteCollection,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async update(slug,{title, content, featuredImage, status}){
         try {
            return await this.databases.updateDocument(
                conf.appwriteDataBase,
                conf.appwriteCollection,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
         } catch (error) {
            throw error
         }
    }

    async deleteDoc(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDataBase,
                conf.appwriteCollection,
                slug,
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDataBase,
                conf.appwriteCollection,
                slug,
            )
        } catch (error) {
            throw error
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBase,
                conf.appwriteCollection,
                queries,
                
            )
        } catch (error) {
           throw error  
        }
    }

    //upload file 
    async uplodFile(file){
        try {
          return await this.bucket.createFile(
            conf.appwriteBucket,
            ID.unique(),
            file,
          )
        } catch (error) {
            throw error
            return false
        }
    }

    async deleteFile(fileId){
       try {
        return await this.bucket.deleteFile(
            conf.appwriteBucket,
            fileId
        )
        return true
       } catch (error) {
        throw error
        return false
       }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucket,
            fileId
        )
    }
}

const service = new Service();
export default Service