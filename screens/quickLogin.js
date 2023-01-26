import { ImageBackground,StyleSheet, Image, View,TouchableOpacity} from 'react-native';
import { Center, NativeBaseProvider,Stack,Text } from "native-base";
import {buttonStyle} from '../shered/Styles.js';
import {useState,useEffect} from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export default function QuickLogin({ navigation }){
     
  const [biometrics, setBiometrics] = useState(false);
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometrics(compatible);
    })();
  }, []);

  const fingerPrintLogin = ()=>{
      (async () => {
        if(biometrics)
        {
          const auth = await LocalAuthentication.authenticateAsync();
          if (auth.success) 
          {
            navigation.popToTop();
            navigation.replace('DrawerRoot');
          }
          else
          {

          }
        }else{
          navigation.popToTop();
          navigation.replace('PinLogin');
        }
          

      })();
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
                        <Stack space={4} w="75%" maxW="400px" mx="auto" style={styles.vstack}>
                            <Text style={styles.header}>Szybkie logowanie</Text>
                            
                            
                            <Center>
                                
                              <TouchableOpacity onPress={()=>fingerPrintLogin()}  style={styles.buttonOrange}  > 
                                  <Text style={buttonStyle.buttonOrangeText}>Skanuj Odcisk</Text>
                              </TouchableOpacity> 
                              <TouchableOpacity onPress={()=>navigation.navigate("PinLogin")}  style={styles.buttonOrange}  > 
                                  <Text style={buttonStyle.buttonOrangeText}>Logowanie przez PIN</Text>
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
  fingerLogo:{
    width: 150,
    height: 150,
    marginTop: "0%",
    marginBottom: "0%",

  },
  backElement:{
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: "40%",
    height: "60%",
    borderTopLeftRadius: 38,
    borderTopRightRadius:38,
    position: "absolute",
    bottom: 0,    

  },
  vstack:{
    width:"100%",
    height: "100%",
    justifyContent: 'center'
  },
  header:{
    color: "#D45500",
    fontWeight: "bold",
    fontSize: 32,
    padding: "5%",
    marginTop: 0,
    alignSelf: "center",
  }

});