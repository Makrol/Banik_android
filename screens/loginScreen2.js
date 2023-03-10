import { StatusBar } from 'expo-status-bar';
import { ImageBackground,StyleSheet, Image, View,TouchableOpacity,KeyboardAvoidingView,Alert  } from 'react-native';
import { Box, Center, NativeBaseProvider,Input,Stack,Text } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {buttonStyle} from '../shered/Styles.js';
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc, setDoc,getDoc  } from "firebase/firestore";
import{getAuth, signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import {useState} from 'react';

export default function Login2({ navigation }){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const login = async (email,password)=>{
      try {
        
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            userCredential.user;
            navigation.popToTop();
            navigation.replace('DrawerRoot');
          });
      } catch (err) {

        Alert.alert(
          'Logowanie',
          'Nie możemy zalogować Cię za pomocą podanych przez Ciebie danych.',
          [
            {
              text: 'Ok',
            },
          ],
        );        
      }
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
                      <Text style={styles.header}>Witaj na pokładzie</Text>

                        <Stack space={5} w="75%" maxW="300px" mx="auto" style={styles.vstack}>
                            <Input variant="filled" placeholder="Email" value={email} onChangeText={text=>setEmail(text)}/>
                            <Input variant="filled" secureTextEntry={true} placeholder="Hasło" value={password} onChangeText={text=>setPassword(text)}/>
                            
                            <Center>
                              <TouchableOpacity onPress={()=>login(email.trim(),password)} style={styles.buttonOrange}> 
                                  <Text style={buttonStyle.buttonOrangeText}>Zaloguj</Text>
                              </TouchableOpacity>
                            </Center>
                            
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
    //marginTop: "8%",
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
    
  },
  header:{
    marginLeft:"6%",
    color: "#D45500",
    fontWeight: "bold",
    fontSize: 32,
    padding: "5%"
  }

});