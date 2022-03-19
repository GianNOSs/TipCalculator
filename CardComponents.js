import React from 'react';
import {Flex, Text, Spacer, Icon} from 'native-base';
import { Path } from "react-native-svg"
import {useFonts, SpaceMono_700Bold } from '@expo-google-fonts/space-mono'
import DollarIcon from './DollarIcon'

export default function CardComponents({titleText, amount, ...props}) {

let [fontsLoaded] = useFonts({SpaceMono_700Bold});

    return(
        <Flex direction= "row" wrap= "wrap" justifyContent= "space-between"  >
                  <Text>
                    <Text {...props} fontFamily= 'SpaceMono_700Bold' fontWeight= "700" fontSize= "md" style={{ color: "white"}}>{titleText}</Text>
                    <Text fontFamily= 'SpaceMono_700Bold' fontWeight= "700" fontSize= "sm" style={{ color: "hsl(186, 14%, 43%)"}}>{"\n"}/ person</Text>
                  </Text>
                 <Spacer/>
                 <DollarIcon size="5" marginTop= "5" color= "hsl(172, 67%, 45%)"></DollarIcon>
                 <Text fontFamily= 'SpaceMono_700Bold' fontWeight= "700" fontSize= "4xl" style={{ color: "hsl(172, 67%, 45%)"}}>
                   {amount}
                </Text>
              </Flex>
    );

}