import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,HStack,VStack, ScrollView,Input,Center,Button,Icon} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {useState,useEffect} from 'react';
import { Select } from "native-base";
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc  } from "firebase/firestore";
import{getAuth, signInWithEmailAndPassword,onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import { set } from 'react-native-reanimated';

export default function FuncregisterUser({ navigation }){
    const[getName,setName] = useState("");
    const[getSurname,setSurname] = useState("");
    const[getPesel,setPesel] = useState("");
    const[getEmail,setEmail] = useState("");
    const[getClientNumber,setClientNumber] = useState("");
    const[getPassword,setPassword] = useState("");
    const[getPin,setPin] = useState("");
    const[isValid, setIsValid] = useState(false);


    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);


    const handlePasswordChange = (value) => {
        setPassword(value);
        setIsValid(passwordRegex.test(value));
    };
    const handleClientNumberChange = (value) => {
        setClientNumber(value);
        setIsValid(value.length === 8);
    };
    const handlePinChange = (value) => {
        setPin(value);
        setIsValid(value.length === 4);
    };
    const handlePeselChange = (value) => {
        setPesel(value);
        setIsValid(value.length === 11);
    };
    const handleEmailChange = (value) => {
        setEmail(value);
        setIsValid(emailRegex.test(value));
    };

    function addUser(){
        
        getDoc(doc(db, "users",getEmail)).then(response=>{
            //updateDoc(doc(db, "accounts", recipentAccountNumber),{
              //money: parseInt(recipentResponse.data().money)+parseInt(transferAmount),
            //})
            
            if(response.data()!=null)
            {
              if(response.data().accountNumber==getClientNumber)
              {
                console.log(response.data());
                console.log(response.id);
                updateDoc(doc(db, "users", getEmail),{
                    name: getName,
                    surname:getSurname,
                    pin:getPin,
                    pesel:getPesel,
                  })
                  navigation.navigate("login2");


                  createUserWithEmailAndPassword(auth,getEmail, getPassword)
                  .then(() => {
                    
      
                      console.log('User account created & signed in!');
                      navigation.navigate("login2");
                  })
                  .catch(error => {
                      if (error.code === 'auth/email-already-in-use') {
                      console.log('That email address is already in use!');
                      }
      
                      if (error.code === 'auth/invalid-email') {
                      console.log('That email address is invalid!');
                      }
      
                      console.error(error);
                  });
                  
              }else{
                console.log("Nie poprawny numer konta");
              }
            }
            else{
                console.log("Uzytkownik nie istnieje");
            }
            
        }).catch(error=>{
            console.log("error");
        })



        
    }


  
    return (
        <View style={styles.container}>
        <NativeBaseProvider>
            <ImageBackground 
              source={require('../assets/euro.jpg')} 
              style={styles.image}>
            <View style={styles.backElement}>
            <Text style={styles.header}>Dołącz do nas</Text>
               <ScrollView style={styles.scrol}>
                    <VStack space={2}>
                    <View>
                        <Text style={styles.label}>Imie:</Text>
                        <Input variant="filled" size="2xl" placeholder="Imie" value={getName} onChangeText={value => setName(value)}/>

                    </View>
                    <View>
                        <Text style={styles.label}>Nazwisko:</Text>
                        <Input variant="filled" size="2xl" placeholder="Nazwisko" value={getSurname} onChangeText={value => setSurname(value)}/>

                    </View>
                    <View>
                        <Text style={styles.label}>Pesel:</Text>
                        <Input variant="filled" size="2xl" placeholder="Pesel" keyboardType = 'number-pad' value={getPesel} onChangeText={handlePeselChange} error={!isValid} errorText="Numer Pesel musi składać się z 11 cyfr."/>

                    </View>
                    <View>
                        <Text style={styles.label}>Email:</Text>
                        <Input variant="filled" size="2xl" placeholder="Email" value={getEmail} onChangeText={handleEmailChange} error={!isValid} errorText="Niepoprawny format email."/>

                    </View>
                    <View>
                        <Text style={styles.label}>Numer Klienta:</Text>
                        <Input variant="filled" size="2xl" placeholder="Numer Klienta" keyboardType = 'number-pad' value={getClientNumber} onChangeText={handleClientNumberChange} error={!isValid} errorText="Numer Klienta musi składać się z 8 cyfr."/>

                    </View>
                    <View>
                        <Text style={styles.label}>Hasło:</Text>
                        <Input variant="filled" size="2xl" placeholder="Hasło" secureTextEntry={true} value={getPassword} onChangeText={handlePasswordChange} error={!isValid} errorText="Hasło musi zawierać przynajmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny. Minimalna długość to 8 znaków."/>

                    </View>
                    <View>
                        <Text style={styles.label}>Pin:</Text>
                        <Input variant="filled" size="2xl" placeholder="Pin" keyboardType = 'number-pad' value={getPin} onChangeText={handlePinChange} error={!isValid} errorText="Numer Pin musi składać się z 4 cyfr."/>

                    </View>
                    <Center>
                    <TouchableOpacity onPress={() => addUser()} style={styles.buttonOrange}>
                        <Text style={styles.buttonOrangeText}>Zarejestruj</Text>
                    </TouchableOpacity>
                    </Center>
                    <TouchableOpacity onPress={()=>navigation.navigate("login2")} style={styles.buttonBlack}>
                          <Text style={styles.buttonBlackText}>Masz już konto? Zaloguj się.</Text>
                      </TouchableOpacity>
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
      marginTop: "3%",
      alignItems: "center",
      justifyContent: 'center'
    },
    buttonBlack:{
        padding: 20,
        width: "100%",
        marginTop: "1%",
        alignItems: "center",
        justifyContent: 'center'
      },
    buttonOrangeText:{
      color: "white",
      fontSize: 18
    },
    buttonBlackText:{
        color: "black",
        fontSize: 12
      },
    label:{
      color:"gray",
      fontWeight: "bold"
    }
  });