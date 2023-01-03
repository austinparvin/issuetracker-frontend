import { Box } from '@mui/material';
import React from 'react';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      bgcolor: 'background.paper',
      color: 'text.primary',
    }}>
      TEST
      <InputTodo />
      <TodoList />
    </Box>

  );
}

export default App;
