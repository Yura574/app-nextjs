
import styles from '../styles/Home.module.css'
import axios from "axios";
import {Categories} from "../components/Categories";


// @ts-ignore
const App= () => {

  return (
    <div className={styles.container}>

<Categories  />
    </div>
  )
}



export default App