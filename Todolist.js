import { useEffect, useState, useRef } from "react";
import "./Todolist.css";

const Todolist = () => {
  const [todolist, setTodolist] = useState([]);
  const inputRef = useRef();
  const handlePress = (e) => {
    if (e.key === "Enter") {
      setTodolist([
        ...todolist,
        { text: e.target.value, completed: false, id: Date.now() },
      ]);
      inputRef.current.value = "";
    }
  };

  const handleCompleted = (id) => {
    const updatedList = todolist.map((e) => {
      if (e.id === id) {
        e.completed = !e.completed;
      }
      return e;
    });
    setTodolist(updatedList);
  };

  const handleDelete = (id) => {
    const filter = todolist.filter((e) => e.id !== id);
    setTodolist(filter);
  };
  return (
    <>
      <input type="text" onKeyDown={handlePress} ref={inputRef} />
      {todolist.map((e) => {
        return (
          <Item
            {...e}
            key={e.id}
            updateCompleted={handleCompleted}
            deleteTodo={handleDelete}
          ></Item>
        );
      })}
    </>
  );
};

const Item = ({ text, completed, id, updateCompleted, deleteTodo }) => {
  return (
    <>
      <div className="item">
        <div class="circle" onClick={() => updateCompleted(id)}>
          {completed ? <span>&#10003;</span> : ""}
        </div>
        <div className={completed ? "strike" : ""}>{text}</div>
        <div class="close" onClick={() => deleteTodo(id)}>
          X
        </div>
      </div>
    </>
  );
};

export default Todolist;
