import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Alert} from 'react-native';
import {NativeBaseProvider,FlatList, Center,VStack,Box,HStack,Spacer} from "native-base";
import { useState,useEffect } from 'react';
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc,addDoc  } from "firebase/firestore";
import{onAuthStateChanged} from "firebase/auth";

export default function SetMainAccount({ navigation }){
  const[getAccountList,setAccountList] = useState([]);
  const[userData,setUserData] = useState(-1);
  const[mainAccount,setMainAccount] = useState("-1");
    onAuthStateChanged(auth, (user) => {
        if (user) 
        {
          const docRef = doc(db,"users",user.email);
          getDoc(docRef).then(docSnap=>{
          if (docSnap.exists()) {
              setUserData(docSnap.data().accountNumber);  
             
          }
          });  
        } 
        else {
          // User is signed out
          // ...
        }  
    
      });

    useEffect(()=>{
      if(userData!=-1)
      {
        const docRef = doc(db,"mainAccount",userData);
          getDoc(docRef).then(docSnap=>{
          if (docSnap.exists()) {
             setMainAccount(docSnap.data().main);
          }
          });  
        
       
        const q = query(collection(db,"accounts"),where("owner","==",userData));
        getDocs(q).then(querySnapshot=>{
        const tmpTab = [];
          querySnapshot.forEach((doc) => {
          //tmpTab.push(doc.id); 
          if(mainAccount == doc.id)
          {
            tmpTab.push({name: doc.data().name,amount: doc.data().money+" PLN",number: doc.id,border: "4"});
          }
          else
          {
            tmpTab.push({name: doc.data().name,amount: doc.data().money+" PLN",number: doc.id,border: "0"});
          }
          
        });
  setAccountList(tmpTab);
        });
      }
    },[userData,mainAccount])

    function newMainAccount(accountNumber){
        console.log(accountNumber);
        updateDoc(doc(db, "mainAccount", userData),{
          main: accountNumber,
        })
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
                    <Center>
                        <Text style={styles.header}>Wybór konta głównego</Text>
                        <View style={styles.content}>
                            <VStack space={1}>
                            <FlatList data={getAccountList} renderItem={({
      item
    }) => <Box borderWidth={item.border} borderRadius={10} _dark={{
      borderColor: "green.500"
    }} borderColor="green.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[1, 1]} justifyContent="space-between">
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.name}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item.number}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.amount}
              </Text>
              <TouchableOpacity onPress={() => { newMainAccount(item.number) }} style={styles.optionbutton} >
                                  <Text style={styles.buttonText}>Wybierz</Text>
              </TouchableOpacity>
            </HStack>
          </Box>} keyExtractor={item => item.id} />
                               
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
      width: 370,
      marginTop: "10%",

    },
    header:{
      color: "#D45500",
      fontWeight: "bold",
      fontSize: 32,
      padding: "5%"
    },
    optionbutton:{
      backgroundColor: "#D45500",
      padding: 5,
      borderRadius: 38,
      width: "30%",
      
      alignItems: "center",
      justifyContent: 'center'
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
    lista:{
  
      width: "100%"
    }
  });