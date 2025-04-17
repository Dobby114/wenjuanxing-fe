
import styles from "./page.module.css";
import QuestionInput from "./components/QuestionComponents/QuestionInput";
import QuestionRadio from "./components/QuestionComponents/QuestionRadio";

export default function Home() {
  return (
    <div className={styles.page}>
      <form>
        <QuestionInput fe_id='c1' props={{title:'111',placeholder:'2222'}} />
        <QuestionRadio fe_id='c2' props={{title:'333',options:[{label:'444',value:'555'},{label:'666',value:'777'}],value:'555',isVertical:false}} />
      </form>

    </div>
  );
}
