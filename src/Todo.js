import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ImageIcon,
  Button
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    //update the todo with new input
    // <h1> update me </h1>
    db.collection("todos")
      .doc(props.todo.id)
      .set(
        {
          todo: input
        },
        { merge: true }
      );
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={e => setOpen(false)}>
        <div className={classes.paper}>
          <h1> Open</h1>
          <input
            placeholder={props.todo}
            value={input}
            onChange={event => setInput(event.target.value)}
          ></input>
          <Button onClick={updateTodo}> Update Todo</Button>
        </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary={props.text} />
        </ListItem>
        <Button onClick={e => setOpen(true)}>Edit Todo</Button>
        <DeleteForeverIcon
          onClick={event =>
            db
              .collection("todos")
              .doc(props.todo.id)
              .delete()
          }
        >
          DELETE ME
        </DeleteForeverIcon>
      </List>
    </>
  );
}

export default Todo;
