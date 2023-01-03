import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

interface Todo {
  todo_id: number;
  description: string;
}

export interface IEditTodoProps {
  todo: Todo;
}

const updateTodo = async (id: number, description: string) => {
  try {
    const body = { description };
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    window.location.href = "/";
  } catch (err: any) {
    console.error(err.message);
  }
};


export default function EditTodo(props: IEditTodoProps) {
  const { todo } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(props.todo.description);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a new description for the todo.
          </DialogContentText>
          <TextField
            autoFocus
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => updateTodo(todo.todo_id, description)} type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
