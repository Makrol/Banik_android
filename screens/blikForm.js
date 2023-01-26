
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image,Alert} from 'react-native';
import {NativeBaseProvider,HStack,VStack, ScrollView,Input,Center,Button,Icon} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {useState,useEffect} from 'react';
import { Select } from "native-base";
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc,addDoc  } from "firebase/firestore";
import{onAuthStateChanged} from "firebase/auth";



export default function BlikForm({route, navigation }){
    const[accountNumber,setAccountNumber] = useState("");
    const[recipentName,setRecipentName] = useState("");
    const[recipentPhoneNumber,setRecipentPhoneNumber] = useState("");
    const[transferAmount,setTransferAmount] = useState("");
    const[transferTitle,setTransferTitle] = useState("");
    const [accountList,setAccountList] = useState([]);
    const [userData,setUserData] = useState(-1);
    const [userEmail,setUserEmail] = useState("");
    const [userLimit, setUserLimit] = useState(0);
    let sum = 0;
    
    
    
    onAuthStateChanged(auth, (user) => {
      if (user) 
      {
        const docRef = doc(db,"users",user.email);
        getDoc(docRef).then(docSnap=>{
        if (docSnap.exists()) {
            setUserData(docSnap.data().accountNumber);  
            setUserEmail(user.email);
            setUserLimit(docSnap.data().transferLimit);
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

    function dataBaseTransfer(){
      getDoc(doc(db, "accounts",accountNumber)).then(response=>{
        if(response.data().money>transferAmount)
        {
          if((sum+Number(transferAmount))>userLimit)
          {
            Alert.alert(
              'Przelew',
              'Transakcja nieudana! Przekroczono limit',
              [
                {
                  text: 'Ok',
                },
              ],
            );
            return;
          }

          
          getDocs(query(collection(db,"users"),where("phoneNumber","==",recipentPhoneNumber))).then(querySnapshot=>{
            if(querySnapshot!=null)
            {
              
              let accNum=-1;
              querySnapshot.forEach((doc) => {
                accNum=doc.data().accountNumber;
              });
              if(accNum == -1)
              {
                Alert.alert(
                  'Przelew',
                  'Podany numer telefonu nie istnieje',
                  [
                    {
                      text: 'Ok',
                    },
                  ],
                );
                return;
              }
              getDoc(doc(db, "mainAccount",accNum)).then(accountResponse=>{
              
                getDoc(doc(db, "accounts",accountResponse.data().main)).then(recipentResponse=>{
                  if(recipentResponse.exists())
                  {
                    updateDoc(doc(db, "accounts", accountNumber),{
                      money: response.data().money-transferAmount,
                    })
                    updateDoc(doc(db, "accounts", accountResponse.data().main),{
                      money: parseInt(recipentResponse.data().money)+parseInt(transferAmount),
                    })
                      getDoc(doc(db,"users",userEmail)).then(docSnap=>{
                      if (docSnap.exists()) {
                          const docRef = addDoc(collection(db, "transfers"), {
                            amount: Number(transferAmount),
                            fromAccount: accountNumber,
                            toAccount: accNum,
                            toName: recipentName,
                            operationDate: new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }),                       
                            postingDate: new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }),
                            type: "Przelew Blik",
                            title: transferTitle,
                            fromName: docSnap.data().name + " "+ docSnap.data().surname
                          });
      
                      }
                      });  
                     
                    
      
                    
                    navigation.popToTop();
                    navigation.replace('DrawerRoot');
                  }
                  else{
                    Alert.alert(
                      'Przelew',
                      'Numer konta odbiorcy nie istnieje',
                      [
                        {
                          text: 'Ok',
                        },
                      ],
                    );
                  }
                })
              })
            }
          });

        }
        else{
          Alert.alert(
            'Przelew',
            'Za mało pieniędzy aby zrealizować przelew',
            [
              {
                text: 'Ok',
              },
            ],
          );
        }
      })
  }
  function doTransfer(){



    if(accountNumber==""||recipentName==""|| recipentName==""|| recipentPhoneNumber==""|| transferAmount==""|| transferTitle=="")
    {
      Alert.alert(
        'Przelew',
        'Nie wszystkie pola zostały wypełnione',
        [
          {
            text: 'Ok',
          },
        ],
      );
      return;
    }
    
 
    const q = query(collection(db,"transfers"),where("fromAccount","==",accountNumber));
    getDocs(q).then(querySnapshot=>{
        querySnapshot.forEach((doc) => {
          if(doc.data().operationDate==new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })){
              sum += doc.data().amount;
            }
        });
        dataBaseTransfer();
    });
  }
    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                    <Text style={styles.header}>Przelew Blik na telefon</Text>
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
                                <Input variant="filled" size="2xl" placeholder="Nazwa odbiorcy" value={recipentName} onChangeText={(text) => {setRecipentName(text)}} />

                            </View>
                            <View>
                                <Text style={styles.label}>Numer telefonu:</Text>
                                <Input variant="filled" size="2xl" placeholder="Numer telefonu odbiorcy" keyboardType = 'number-pad' value={recipentPhoneNumber} onChangeText={text => {
                                    let cleanedText = text.replace(/[^0-9]/g, '');
                                    if(cleanedText.length > 9) return;
                                    if(cleanedText.length === 1 && cleanedText === "0") return;
                                    setRecipentPhoneNumber(cleanedText);}}/>

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
                              <TouchableOpacity onPress={() =>{doTransfer()}} style={styles.buttonOrange} >
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