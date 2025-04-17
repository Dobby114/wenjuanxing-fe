import QuestionInput from "./QuestionInput";
import QuestionRadio from "./QuestionRadio";

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
    if(isHidden){
        return null
    }
    switch(type){
        case 'questionInput':
            return <QuestionInput fe_id={fe_id} props={props} />
        case 'questionRadio':
            return <QuestionRadio fe_id={fe_id} props={props} />
    }
    return null
}