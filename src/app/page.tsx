
import styles from "./page.module.css";
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h2>「造梦问卷」</h2>
        <div className={styles.info}>让问卷设计更简单，让数据洞察更清晰!</div>
        <Image property="true"  src="/icon.gif" alt="icon" width={200}
          height={200}/>
      </div>
    </div>
  );
}
