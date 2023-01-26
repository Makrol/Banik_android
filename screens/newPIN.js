import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Alert} from 'react-native';
import {NativeBaseProvider,Input, Center,VStack} from "native-base";
import { useState,useEffect } from 'react';
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc,addDoc  } from "firebase/firestore";
import{onAuthStateChanged} from "firebase/auth";

export default function NewPIN({ navigation }){
   
    const[getNewPin,setNewPin] = useState("");
    const[getOldPin,setOldPin] = useState("");
    const[userData,setUserData] = useState(-1);
    onAuthStateChanged(auth, (user) => {
        if (user) 
        {
          const docRef = doc(db,"users",user.email);
          getDoc(docRef).then(docSnap=>{
          if (docSnap.exists()) {
              setUserData(user.email);  
             
          }
          });  
        } 
        else {
          // User is signed out
          // ...
        }  
    
      });

    function changePin(){
        const docRef = doc(db,"users",userData);
        getDoc(docRef).then(docSnap=>{
        if (docSnap.exists()) {
            if(getOldPin == docSnap.data().pin)
            {
                updateDoc(doc(db, "users", userData),{
                    pin: getNewPin,
                  })
                navigation.popToTop();
                navigation.replace("DrawerRoot");
            }
            else{
                Alert.alert(
                    'Zmiana pinu',
                    'Podany stary pin jest nie poprawny',
                    [
                      {
                        text: 'Ok',
                      },
                    ],
                  );
            }
        }
        });
    }
    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                    <Center>
                        <Text style={styles.header}>Zmiana Pinu</Text>
                        <View style={styles.content}>
                            <VStack space={5}>
                                <Input variant="filled" size="2xl" placeholder="stary PIN" keyboardType = 'number-pad' value={getOldPin} onChangeText={text => {
                                    let cleanedText = text.replace(/[^0-9]/g, '');
                                    if(cleanedText.length > 4) return;
                                    setOldPin(cleanedText);}}/>
                                <Input variant="filled" size="2xl" placeholder="nowy PIN" keyboardType = 'number-pad' value={getNewPin} onChangeText={text => {
                                    let cleanedText = text.replace(/[^0-9]/g, '');
                                    if(cleanedText.length > 4) return;
                                    setNewPin(cleanedText);}}/>
                                <TouchableOpacity onPress={() => { changePin() }} style={styles.button} >
                                  <Text style={styles.buttonText}>Zapisz</Text>
                                </TouchableOpacity>
                            </VStack>
                        </View>
                    </Center>   
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
    content:{
      width: 300,
      marginTop: "10%"
    },
    header:{
      color: "#D45500",
      fontWeight: "bold",
      fontSize: 32,
      padding: "5%"
    },
    button:{
        backgroundColor: "#D45500",
        padding: 20,
        borderRadius: 38,
        width: "100%",
        marginTop: "8%",
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonIcon:{
      width:70,
      height:70
    },
    buttonText:{
      backgroundColor: "#D45500",
      color: "#ffffff",
      fontWeight: "bold",
      borderRadius: 40,
      width: "100%",
      textAlign: "center"
    },
    vstack:{
    
      width:"100%",
      alignItems: "center",
      height: 300,
      justifyContent: 'center',
  
    },
  });