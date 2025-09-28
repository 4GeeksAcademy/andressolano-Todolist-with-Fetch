import React, { useState, useEffect } from "react";

//include images into your bundle


//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [todos, setTodos] = useState([]);
	const username = "andres33";

	const createUser = async () => {
		try {
			const res = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			});

			if (res.ok) {
				console.log("Usuario creado");
			} else {
				console.log("Usuario ya existe o hubo un error");
			}

			await fetchTodos();
		} catch (error) {
			console.error("Error creando usuario:", error);
		}
	};


	const fetchTodos = async () => {
		try {
			const res = await fetch(`https://playground.4geeks.com/todo/users/${username}`);
			const data = await res.json();
			setTodos(data.todos);
		} catch (error) {
			console.error("Error cargando tareas:", error);
		}
	};

	const addTodo = async () => {
		if (inputValue.trim() === "") return;

		try {
			const res = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: inputValue.trim(),
					is_done: false
				})
			});

			if (res.ok) {
				setInputValue("");
				await fetchTodos();
			} else {
				console.error("Error al agregar tarea");
			}
		} catch (error) {
			console.error("Error en addTodo:", error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const res = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			});

			if (res.ok) {
				await fetchTodos(); // actualizar lista
			} else {
				console.error("Error al eliminar tarea");
			}
		} catch (error) {
			console.error("Error en deleteTodo:", error);
		}
	};

	const clearAllTodos = async () => {
		try {
			for (let todo of todos) {
				await fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
					method: "DELETE"
				});
			}
			await fetchTodos(); // actualizar lista
		} catch (error) {
			console.error("Error al limpiar tareas:", error);
		}
	};


	useEffect(() => {
		createUser();
	}, []);


	return (
		<div className="container">
			<h1 className="head">todos</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								addTodo();
							}
						}}



						placeholder="What needs to be done?"></input>
				</li>

				{todos.length === 0 && (
					<li className="empty-message">Empty list</li>
				)}

				{todos.map((item, index) => (
					<li key={index}>
						{item.label}

						<i
							className="fa-solid fa-xmark"
							onClick={() => deleteTodo(item.id)}
						></i>
					</li>
				))}
				<li>
					<div>{todos.length} item left</div>
				</li>
			</ul>

			<button onClick={clearAllTodos} className="btn btn-danger">
				Clear All
			</button>

		</div>
	);
};

export default Home;