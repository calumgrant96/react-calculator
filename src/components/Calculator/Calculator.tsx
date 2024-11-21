import { useState } from "react";
import { Parser } from 'expr-eval';
import Screen from "../Screen/Screen";
import styles from "./Calculator.module.scss"
import CalculatorButtons from "../CalculatorButtons/CalculatorButtons";
import { Operator } from "../../enums/Operator";

const Calculator = () => {
    const [answer, setAnswer] = useState<number | null>(null);
    const [expression, setExpression] = useState('');
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
        [Operator.ADD]: () => handleOperatorClick('+'),
        [Operator.SUBTRACT]: () => handleOperatorClick('-'),
        [Operator.MULTIPLY]: () => handleOperatorClick('*'),
        [Operator.DIVIDE]: () => handleOperatorClick('/'),
        [Operator.EQUALS]: () => handleEqualsClick(),
        [Operator.CLEAR]: () => handleClearClick(),
        [Operator.DECIMAL]: (prevValue: string) => prevValue + '.'
    }

    const handleEqualsClick = () => {
        setAnswer(parser.evaluate(expression));
    }

    const handleOperatorClick = (operator: string) => {
        if (!expression || !parseInt(expression[expression.length - 1], 10)){
            return;
        }

        setExpression(expression + ' ' + operator + ' ');
    }

    const handleClearClick = () => {
        setExpression("");
        setAnswer(null);
    }

    const handleButtonClick = (label: string) => {
        const newExpression = buttonActions[label](expression);

        if (typeof newExpression === 'string') {
            setExpression(newExpression);
        }
    }

    const formatExpression = (expression: string) => {
        return expression
            .replace(/\*/g, Operator.MULTIPLY)
            .replace(/\//g, Operator.DIVIDE);
    }

    return (
        <div className={styles.calculator}>
            <Screen primaryValue={formatExpression(expression)} secondaryValue={answer?.toString() ?? ""}></Screen>
            <CalculatorButtons onButtonClick={handleButtonClick}></CalculatorButtons>
        </div>
    )
}

export default Calculator;