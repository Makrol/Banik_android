
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,HStack,VStack, ScrollView,Input,Center,Button,Icon} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {useState,useEffect} from 'react';
import { Select } from "native-base";
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc,firestore  } from "firebase/firestore";
import{getAuth, signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { set } from 'react-native-reanimated';



export default function TransferForm({ navigation }){

  const [userData,setUserData] = useState(-1);
  const [accountList,setAccountList] = useState([]);
  class User{
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
  const userConverter={
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
  onAuthStateChanged(auth, (user) => {
    
    if (user) 
    {
      const docRef = doc(db,"users",user.email).withConverter(userConverter);
      getDoc(docRef).then(docSnap=>{
      if (docSnap.exists()) {
          setUserData(docSnap.data().accountNumber);  
      }
      });  
    } 
    else {
      // User is signed out
      // ...
    }  

  });

  useEffect(()=>{
    const q = query(collection(db,"accounts"),where("owner","==",userData));
    getDocs(q).then(querySnapshot=>{
        const tmpTab = [];
        querySnapshot.forEach((doc) => {
              tmpTab.push(doc.id); 
        });
        setAccountList(tmpTab);
    });
          
  },[userData])

  function doTransfer(){

                getDoc(doc(db, "accounts",accountNumber)).then(response=>{
                  if(response.data().money>transferAmount)
                  {
                    updateDoc(doc(db, "accounts", accountNumber),{
                      money: response.data().money-transferAmount,
                    })

                    getDoc(doc(db, "accounts",recipentAccountNumber)).then(recipentResponse=>{
                      updateDoc(doc(db, "accounts", recipentAccountNumber),{
                        money: parseInt(recipentResponse.data().money)+parseInt(transferAmount),
                      })
                    })
                    
                  }
                })



                /*
    console.log("dziala");
    const q = query(collection(db,"accounts"),where("owner","==",userData));
    getDocs(q).then(querySnapshot=>{
        querySnapshot.forEach((doc) => {
              if(doc.id==accountNumber)
              {
                console.log(doc.id);
               
                /*db.collection("accounts").doc("0000000000000001").update({
                  money: 0
                })
                updateDoc(doc(db,"accounts","0000000000000001"),{
                  name: "testtest",
                }).then(()=>{
                  console.log("ok");
                }).catch((error)=>{
                  console.log(error);
                });;
                
                if(transferAmount<=doc.data().money)
                {
                 
                  console.log(doc.data().money);
                  
                    
                
                }
                
              }
        });
        
    });*/
  }
 
//const[email,setEmail] = useState(" ");
const[accountNumber,setAccountNumber] = useState("");
const[recipentName,setRecipentName] = useState("");
const[recipentAccountNumber,setRecipentAccountNumber] = useState("");
const[transferAmount,setTransferAmount] = useState("");
const[transferTitle,setTransferTitle] = useState("");

//<Input variant="filled" placeholder="login" value={email} onChangeText={text=>setEmail(text)}/>

    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                    <Text style={styles.header}>Przelew krajowy</Text>
                       <ScrollView style={styles.scrol}>
                            <VStack space={5}>
                            <View>
                                <Text style={styles.label}>Z rachunku:</Text>
                                <Select variant="filled" size="2xl" placeholder="Numer klienta" onValueChange={value => setAccountNumber(value)}>
                           
                               
                                  {accountList.map((item, index) => {
                    
                                    return <Select.Item label={item} value={item} key={item} />
                                  })}
                               
                                </Select>
                            </View>
                            <View>
                                <Text style={styles.label}>Do odbiorcy:</Text>
                                <Input variant="filled" size="2xl" placeholder="Nazwa odbiorcy" value={recipentName} onChangeText={text=>setRecipentName(text)}/>

                            </View>
                            <View>
                                <Text style={styles.label}>Na rachunek:</Text>
                                <Input variant="filled" size="2xl" placeholder="Numer rachunku odbiorcy" keyboardType="numeric" value={recipentAccountNumber} onChangeText={(text) => {setRecipentAccountNumber(text.replace(/[^0-9]/g, ''));}} />
                            </View>
                            <View>
                                <Text style={styles.label}>Kwota:</Text>
                                
                                <Input variant="filled" size="2xl" placeholder="Kwota do przelewu" keyboardType = 'number-pad' value={transferAmount} onChangeText={text=>setTransferAmount(text.replace(/[^0-9]/g, ''))}/>

                            </View>
                            <View>
                                <Text style={styles.label}>Tytuł:</Text>
                                <Input variant="filled" size="2xl" placeholder="Tytuł przelewu" value={transferTitle} onChangeText={text=>setTransferTitle(text)}/>

                            </View>
                            <Center>
                              <TouchableOpacity onPress={() => { doTransfer() }} style={styles.buttonOrange} >
                                  <Text style={styles.buttonOrangeText}>Przelej</Text>
                              </TouchableOpacity>
                            </Center>
                            </VStack>
                       </ScrollView>
                    </View>
                    </ImageBackground>  
                </NativeBaseProvider>
              </View>
              
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
      width: '100%',
      height: '100%'
  },
  backElement:{
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: "40%",
    height: "90%",
    borderTopLeftRadius: 38,
    borderTopRightRadius:38,
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    
  },
  header:{
    color: "#D45500",
    fontWeight: "bold",
    fontSize: 32,
    padding: "5%"
  },
  scrol:{
    width:"90%"
  },
  buttonOrange:{
    backgroundColor: "#D45500",
    padding: 20,
    borderRadius: 38,
    width: "80%",
    marginTop: "8%",
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonOrangeText:{
    color: "white",
    fontSize: 18
  },
  label:{
    color:"gray",
    fontWeight: "bold"
  }
});