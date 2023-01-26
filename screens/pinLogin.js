import { StatusBar } from 'expo-status-bar';
import { ImageBackground,StyleSheet, Image, View,TouchableOpacity,Alert  } from 'react-native';
import { Box, Center, NativeBaseProvider,Input,Stack,Text,ScrollView } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {buttonStyle} from '../shered/Styles.js';
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc, setDoc,getDoc  } from "firebase/firestore";
import{getAuth, signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import {useState} from 'react';

export default function PinLogin({ navigation }){
    const [pin,setPin] = useState('');
    const [userData,setUserData] = useState("");
    onAuthStateChanged(auth, (user) => {
        if(user)
        {
            setUserData(user.email);
        }
       
    });
    
    const login = async ()=>{
        const docRef = doc(db,"users",userData);
        getDoc(docRef).then(docSnap=>{
        if (docSnap.exists()) {
            if(docSnap.data().pin==pin)
            {
              navigation.popToTop();
              navigation.replace('DrawerRoot');
            }
            else{
                Alert.alert(
                    'Logowanie',
                    'Nie poprawny PIN',
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
                        
                      <Center>
                        <Image
                            source={require('../assets/banklogo.png')}
                            style={styles.logo}>
                        </Image>
                        
                      </Center>
                      
                      <View style={styles.backElement}>
                      <Text style={styles.header}>Szybkie logowanie</Text>
                      
                        <Stack space={3} w="75%" maxW="350px" mx="auto" style={styles.vstack}>
                        <ScrollView style={styles.scrol}>
                            
                            <Center style={styles.pinInput}>
                            <Input variant="filled" size="2xl" secureTextEntry={true} placeholder="PIN" keyboardType = 'number-pad' value={pin} onChangeText={text => {
                                    let cleanedText = text.replace(/[^0-9]/g, '');
                                    if(cleanedText.length > 4) return;
                                    setPin(cleanedText);}}/>

                              <TouchableOpacity onPress={()=>login()}  style={styles.buttonOrange}  >
                              
                                <Text style={buttonStyle.buttonOrangeText}>Zaloguj</Text>
                              </TouchableOpacity>
                            </Center>
                            </ScrollView>
                        </Stack>
                       
                      </View>

                    </ImageBackground>
                    
                </NativeBaseProvider>
              </View>
              
      );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  image: {
    
      width: '100%',
      height: '100%'
  },
  logo:{
    width: 150,
    height: 150,
    marginTop: "15%",
    marginBottom: "15%",

  },
  backElement:{
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: "40%",
    height: "60%",
    borderTopLeftRadius: 38,
    borderTopRightRadius:38,
    position: "absolute",
    bottom: 0
  },
  vstack:{

    width:"100%",
    height: "100%",
    justifyContent: 'center'
  },
  header:{
    alignSelf: 'center',
    color: "#D45500",
    fontWeight: "bold",
    fontSize: 32,
    padding: "7%",
    marginTop: 15,
  },
  pinInput:{
   // marginTop: "10%",
    //marginBottom: "10%"
  },
  scrol:{
    width:"100%"
  },
});