import { useState } from "react";

interface ITodo {
  id: string;
  name: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: ITodo = {
        id: Date.now().toString(),
        name: inputValue,
        done: false,
      };
      setTodos((prev) => [...prev, newTodo]);
      setInputValue("");
    }
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const markAsComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full max-w-2xl flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">Todo App</h1>

      {/* Search Input */}
      <div className="w-full flex space-x-2">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {/* Add Todo Input */}
      <div className="w-full flex space-x-2">
        <input
          type="text"
          placeholder="Enter a todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          required
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full space-y-2">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center border rounded px-3 py-2 bg-gray-50"
            >
              <span
                className={`flex-1 text-lg ${
                  todo.done ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.name}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => markAsComplete(todo.id)}
                  className={`px-3 py-1 rounded shadow ${
                    todo.done
                      ? "bg-gray-400 hover:bg-gray-500 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {todo.done ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No todos found!</p>
        )}
      </div>
    </div>
  );
}

export default App;
