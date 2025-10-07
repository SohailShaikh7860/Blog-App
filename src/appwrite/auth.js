import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    hasSessionCookie() {
        // Appwrite sets a cookie like: a_session_${projectId}
        // Avoid network call (and 401 log) when clearly no session exists
        const cookieKey = `a_session_${conf.appwriteProjectId}`;
        return typeof document !== "undefined" && document.cookie.includes(cookieKey);
    }

    async createAccount({email, password, name}){
        try {
          const userAccount =  await this.account.create(ID.unique(), email, password, name);

          if(userAccount){
            return this.login({email,password});
          }else{
            return userAccount;
          }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        if (!this.hasSessionCookie()) {
            return null;
        }
        try {
          return await this.account.get();
        } catch (error) {
            
            if (error && (error.code === 401 || error.status === 401)) {
                return null;
            }
            throw error;
        }

        return null;
    }

    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService