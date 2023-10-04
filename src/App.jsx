import { useState } from "react";
import Modal from "react-modal";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");
  const [isMarried, setIsMarried] = useState(false);
  const [selected, setSelected] = useState(null);

  const openModal = (index) => {
    setSelected(index);
    setIsModalOpen(true);
    if (index !== null) {
      const todo = todos[index];
      setFirstName(todo.firstName);
      setLastName(todo.lastName);
      setAge(todo.age);
      setWork(todo.work);
      setIsMarried(todo.isMarried);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelected(null);
    clearForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      firstName,
      lastName,
      age,
      work,
      isMarried,
    };

    if (selected !== null) {
      const updatedTodos = [...todos];
      updatedTodos[selected] = newTodo;
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, newTodo]);
    }

    closeModal();
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setWork("");
    setIsMarried(false);
  };

  const handleEdit = (index) => {
    openModal(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Todo App</h1>
      <button
        className="px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => openModal(null)}
      >
        Add Todo
      </button>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Work</th>
            <th className="px-4 py-2">Married</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{todo.firstName}</td>
              <td className="px-4 py-2 border">{todo.lastName}</td>
              <td className="px-4 py-2 border">{todo.age}</td>
              <td className="px-4 py-2 border">{todo.work}</td>
              <td className="px-4 py-2 border">
                {todo.isMarried ? "Yes" : "No"}
              </td>
              <td className="flex justify-around py-2 border ">
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="mb-4 text-2xl font-bold">
          {selected !== null ? "Edit Todo" : "Add Todo"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-bold">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 border-2 border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-bold">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 border-2 border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-bold">
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="p-2 border-2 border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="work" className="block text-sm font-bold">
              Work:
            </label>
            <input
              type="text"
              id="work"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              className="p-2 border-2 border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isMarried" className="block text-sm font-bold">
              Married:
            </label>
            <select
              id="isMarried"
              value={isMarried}
              onChange={(e) => setIsMarried(e.target.value === "true")}
              className="p-2 border-2 border-gray-300"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            {selected !== null ? "Save" : "Add"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default App;
