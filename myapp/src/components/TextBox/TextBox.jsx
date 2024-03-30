import styles from './TextBox.module.css'

function TextBox(props)
{
    return(
        <div className={styles.textInputWrapper}>
            <input {...props} />
            {props.error && (<p className={styles.errorMessage}>{props.errormessage}</p>)}
        </div>
    )
}

export default TextBox;