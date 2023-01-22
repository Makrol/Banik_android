
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image,FlatList} from 'react-native';
import {NativeBaseProvider,HStack,Stack} from "native-base";
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc,addDoc  } from "firebase/firestore";
import{onAuthStateChanged} from "firebase/auth";
import {useState,useEffect} from 'react';
import { Select } from "native-base";
import { acc } from 'react-native-reanimated';



export default function History({navigation}){

  const[accountNumber,setAccountNumber] = useState("");
  const [accountList,setAccountList] = useState([]);
  const [userData,setUserData] = useState(-1);
  const [tarnsferList,setTransferList] = useState([]);
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
    }  

  });

  useEffect(()=>{
    if(userData != -1){
      const q = query(collection(db,"accounts"),where("owner","==",userData));
      getDocs(q).then(querySnapshot=>{
        const tmpTab = [];
        querySnapshot.forEach((doc) => {
              tmpTab.push(doc.id); 
        });
        setAccountList(tmpTab);
        console.log(tmpTab);
    });
    }
  },[userData])

  useEffect(()=>{
      if(accountNumber!="")
      {
        const tmpTab=[];
        const q = query(collection(db,"transfers"),where("fromAccount","==",accountNumber));
        getDocs(q).then(querySnapshot=>{

        querySnapshot.forEach((doc) => {

              tmpTab.push({ key: doc.id, value: element(doc.data().title,doc.data().amount,doc.data().type) });
        });
        setTransferList(tmpTab);

    });

      }
  },[accountNumber])


    const data = [
       /* { key: "1", value: element() },
        { key: "2", value: element() },
        { key: "3", value: element() },
        { key: "4", value: element() },
        { key: "5", value: element() },
        { key: "6", value: element() },
        { key: "7", value: element() },
        { key: "8", value: element() },
        { key: "9", value: element() },
        { key: "10", value: element() },
        { key: "11", value: element() },
        { key: "12", value: element() },
        { key: "13", value: element() },
        { key: "14", value: element() },
        { key: "15", value: element() },
        { key: "16", value: element() },
        { key: "17", value: element() },
        { key: "18", value: element() },
        { key: "19", value: element() },
        { key: "20", value: element() },*/
      ];
      function  element(title,amount,type)
        {
            const styles = StyleSheet.create({
                historyIcon:{
                margin:10,
                width:40,
                height: 40
                },
                historyElement:{
                padding: 20
                },
                sum:{
                textAlign:"right"
                },
                mainContent:{

                }
            });
            return(
                <TouchableOpacity
                                    style={styles.historyElement}
                                    onPress={() => navigation.navigate("TransferDetails")}
                                    >
                                    <HStack>
                                        <Image
                                            style={styles.historyIcon}
                                            resizeMode="cover"
                                            source={require("../assets/creditcard.png")}
                                        />
                                        <View style={styles.mainContent}>
                                            <Text>{title}</Text>
                                            <Text>{type}</Text>
                                        </View>
                                        <Text style={styles.sum}>{amount}PLN</Text> 
                                    </HStack>
                                        
                                    
                </TouchableOpacity>
            );
        }
    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    
                    <View style={styles.backElement}>
                        <Text style={styles.header}>Historia Operacji</Text>
                        <Select  variant="filled" size="2xl" placeholder="Numer klienta" onValueChange={value => setAccountNumber(value)}>
                           
                               
                                  {accountList.map((item, index) => {
                    
                                    return <Select.Item label={item} value={item} key={item} />
                                  })}
                               
                                </Select>
                        <FlatList
                            style={styles.lista}
                            horizontal={false}
                            data={tarnsferList}
                            renderItem={({ item }) => <Text>{item.value}</Text>}
                          />
                       
                    </View>
                
                </NativeBaseProvider>
              </View>
              
      );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
      width: '100%',
      height: '100%'
  },
  backElement:{
    backgroundColor: "#ffffff",
    //width: "100%",
    //minHeight: "40%",
    //height: "90%",
    //borderTopLeftRadius: 38,
    //borderTopRightRadius:38,
    //position: "absolute",
    //alignItems: "center",
   // bottom: 0,
    
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
  historyIcon:{
    margin:10,
    width:50,
    height:50
  },
  historyElement:{
    width:"100%"
  },
  sum:{
    width: "30%",
    textAlign:"right"
  },
  lista:{

   
  }
});