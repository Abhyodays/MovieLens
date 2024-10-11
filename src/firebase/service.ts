import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import {GoogleSignin} from '@react-native-google-signin/google-signin'

type CreateAccountUser = {
    name:string,
    email:string,
    password:string
}

type LoginUserAccount = {
    email:string,
    password:string
}


class FirebaseService{
    account;
    constructor(){
        this.account = auth();
        GoogleSignin.configure({
            webClientId:process.env.FIREBASE_WEB_CLIENT_ID
        })
    }
    async createAccount({name, email, password}:CreateAccountUser){
        try{
            const userAccount = await this.account.createUserWithEmailAndPassword(email,password)
            const user = userAccount.user;
            await user.updateProfile({displayName:name});
            return user;
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Firebase Service :: CreateAccount() :: ",error);
        }
    }

    async getUser(){
        try{
            return this.account.currentUser;
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Firebase Service :: getUserAccount() :: ",error);
        }
    }

    async logout(){
        try{
            return await this.account.signOut()
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Firebase Service :: getUserAccount() :: ",error);
        }
    }

    async login({email, password}:LoginUserAccount){
        try{
            const userAccount = await this.account.signInWithEmailAndPassword(email,password);
            return userAccount.user;
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Firebase Service :: LoginAccount() :: ",error);
        }
    }

    async loginWithGoogle(){
        try{
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { data} = await GoogleSignin.signIn();
            if(data){
                const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
                return auth().signInWithCredential(googleCredential);
            }
            return data;
        }catch(error){
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log("Firebase Service :: LoginAccountWithGoogle() :: ",error);
        }
    }

    
}

export default FirebaseService;