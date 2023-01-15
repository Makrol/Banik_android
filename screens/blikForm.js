
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,HStack,VStack, ScrollView,Input,Center,Button,Icon} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {useState,useEffect} from 'react';




export default function BlikForm({ navigation }){
    const[accountNumber,setAccountNumber] = useState("");
    const[recipentName,setRecipentName] = useState("");
    const[recipentPhoneNumber,setRecipentPhoneNumber] = useState("");
    const[transferAmount,setTransferAmount] = useState("");
    const[transferTitle,setTransferTitle] = useState("");
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
                                <Input variant="filled" size="2xl" placeholder="Numer klienta" InputRightElement={<Button colorScheme="#D45500" size="xs" rounded="none" w="1/6" h="full" leftIcon={<Icon as={Ionicons} name="arrow-forward" size="sm" />}></Button>}/>
                            
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
                              <TouchableOpacity onPress={() =>navigation.navigate("DrawerRoot")} style={styles.buttonOrange} >
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