import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,HStack,Input,VStack, Center, ScrollView} from "native-base";
import {useEffect, useState} from 'react';
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc,addDoc  } from "firebase/firestore";
import{onAuthStateChanged} from "firebase/auth";


export default function Limit({ navigation }){
    const[getDailyWithdrawalLimit,setDailyWithdrawalLimit] = useState(0);
    const[getDailyLimit,setDailyLimit] = useState(0);
    const [userData,setUserData] = useState(-1);
    function changeLimits(){

      updateDoc(doc(db, "users", userData),{
        cardLimit: Number(getDailyWithdrawalLimit),
        transferLimit: Number(getDailyLimit),
      })
      navigation.replace('DrawerRoot');
    }
    onAuthStateChanged(auth, (user) => {
      if (user) 
      {
        setUserData(user.email);
        
      } 
      else {
        // User is signed out
        // ...
      }  
  
    });
    useEffect(()=>{
      if(userData!=-1)
      {
       
        const docRef = doc(db,"users",userData);
        getDoc(docRef).then(docSnap=>{
        if (docSnap.exists()) {
            setDailyWithdrawalLimit(docSnap.data().cardLimit);
            setDailyLimit(docSnap.data().transferLimit);
        }
        });  
      }
    },[userData])


    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                    
                    <VStack space={3} style={styles.vstack}>
                    
                    <Center><Text style={styles.header}>Limity</Text></Center>
                    <ScrollView>
                        <Text style={styles.limitText}>Dzienny limit wypłat kartą:</Text>
                        <Input variant="filled" size="2xl" placeholder="Wprowadź nowy limit" keyboardType = 'number-pad' value={getDailyWithdrawalLimit.toString()} onChangeText={value => setDailyWithdrawalLimit(value)}
                        onBlur={() => {
                          if (getDailyWithdrawalLimit === '') {
                            setDailyWithdrawalLimit('0');
                          }
                        }}/>
                        
                        <Text style={styles.limitText}>Dzienny limit płatności:</Text>
                        <Input variant="filled" size="2xl" placeholder="Wprowadź nowy limit" keyboardType = 'number-pad' value={getDailyLimit.toString()} onChangeText={value => setDailyLimit(value)}
                        onBlur={() => {
                          if (getDailyLimit === '') {
                            setDailyLimit('0');
                          }
                        }}/>
                        
                        <Center><TouchableOpacity onPress={() => changeLimits()} style={styles.buttonOrange}>
                        <Text style={styles.buttonOrangeText}>Zmień</Text>
                        </TouchableOpacity>
                        </Center>
                        </ScrollView>
                    </VStack>
                    
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
  buttonOrangeText:{
      color: "white",
      
  },
  buttonOrange:{
    backgroundColor: "#D45500",
    padding: 20,
    borderRadius: 38,
    width: "60%",
    marginTop: "5%",
    alignItems: "center",
    justifyContent: 'center'
  },
  backElement:{
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: "60%",
    height: "90%",
    borderTopLeftRadius: 38,
    borderTopRightRadius:38,
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    
  },
  content:{

    marginTop: "10%"
  },
  header:{
    color: "#D45500",
    fontWeight: "bold",
    fontSize: 32,
    padding: "5%",
    alignItems: "center",
    justifyContent: 'center'
  },
  button:{
    backgroundColor: "#D45500",
    height: 110,
    width:110,
    borderRadius: 90,
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
    width: 110,
    textAlign: "center"
  },
  vstack:{
    width:"90%", 
    marginTop:"5%",
    height: '70%',
  },
  limits:{
    color: "black",
    fontSize: 18,
    padding: "1%",
    textAlign: 'left',
    width: "90%",
  },
  limitText:{
    color: "black",
    fontSize: 16,
    padding: "1%",
    
  },

});