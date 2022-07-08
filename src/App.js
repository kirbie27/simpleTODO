import './App.css';
import Row from './row.js';
import { useEffect, useState } from 'react';
import * as styles from './componentCSS.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CustomSkeleton from './skeleton.js';
import { db } from './firebase.js';
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';



function App() {

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const [taskValue, setTaskValue] = useState("");
  const [fetching, setFetching] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [def, setDef] = useState(new Array(taskList.length).fill("dummy"));
  const taskReference = collection(db, "todo");
  const [firstLoad, setFirstLoad] = useState(true);

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setTaskValue(inputValue);
  };

  const updateList = async () => {
    const data = await getDocs(taskReference);
    setTaskList(
      data.docs.map((d) => (
        { ...d.data(), id: d.id }
      ))
    );
    
    console.log(taskList);
  }
  useEffect(() => {
    const getTasks = async () => {
      setFetching(true);
      const data = await getDocs(taskReference);
      updateList();
      await delay(350);
      setFetching(false);
    };

    if (firstLoad) {
      getTasks();
      setDef(new Array(taskList.length).fill("dummy"));
      setFirstLoad(false);
    }
  }, []);

  const Add = async (e) => {
    toast.success("You attempted to add a task", {
      className: "add",
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: false,
      pauseOnHover: false
    });

    if (taskValue != "") {
      def.push("dummy");
      setDef(def);
      setFetching(true);

      const toAdd = await addDoc(
        taskReference, {
        task: taskValue
      }
      );

      updateList();
      await delay(350);
      setFetching(false);
    }
  };

  const Del = async (e) => {
    toast.info("You attempted to delete a task", {
      className: "add",
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: false,
      pauseOnHover: false
    });
    def.pop()
    const dummy = def;
    setDef(dummy);

    const toDeleteReference = doc(db, 'todo', e.target.value);
    setFetching(true);
    const toDelete = await deleteDoc(toDeleteReference);
    updateList();
    await delay(350);
    setFetching(false);

  };

  return (
    <>
      <div className="App">

        <header className="App-header">
          <h1>TODO LIST ({fetching ? ("Counting...") : taskList.length})✏️</h1>
        </header>
        <Row
          rowLeft={<input
            style={styles.taskInputStyle}
            type="text"
            placeholder="Place task here"
            value={taskValue}
            onChange={handleChange}
            required
          />}
          rowRight={<button value="add" style={styles.addButtonStyle} onClick={Add}  >+</button>} />

        {fetching ?
          (def.map((task) =>
            <Row
              rowLeft={<p style={styles.taskC}><CustomSkeleton /></p>}
              rowRight={<button style={styles.delButtonStyle} onClick={Del} >-</button>} />
          ))
          :
          (taskList.map((t) => <Row
            rowLeft={<p style={styles.taskC}>{t.task}</p>}
            rowRight={<button value={t.id} style={styles.delButtonStyle} onClick={Del} >-</button>} />))
        }


      </div>
    </>
  );
}

export default App;
