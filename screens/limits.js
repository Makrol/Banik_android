import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {NativeBaseProvider,HStack,Input,Stack} from "native-base";
import {useState} from 'react';



export default function Limit({ navigation }){
    const[getDailyWithdrawalLimit,setDailyWithdrawalLimit] = useState("");
    const[getDailyCardLimit,setDailyCardLimit] = useState("");

    function changeLimits(){

      //tutaj zmieniamy w bazie wartosci limitow
      navigation.popToTop();
      navigation.replace('DrawerRoot');
    }



    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                        <Text style={styles.header}>Limity</Text>
                        <Input variant="filled" size="2xl" placeholder="Wprowadź nowy limit wypłat kartą" value={getDailyWithdrawalLimit} onChangeText={value => setDailyWithdrawalLimit(value)}/>
                        <Input variant="filled" size="2xl" placeholder="Wprowadź nowy limit BLIK" value={getDailyCardLimit} onChangeText={value => setDailyCardLimit(value)}/>
                        <TouchableOpacity onPress={() => changeLimits()} style={styles.buttonOrange}>
                          <Text style={styles.buttonOrangeText}>Zmień</Text>
                        </TouchableOpacity>
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
  buttonOrange:{
    backgroundColor: "#D45500",
    padding: 20,
    borderRadius: 38,
    width: "80%",
    marginTop: "15%",
    alignItems: "center",
    justifyContent: 'center'
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
  limits:{
    color: "black",
    fontSize: 18,
    padding: "1%",
    textAlign: 'left',
    width: "90%",
  },
});