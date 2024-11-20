import { TextField, Input, TextFieldProps } from 'react-aria-components';
import styles from './Screen.module.scss'

interface ScreenProps extends TextFieldProps {
    expression: string;
    answer: number | null;
}

const Screen = ({expression, answer}: ScreenProps) => {
    return (
        <section className={styles.screen}>
            <TextField isReadOnly className={styles.answer}>
                <Input aria-label='answer' value={answer?.toString()}/>
            </TextField>
            <TextField id="expression" isReadOnly className={styles.expression}>
                <Input aria-label='expression' value={expression}/>
            </TextField>
        </section>
    )
}

export default Screen;