import { TextField, Input, TextFieldProps } from 'react-aria-components';
import styles from './Screen.module.scss'

interface ScreenProps extends TextFieldProps {
    primaryValue: string;
    secondaryValue: string;
}

const Screen = ({primaryValue, secondaryValue}: ScreenProps) => {
    return (
        <section className={styles.screen}>
            <div className={styles['secondary-value']}>
            {secondaryValue !== "" && (
                <span role="presentation">Ans = {secondaryValue}</span>
            )}
            </div>
            <TextField id="expression" isReadOnly className={styles.expression}>
                <Input aria-label='expression' value={primaryValue}/>
            </TextField>
        </section>
    )
}

export default Screen;