import QuestionInput from "./QuestionInput";
import QuestionRadio from "./QuestionRadio";
import QuestionTitle from "./QuestionTitle";
import QuestionInfo from "./QuestionInfo";
import QuestionParagraph from "./QuestionParagraph";
import QuestionTextarea from "./QuestionTextarea";
import QuestionCheckbox from "./QuestionCheckbox";

type componentProps={
    fe_id:string
    type:string,
    props:{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key:string]:any
    },
    isHidden:boolean,
}
export default function genComponents(component:componentProps){
    const {fe_id,type,props={},isHidden} = component
    // console.log('component',props)
    if(isHidden){
        return null
    }
    switch(type){
        case 'questionInput':
            return <QuestionInput fe_id={fe_id} props={props} />
        case 'questionRadio':
            return <QuestionRadio fe_id={fe_id} props={props} />
        case "questionTitle":
            return <QuestionTitle {...props} />
        case "questionInfo":
            return <QuestionInfo {...props} />
        case "questionParagraph":
            return <QuestionParagraph {...props} />
        case "questionTextarea":
            return <QuestionTextarea fe_id={fe_id} props={props} />
        case "questionCheckbox":
            return <QuestionCheckbox fe_id={fe_id} props={props} />
    
    }
    return null
}