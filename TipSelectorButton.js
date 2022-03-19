import React from 'react';
import {Button} from 'native-base';

export default function TipSelectorButton({toggleCustomTipPercentageInput, TipPercentage, toggleTipPercentage, value, ...props}) {

    return(
        <Button 
                {...props}
                onPress={() => {toggleTipPercentage(value); toggleCustomTipPercentageInput(""); }}
                style= {{height: 50, 
                    width: 160, 
                    borderRadius: 5, 
                    marginTop: 15,
                    margin: 'auto'
                }}
        >
                  {props.children}
        </Button>
    );

}