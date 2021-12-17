/* eslint-disable prettier/prettier */
import { useRef, useState } from 'react';

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {

    const [ numeroAnterior, setNumeroAnterior ] = useState('0');
    const [ numero, setNumero ] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    };

    const armarNumero = ( nroTexto: string ) => {
        //No aceptar doble punto
        if ( numero.includes('.') && nroTexto === '.' ) return;
        if ( numero.startsWith('0') || numero.startsWith('-0') ) {
            //Punto decimal
            if ( nroTexto === '.' ) {
                setNumero( numero + nroTexto );
                // Evaluar si es otro 0, y hay un punto
            } else if ( nroTexto === '0' && numero.includes('.')  ){
                setNumero( numero + nroTexto );
                //Evaluar si es diferente de 0 y no tiene un punto
            } else if ( nroTexto !== '0' && !numero.includes('.') ){
                setNumero( nroTexto );
                // Evitar 0000.0
            } else if ( nroTexto === '0' && !numero.includes('.') ){
                setNumero( numero );
            } else {
                setNumero( numero + nroTexto);
            }
        } else {
            setNumero( numero + nroTexto);
        }
    };

    const positivoNegativo = () => {
        if ( numero.includes('-') ){
            setNumero( numero.replace('-', '') );
        } else {
            setNumero( '-' + numero );
        }
    };

    const btnDel = () => {
        let negativo = '';
        let nroTemp = numero;
        if ( numero.includes('-') ) {
            negativo = '-';
            nroTemp = numero.substr(1);
        }
        if ( nroTemp.length > 1 ) {
            setNumero(negativo + nroTemp.slice(0,-1));
        } else {
            setNumero('0');
        }
    };

    const cambiarNroPorAnterior = () => {
        if ( numero.endsWith('.') ){
            setNumeroAnterior( numero.slice(0,-1) );
        } else {
            setNumeroAnterior( numero );
        }
        setNumero('0');
    };

    const btnDividir = () => {
        cambiarNroPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    };
    const btnMultiplicar = () => {
        cambiarNroPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    };
    const btnRestar = () => {
        cambiarNroPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    };
    const btnSumar = () => {
        cambiarNroPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    };

    const calcular = () => {

        const num1 = Number( numero );
        const num2 = Number( numeroAnterior );

        switch ( ultimaOperacion.current ) {
            case Operadores.sumar:
                setNumero( `${ num1 + num2 }` );
                break;

            case Operadores.restar:
                setNumero( `${ num2 - num1 }` );
                break;

            case Operadores.multiplicar:
                setNumero( `${ num1 * num2 }` );
                break;

            case Operadores.dividir:
                setNumero( `${ num2 / num1 }` );
                break;
        }
        setNumeroAnterior('0');
    };

    return {
        numeroAnterior,
        numero,
        limpiar,
        armarNumero,
        positivoNegativo,
        btnDel,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
    }
}
