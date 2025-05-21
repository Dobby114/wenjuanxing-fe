import React,{FC,CSSProperties} from "react";
import styles from './QuestionInfo.module.scss'


type propsType={
    title?:string;
    desc?:string;
    isCenter?:boolean;
}
const QuestionInfo:FC<propsType> = (props:propsType)=>{
    const { title,desc,isCenter } = props
    const style:CSSProperties={textAlign:isCenter?'center':'left'}

    return<>
    <h1 style={style}>{title}</h1>
    <p style={style} className={styles.desc}>{desc}</p>
    </>
}

export default QuestionInfo