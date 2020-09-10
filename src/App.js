import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  //useState is a shortterm memory for this component. contents will be lost when refreshed.

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        console.log(snapshot.docs.map(doc => doc.data().todo));
        setTodos(
          snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = event => {
    console.log("yo! its working. You have clicled button");
    // ... is called spread. This will let previous content of todo and append the new input to array
    event.preventDefault(); //stops the  refresh the page after button is clicked so that data dont get lost

    setInput(""); //clear up the input field

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // setTodos([...todos, input]);
    // this will fire off when we click the button
  };
  return (
    <div className="App">
      <h1> Todo App </h1>
      <form>
        <FormControl>
          <InputLabel> Write a Todo </InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          onClick={addTodo}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>

        {/* <button onClick={addTodo} type="submit">Add Todo</button> */}
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
