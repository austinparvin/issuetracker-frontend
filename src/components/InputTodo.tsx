import { Button, Stack, TextField } from "@mui/material";
import React, { useState, FormEvent } from "react";

interface InputTodoProps { }

function InputTodo(props: InputTodoProps) {
  const [description, setDescription] = useState<string>("");

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location.href = "/";
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Stack padding={2} direction="row">
      <form onSubmit={onSubmitForm}>
        <Stack spacing={2} direction="row">
          <TextField
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="contained" type="submit">Submit</Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default InputTodo;
