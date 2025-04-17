import React,{FC} from "react";


type propsType={
    text:string,
    isCenter:boolean
}
const QuestionParagraph:FC<propsType> = (props:propsType)=>{
    const { text,isCenter } = props
    // 段落换行
    const textList = text.split('\n')
    return <div>
        {textList.map((item,index)=><p key={index} style={{textAlign:isCenter?'center':'left'}}>{item}</p>)}
    </div>
}

export default QuestionParagraph