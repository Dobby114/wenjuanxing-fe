import React, { FC } from "react";
import styles from './QuestionRadio.module.scss'

interface propsType {
    fe_id: string,
    props: {
        title: string,
        options: Array<{ label: string, value: string }>,
        value: string;
        isVertical: boolean;
    }
}
const QuestionRadio: FC<propsType> = ({ fe_id, props }) => {
    const { title,options,value,isVertical } = props
    return <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <ul className={styles.list}>
            {
                options.map((item) => {
                    const { label, value:val } = item
                    const liClassName = isVertical ? styles.vertical : styles.horizontal
                    return (
                        <li key={val} className={liClassName}>
                            <label>
                                <input type="radio" name={fe_id} value={val} defaultChecked={val===value} />
                                {label}
                            </label>
                        </li>
                    )
                })
            }
        </ul>
    </div>
}

export default QuestionRadio