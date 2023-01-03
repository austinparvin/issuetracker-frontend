import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

export interface ITodoListProps { }

export default function TodoList(props: ITodoListProps) {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo: any) => todo.todo_id !== id));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                Todo
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ width: "20%" }}>
              <Typography variant="h6">
                Edit
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ width: "20%" }}>
              <Typography variant="h6">
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo: any) => (
            <TableRow key={todo.todo_id}>
              <TableCell component="th" scope="row">
                {todo.description}
              </TableCell>
              <TableCell align="center">
                <EditTodo todo={todo} />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
