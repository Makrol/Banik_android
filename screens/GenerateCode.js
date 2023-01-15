
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,HStack,VStack, ScrollView,Input,Center,Button,Icon} from "native-base";
import { Ionicons } from "@expo/vector-icons";



export default function GenerateCode({ navigation }){
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
                        
                            <Text style={styles.header}>Przelew Blik na telefon</Text>
                            <ScrollView>
                            <View>
                            <Center>
                                <Image
                                    source={require('../assets/qrCode.png')}
                                    style={styles.qr}>
                                </Image>
                            </Center>
                            </View>
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
    height: "60%",
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
  },
  logo:{
    width: 150,
    height: 150,
    marginTop: "15%",

  },
  qr:{
    width: 250,
    height: 250,
    marginTop: "15%",

  },

});