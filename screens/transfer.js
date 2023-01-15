
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,HStack,Stack} from "native-base";




export default function Transfer({ navigation }){
    //const []
    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                    
                        <Text style={styles.header}>Przelew</Text>
                        <View style={styles.content}>
                                <Stack space={4} w="75%" maxW="300px" mx="auto" style={styles.vstack}>
                                    <TouchableOpacity onPress={() =>navigation.navigate("TransferTypes")}>
                                        <View style={styles.button}>
                                            <Image
                                                source={require('../assets/transfer.png')}
                                                style={styles.buttonIcon}>
                                            </Image>
                                        </View>
                                        <Text style={styles.buttonText}>Przelew</Text>
                                    </TouchableOpacity>
                                    
                                    <HStack space={20}>
                                        <TouchableOpacity >
                                            <View style={styles.button}>
                                                <Image
                                                    source={require('../assets/scan.png')}
                                                    style={styles.buttonIcon}>
                                                </Image>
                                            </View>
                                            <Text style={styles.buttonText}>Skanuj kod</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity onPress={() =>navigation.navigate("GenerateCode")}>
                                            <View style={styles.button}>
                                                <Image
                                                    source={require('../assets/code.png')}
                                                    style={styles.buttonIcon}>
                                                </Image>
                                            </View>
                                            <Text style={styles.buttonText}>Generuj kod</Text>
                                        </TouchableOpacity>
                                    </HStack>
                                </Stack>
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
    width:"100%",
    alignItems: "center",
    height: 300,
    justifyContent: 'center',

  },
});