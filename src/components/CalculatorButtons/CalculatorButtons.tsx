import { Operator } from "../../enums/Operator";
import CalculatorButton from "../CalculatorButton/CalculatorButton";
import styles from "./CalculatorButtons.module.scss"

interface CalculatorButtonsProps {
    onButtonClick: (label: string) => void;
}

const CalculatorButtons = ({ onButtonClick }: CalculatorButtonsProps) => {

    const buttonLabels: string[][] = [
        ['7', '8', '9', Operator.DIVIDE],
        ['4', '5', '6', Operator.MULTIPLY],
        ['1', '2', '3', Operator.SUBTRACT],
        ['0', Operator.DECIMAL, Operator.EQUALS, Operator.ADD],
        [Operator.CLEAR]
      ];

    return (
        <section aria-label="Calculator Buttons" className={styles.buttons}>
        {buttonLabels.map((row, rowIndex) => (
            <div key={rowIndex} className={styles['button-row']}>
            {   
                row.map((label) => (
                    <CalculatorButton key={label} onPress={() => onButtonClick(label)}>{label}</CalculatorButton>
                ))
            }
            </div>
        ))}
        </section>
    );
}
export default CalculatorButtons;