/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/appTheme';

interface btnCalc {
    texto: string;
    color?: string;
    ancho?: boolean;
    accion: ( numeroTexto: string ) => void;
}

export const BotonCalc = ({ texto, color = '#2D2D2D', ancho = false, accion }:btnCalc) => {
    return (
        <TouchableOpacity
            onPress={() => accion( texto ) }
        >
            <View style={{
                ...styles.btn,
                backgroundColor: color,
                width: (ancho) ? 180 : 80,
            }}>
                <Text style={{
                    ...styles.btnTexto,
                    color: ( color === '#9B9B9B') ? 'black' : 'white',
                }}> {texto} </Text>
            </View>
        </TouchableOpacity>

    );
};
