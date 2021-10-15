import { useState } from 'react';

function App() {
  const [todoState, setTodoState] = useState([]);
  const [formState, setFormState] = useState({ text: '' });

  //Event handler
  const handleOnChange = (event) => {
    event.preventDefault();
    setFormState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setTodoState((state) => [...state, { ...formState, isDone: false }]);
    setFormState({ text: '' });
  };

  const handleOnDelete = (item, index) => (event) => {
    setTodoState((todoState) => [
      ...todoState.slice(0, index),
      ...todoState.slice(index + 1),
    ]);
  };

  const handleOnToggle = (item, index) => (event) => {
    setTodoState((todoState) => [
      ...todoState.slice(0, index),
      { ...item, isDone: !item.isDone },
      ...todoState.slice(index + 1),
    ]);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          name='text'
          type='text'
          placeholder='Item text'
          onChange={handleOnChange}
          value={formState.text}
        />
        <button type='submit'>Add Item</button>
      </form>
      <div>
        {todoState.map((item, index) => (
          <div key={index}>
            <button type='button' onClick={handleOnToggle(item, index)}>
              {item.isDone ? 'Mark as todo' : 'Mark as done'}
            </button>
            {item.text}{' '}
            <button type='button' onClick={handleOnDelete(item, index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
