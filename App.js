import React, {useEffect, useState} from 'react';
import { NativeBaseProvider, Box, Input, Card, Text, Flex, Button} from 'native-base';
import { Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import {useFonts, SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono'
import { styles } from './styles/styles';
import TipSelectorButton from './TipSelectorButton';
import CardComponents from './CardComponents';
import DollarIcon from './DollarIcon';
import PersonIcon from './PersonIcon';


export default function App() {

  let [fontsLoaded] = useFonts({SpaceMono_400Regular,SpaceMono_700Bold});

  const [TipPercentage, setTipPercentage] = useState('');
  const[BillAmount, setBillAmount] = useState('');
  const[PeopleAmount, setPeopleAmount] = useState('');
  const [billInput, setBillInput] = useState();
  const [peopleInput, setPeopleInput] = useState();
  const [CustomTipPercentageInput, setCustomTipPercentageInput] = useState();
  const[TipAmountPerPerson, setTipAmountPerPerson] = useState('0');
  const[TotalPerPerson, setTotalPerPerson] = useState('0');
  const[FocusInputPeopleText, setFocusInputPeopleText] = useState('0')
  const[FocusInputCustomText, setFocusInputCustomText] = useState('0')
  const[FocusInputBillText, setFocusInputBillText] = useState('0')
  const percentages = ['5', '10', '15', '25', '50']

  const toggleBillInput = (value) => {
    setBillInput(value)
  };
  const togglePeopleInput = (value) => {
    setPeopleInput(value)
  };
  const toggleCustomTipPercentageInput = (value) => {
    setCustomTipPercentageInput(value)
  };
  const toggleTipPercentage = (value) => {
      setTipPercentage(value)
    };

  useEffect(() => {
      const value = ((BillAmount*(TipPercentage/100))/PeopleAmount);
      Number.isNaN(value) ? setTipAmountPerPerson('0') : setTipAmountPerPerson(value.toFixed(2));
      Number.isFinite(value) ? setTipAmountPerPerson(value.toFixed(2)) : setTipAmountPerPerson('0');
      const value2 = (value+(BillAmount/PeopleAmount));
      Number.isNaN(value2) ? setTotalPerPerson('0') : setTotalPerPerson(value2.toFixed(2));
      Number.isFinite(value2) ? setTotalPerPerson(value2.toFixed(2)) : setTotalPerPerson('0');
    }, [TipPercentage,BillAmount,PeopleAmount]);

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    
  return (
    <NativeBaseProvider >
      <Box bg="hsl(185, 41%, 84%)" flex="1" margin= "auto">
          <Text fontFamily="SpaceMono_700Bold" fontWeight="400" fontSize="xl" margin= "auto" paddingTop= "50" width= "100" color= "hsl(186, 14%, 43%)">
            S P L I T T E R
          </Text>
          <Card backgroundColor= "white"  marginTop= "50" position= {FocusInputBillText === false ? "absolute" : "relative"} 
            top= {FocusInputBillText === false ? "50" : "0"} right= {FocusInputBillText === false ? "-38%" : "0"}  style={{ border: 0, borderRadius: 25}}>
            <Text fontFamily= 'SpaceMono_700Bold' fontWeight= "700" fontSize="sm" style={{...styles.textMuted, marginBottom: 10, marginLeft: 5, color: "hsl(186, 14%, 43%)"}}>
              Bill
            </Text>
            <Input
            color= "hsl(183, 100%, 15%)" fontFamily= "SpaceMono_700Bold" fontWeight="400" textAlign= "right" paddingRight= "20" flex= "0"
            placeholder= '0'        
            value= {billInput}
            onFocus={() => {toggleBillInput(); setFocusInputBillText(Platform.OS === 'ios' ? true : false);}}
            onBlur={() => setFocusInputBillText('0')}
            onChangeText={text => {setBillAmount(text)}}
            size= "xl" keyboardType= "numeric" marginLeft= "1.5" marginRight= "1.5"
            InputLeftElement={<DollarIcon size="5" color="#9EBBBD"></DollarIcon>} 
            backgroundColor= "hsl(189, 41%, 97%)" borderRadius= "5" borderColor= "white"
            paddingLeft= "0" paddingRight= "0" returnKeyType={'done'}
            />
            <Text fontFamily= 'SpaceMono_700Bold' fontWeight="400" fontSize="sm" style={{...styles.textMuted, marginTop: 20, marginLeft: 5, color: "hsl(186, 14%, 43%)"}}>
              Select Tip %
            </Text>
            <Flex direction= "row" wrap= "wrap" justifyContent="space-between" marginTop= "3" marginBottom= {FocusInputCustomText}>          
              {
                percentages.map( perc => {
                  return ( 
                    <TipSelectorButton 
                        key= {perc}  
                        value= {perc}
                        toggleTipPercentage={toggleTipPercentage}
                        toggleCustomTipPercentageInput={toggleCustomTipPercentageInput}
                        backgroundColor={ TipPercentage === perc ? 'hsl(172, 67%, 45%)' : 'hsl(183, 100%, 15%)'}
                        _text={{ 
                          color: TipPercentage === perc ? 'hsl(183, 100%, 15%)' : 'white',
                          fontFamily: "SpaceMono_700Bold", 
                          fontWeight: "700", 
                          fontSize: "2xl"
                      }}            
                    >
                    {`${perc}%`}
                    </TipSelectorButton>
                  );  
                })
              }
          <Input
            key="Custom"
            placeholder="Custom"
            bg="hsl(189, 41%, 97%)" 
            keyboardType= "numeric"
            color= "hsl(186, 14%, 43%)"
            fontFamily= "SpaceMono_700Bold"
            fontWeight= "700"
            fontSize= "2xl"
            paddingLeft= "12"
            style= {{height: 50, 
              width: 160, 
              borderRadius: 5, 
              marginTop: 15,
              margin: 'auto'
            }}
            value={CustomTipPercentageInput}
            onFocus={() => {toggleCustomTipPercentageInput(); setFocusInputCustomText(Platform.OS === 'ios' ? "32" : "0"); toggleTipPercentage("Custom");}}
            onBlur={() => setFocusInputCustomText('0')}
            onChangeText={text => toggleTipPercentage(text)}
            returnKeyType={'done'}
          />
            </Flex>
            <Box marginTop= "5">
            <Text fontFamily= 'SpaceMono_700Bold' fontWeight= "700" fontSize="sm" style={{...styles.textMuted, marginBottom: 10, marginLeft: 5, color: "hsl(186, 14%, 43%)"}}>
              Number of People
            </Text>
            <Input
            color= "hsl(183, 100%, 15%)" 
            fontFamily= "SpaceMono_700Bold" 
            fontWeight="700" 
            textAlign= "right" 
            flex= "0"
            placeholder= "0"
            marginBottom= {FocusInputPeopleText}
            value= {peopleInput}
            onFocus={() => {togglePeopleInput(); setFocusInputPeopleText(Platform.OS === 'ios' ? "40" : "0");}}
            onBlur={() => setFocusInputPeopleText('0')}
            onChangeText={text => setPeopleAmount(text)}
            size= "xl" 
            keyboardType= "numeric" 
            marginLeft= "1.5" 
            marginRight= "1.5"
            InputLeftElement={<PersonIcon size="5" color="#9EBBBD"> </PersonIcon>} 
            backgroundColor= "hsl(189, 41%, 97%)" 
            borderRadius= "5" 
            borderColor= "white"
            paddingLeft= "0" 
            paddingRight= "0" 
            returnKeyType={'done'}
            />
           </Box>

           <Card backgroundColor= "hsl(183, 100%, 15%)" style={{ border: 0, borderRadius: 15, height: 190, marginTop: 15, marginBottom: 0}}>
             <Box marginTop= "2">
              <CardComponents titleText="Tip Amount" amount= {TipAmountPerPerson}></CardComponents>
              <CardComponents titleText="Total" amount= {TotalPerPerson}></CardComponents>
              <Button 
              backgroundColor= {TipPercentage === "reset" ? 'hsl(184, 14%, 56%)' : 'hsl(172, 67%, 45%)'}
              borderRadius= "5" 
              _text= {{fontFamily: "SpaceMono_700Bold", fontWeight: "700", color: "hsl(183, 100%, 15%)"}}
              onPressIn={() => toggleTipPercentage("reset")}
              onPressOut={() => {toggleTipPercentage('0'); toggleBillInput(''); togglePeopleInput(''); toggleCustomTipPercentageInput('Custom'); setPeopleAmount('0'); setBillAmount('0'); }}
              >
                RESET
              </Button>
             </Box>
          </Card>
        </Card>
      </Box>
    </NativeBaseProvider>
  ); 
  }
}
