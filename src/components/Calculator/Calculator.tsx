import { useState } from "react";
import CalculatorButton from "../CalculatorButton/CalculatorButton";
import { Parser } from 'expr-eval';
import Screen from "../Screen/Screen";
import styles from "./Calculator.module.scss"
import { Operator } from "../../enums/operator";

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
        [Operator.ADD]: (prevValue: string) => prevValue + '+',
        [Operator.SUBTRACT]: (prevValue: string) => prevValue + '-',
        [Operator.MULTIPLY]: (prevValue: string) => prevValue + '*',
        [Operator.DIVIDE]: (prevValue: string) => prevValue + '/',
        [Operator.EQUALS]: () => handleEqualsClick(),
        [Operator.CLEAR]: () => handleClearClick(),
        [Operator.DECIMAL]: (prevValue: string) => prevValue + '.'
    }

    const buttonLabels: string[][] = [
        ['7', '8', '9', Operator.DIVIDE],
        ['4', '5', '6', Operator.MULTIPLY],
        ['1', '2', '3', Operator.SUBTRACT],
        ['0', Operator.DECIMAL, Operator.EQUALS, Operator.ADD],
      ];

    const handleEqualsClick = () => {
        setAnswer(parser.evaluate(expression));
    }

    const handleClearClick = () => {
        setExpression("");
        setAnswer(0);
    }

    const handleButtonClick = (label: string) => {
        const newExpression = buttonActions[label](expression);

        if (typeof newExpression === 'string') {
            setExpression(newExpression);
        }
    }

    return (
        <div className={styles.calculator}>
            <Screen expression={expression} answer={answer}></Screen>
            <section aria-label="Calculator Buttons" className={styles.buttons}>
            {buttonLabels.map((row, rowIndex) => (
            <div key={rowIndex} className={styles['button-row']}>
            {   
                row.map((label) => (
                    <CalculatorButton key={label} onPress={() => handleButtonClick(label)}>{label}</CalculatorButton>
                ))
            }
            </div>
            ))}
            </section>
        </div>
    )
}

export default Calculator;