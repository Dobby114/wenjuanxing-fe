import React, { FC } from "react";
import styles from './QuestionInput.module.scss'


interface propsType {
    fe_id?: string,
    props?: {
        title?: string,
        placeholder?: string,
    }
}
const QuestionInput: FC<propsType> = ({ fe_id, props }) => {
    const { title, placeholder } = props || {}
    return <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.input}>    
            <input name={fe_id} placeholder={placeholder}></input>
        </div>
    </div>
}

export default QuestionInput