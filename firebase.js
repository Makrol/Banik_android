import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABUxtzt9J6OkxFHZp--CWvHAPHBWwsrTI",
    authDomain: "bank-1163a.firebaseapp.com",
    projectId: "bank-1163a",
    storageBucket: "bank-1163a.appspot.com",
    messagingSenderId: "385025165558",
    appId: "1:385025165558:web:a9cc2508d7f66162ec04d7",
    measurementId: "G-L31CVQGFDW"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export class User{
  constructor(accountNumber,name,pin,surname){
    this.accountNumber = accountNumber;
    this.name = name;
    this.pin = pin;
    this.surname=surname;
  }
  getAccountNumber(){
    return this.accountNumber;
  }
}
export const userConverter={
  toFirestore:(user)=>{
      return{
        accountNumber: user.accountNumber,
        name: user.name,
        pin: user.pin,
        surname: user.surname
      };
  },
  fromFirestore:(snapshot,options)=>{
    const data = snapshot.data(options);
    return new User(data.accountNumber,data.name,data.pin,data.surname);
  }
}