import React,{CSSProperties, FC} from "react";


type propsType={text?:string,level?:number,isCenter?:boolean}
const QuestionTitle:FC<propsType> = (props:propsType)=>{
    const { text,level,isCenter } = props
    const style:CSSProperties={textAlign:isCenter?'center':'left'}
    switch(level){
        case 1:
            return <h1 style={style}>{text}</h1>
        case 2:
            return <h2 style={style}>{text}</h2>
        case 3:
            return <h3 style={style}>{text}</h3>
        case 4:
            return <h4 style={style}>{text}</h4>
        case 5:
            return <h5 style={style}>{text}</h5>
    }
    return null
}

export default QuestionTitle