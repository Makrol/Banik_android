
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,HStack,Stack} from "native-base";
import { useState } from 'react';



export default function TransferTypes({ navigation }){
  const [data,setData] = useState('{"name": "", "accountNumber": ""}');
    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                    
                        <Text style={styles.header}>Przelew</Text>
                        <View style={styles.content}>
                            
                                
                                
                                <HStack space={20} style={styles.content}>
                                    <TouchableOpacity onPress={() =>navigation.navigate("TransferForm",{data})}>
                                        <View style={styles.button}>
                                            <Image
                                                source={require('../assets/transfer.png')}
                                                style={styles.buttonIcon}>
                                            </Image>
                                        </View>
                                        <Text style={styles.buttonText}>Wykonaj przelew</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() =>navigation.navigate("BlikForm")}>
                                        <View style={styles.button}>
                                            <Image
                                                source={require('../assets/blik.png')}
                                                style={styles.buttonIcon}>
                                            </Image>
                                        </View>
                                        <Text style={styles.buttonText}>Przelew blik</Text>
                                    </TouchableOpacity>
                                </HStack>

                        </View>
                       
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
    alignItems: "center",
    justifyContent: 'center',
    marginTop: "20%"
  },
  header:{
    color: "#D45500",
    fontWeight: "bold",
    fontSize: 32,
    padding: "5%"
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
  }
});