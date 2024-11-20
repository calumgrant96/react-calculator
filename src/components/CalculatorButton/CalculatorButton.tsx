import {Button, ButtonProps} from 'react-aria-components';
import styles from './CalculatorButton.module.scss'

interface CalculatorButtonProps extends ButtonProps {
    children: React.ReactNode;
}

const CalculatorButton = ({onPress, children}: CalculatorButtonProps) => {
    return <Button className={styles.button} onPress={onPress}>{children}</Button>
}

export default CalculatorButton;