import React, { useState } from "react";

//include images into your bundle


//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [todos, setTodos] = useState([]);
	return (
		<div className="container">
			<h1 className="head">todos</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={(e) => {
							if (e.key === "Enter" && inputValue.trim() !== "") {
								setTodos(todos.concat(inputValue.trim()));
								setInputValue("");
							}
						}}


						placeholder="What needs to be done?"></input>
				</li>

				{todos.length === 0 && (
					<li className="empty-message">Empty list</li>
				)}

				{todos.map((item, index) => (
					<li key={index}>
						{item}{""}
						<i
							className="fa-solid fa-xmark"
							onClick={() =>
								setTodos(
									todos.filter(
										(t, currentIndex) =>
											index != currentIndex
									)
								)
							} ></i>
					</li>
				))}
				<li>
					<div>{todos.length} item left</div>
				</li>
			</ul>
		</div>
	);
};

export default Home;