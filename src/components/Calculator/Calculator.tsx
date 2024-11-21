import { useState } from "react";
import { Parser } from 'expr-eval';
import Screen from "../Screen/Screen";
import styles from "./Calculator.module.scss"
import CalculatorButtons from "../CalculatorButtons/CalculatorButtons";
import { Operator } from "../../enums/Operator";

const Calculator = () => {
    const [primaryValue, setPrimaryValue] = useState("");
    const [secondaryValue, setSecondaryValue] = useState("");

    const parser = new Parser();

    const buttonActions: Record<string, (prevValue: string) => string | void> = {
        '0': (prevValue: string) => prevValue + '0',
        '1': (prevValue: string) => prevValue + '1',
        '2': (prevValue: string) => prevValue + '2',
        '3': (prevValue: string) => prevValue + '3',
        '4': (prevValue: string) => prevValue + '4',
        '5': (prevValue: string) => prevValue + '5',
        '6': (prevValue: string) => prevValue + '6',
        '7': (prevValue: string) => prevValue + '7',
        '8': (prevValue: string) => prevValue + '8',
        '9': (prevValue: string) => prevValue + '9',
        [Operator.ADD]: () => handleOperatorClick(' + '),
        [Operator.SUBTRACT]: () => handleOperatorClick(' - '),
        [Operator.MULTIPLY]: () => handleOperatorClick(' * '),
        [Operator.DIVIDE]: () => handleOperatorClick(' / '),
        [Operator.EQUALS]: () => handleEqualsClick(),
        [Operator.CLEAR]: () => handleClearClick(),
        [Operator.DECIMAL]: () => handleOperatorClick('.'),
    }

    const handleEqualsClick = () => {
        setSecondaryValue(formatExpression(primaryValue));
        setPrimaryValue(parser.evaluate(primaryValue).toString());
    }

    const handleOperatorClick = (operator: string) => {
        if (!primaryValue || !parseInt(primaryValue[primaryValue.length - 1], 10)){
            return;
        }

        setPrimaryValue(primaryValue + operator);
    }

    const handleClearClick = () => {
        setPrimaryValue("");
        setSecondaryValue("");
    }

    const handleButtonClick = (label: string) => {
        const newExpression = buttonActions[label](primaryValue);

        if (typeof newExpression === 'string') {
            setPrimaryValue(newExpression);
        }
    }

    const formatExpression = (expression: string) => {
        return expression
            .replace(/\*/g, Operator.MULTIPLY)
            .replace(/\//g, Operator.DIVIDE);
    }

    return (
        <div className={styles.calculator}>
            <Screen primaryValue={formatExpression(primaryValue)} secondaryValue={secondaryValue}></Screen>
            <CalculatorButtons onButtonClick={handleButtonClick}></CalculatorButtons>
        </div>
    )
}

export default Calculator;