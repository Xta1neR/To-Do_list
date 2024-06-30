import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const saveToLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAdd = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('');
    }
    saveToLS()
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLS()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLS()
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    handleDelete(id)
    saveToLS()
  };

  return (
    <>
      <Navbar />
      <div className="bg-yellow-100 container mx-auto my-5 p-5 rounded-xl min-h-[80vh] w-3/4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your Todos List</h1>
        </div>
        <br />
        <div className="addTodo text-center">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2 p-2 m-2 rounded-lg"
          />
          <button onClick={handleAdd} className="p-2 m-2 rounded-lg bg-blue-500 text-white">
            Add
          </button>
        </div>

        <br />
        <div className="todos">
          {todos.length === 0 && <div className="m-5 text-center text-lg font-bold text-red-500">No Todos</div>}
          {todos.map((item) => (
            <div className="todo align-middle flex w-1/2 justify-between items-center" key={item.id}>
              <input
                onChange={handleCheckbox}
                type="checkbox"
                checked={item.isCompleted}
                name={item.id} // Use item.id here instead of todo.id
                className="m-2"
              />
              <div className={item.isCompleted ? 'todo-item line-through' : 'todo-item'}>
                {item.todo}
              </div>
              <div className="button">
              <button
                  onClick={(e) => handleEdit(e,item.id)}
                  className="p-2 m-2 rounded-lg bg-green-500 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 m-2 rounded-lg bg-red-500 text-white"
                >
                  Delete
                </button>
                {/* Edit button implementation if needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
