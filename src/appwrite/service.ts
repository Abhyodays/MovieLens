import {ID,Account, Client, OAuthProvider} from 'appwrite'
import Snackbar from 'react-native-snackbar';

type CreateAccountUser = {
    name:string,
    email:string, 
    password:string
}
type loginAccountUser = {
    email:string,
    password:string
}
const appwriteClient = new Client();
class AppwriteService{
    account;
    constructor(){
        appwriteClient
        .setEndpoint(process.env.APPWRITE_ENDPOINT!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)
        this.account = new Account(appwriteClient)
    }

    async login({email,password}:loginAccountUser){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Service :: LoginAccount() :: ",error);
        }
    }

    async createAccount({name, email, password}:CreateAccountUser){
        try{
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if(userAccount){
                await this.login({email, password});
            }else{
            return userAccount;
            }
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Serive :: CreateAccount() :: ",error);
        }
    }

    async getUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("Appwrite Serive :: GetUserAccount() :: ",error);
        }
    }

    async logout(){
        try{
            return this.account.deleteSession('current');
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Serive :: LogoutUserAccount() :: ",error);
        }
    }

    async loginWithGoogle(){
        try{
           return await this.account.createOAuth2Session(OAuthProvider.Google)
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Serive :: LoginWithGoogle() :: ",error);
        }
    }

    
}

export default AppwriteService;