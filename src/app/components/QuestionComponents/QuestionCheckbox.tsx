'use client'
import React,{FC,useState,useEffect} from "react";
import styles from './QuestionCheckbox.module.scss'


type propsType={
    fe_id: string,
    props:{
        title: string,
        options: Array<{ label: string, value: string, checked: boolean }>,
        isVertical: boolean;
    }
}
const QuestionCheckbox:FC<propsType> = ({fe_id,props})=>{
    const {title,options,isVertical} = props
    const [selectedValues,setSelectedValues] = useState<string[]>([])
    function handleChange(value:string){
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
        setSelectedValues(newSelectedValues);
    }
    useEffect(()=>{
        const checked = options.filter((item)=>item.checked).map((item)=>item.value)
        setSelectedValues((selectedValues)=>[...selectedValues,...checked])
    },[options])
    return <>
    <div className={styles.title}>{title}</div>
    <input type="hidden" name={fe_id} value={selectedValues.toString()}></input>
    <ul className={styles.list}>{
        options.map((item)=>{
            const {label,value,checked} = item
            const liClassName = isVertical ? styles.vertical : styles.horizontal
            return (
                <li key={value} className={liClassName}>
                    <label>
                        <input type="checkbox"  value={value} defaultChecked={checked} onChange={()=>{handleChange(value)}} />
                        {label}
                    </label>
                </li>
            )
        })
        }</ul>
    </>
}

export default QuestionCheckbox