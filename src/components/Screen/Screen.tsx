import { TextField, Input, TextFieldProps } from 'react-aria-components';
import styles from './Screen.module.scss';

interface ScreenProps extends TextFieldProps {
    primaryValue: string;
    secondaryValue: string;
}

const Screen = ({primaryValue, secondaryValue}: ScreenProps) => {
    return (
        <section className={styles.screen}>
            <TextField id="secondaryValue" isReadOnly className={styles['secondary-value']}>
                <Input aria-label='' value={secondaryValue}/>
            </TextField>
            <TextField id="primaryValue" isReadOnly className={styles['primary-value']}>
                <Input aria-label='expression' value={primaryValue}/>
            </TextField>
        </section>
    )
}

export default Screen;