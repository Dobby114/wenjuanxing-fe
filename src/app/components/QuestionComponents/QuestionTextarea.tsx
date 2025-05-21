import React,{FC} from "react";
import styles from './QuestionTextarea.module.scss'


type propsType={
    fe_id?: string,
    props?:{
        title?:string,
        placeholder?:string,
    }

}
const QuestionTextarea:FC<propsType> = ({fe_id,props})=>{
    const {title,placeholder} = props ||{}
    return <div className={styles.wrapper}>
    <div className={styles.title}>
        {title}
    </div>
     <textarea className={styles.textarea} name={fe_id} placeholder={placeholder} />
    </div>
}


export default QuestionTextarea