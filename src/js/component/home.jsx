import React, { useEffect } from "react";
import { useState } from "react";

//create your first component
const Home = () => {
	const [cantidad, setCantidad] = useState(0);
	const [todos, setTodos] = useState([]);

	const postUsuario = () => {
		let url = "https://assets.breatheco.de/apis/fake/todos/user/eligraciel";
		let optionsPOST = {
			method: "POST",
			body: JSON.stringify([todos]),
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(url, optionsPOST)
			.then(resp => resp.json())
			.catch(error => console.error("Error:", error))
			.then(response => console.log("Success:", response));
	};

	useEffect(() => {
		postUsuario();
	}, []);

	async function sent(todos) {
		try {
			let arr = [];
			for (let index = 0; index < todos.length; index++) {
				arr.push({ label: todos[index], done: false });
				console.log(arr);
			}
			let url =
				"https://assets.breatheco.de/apis/fake/todos/user/eligraciel";
			let optionsPUT = {
				method: "PUT",
				body: JSON.stringify(arr),
				headers: {
					"Content-Type": "application/json"
				}
			};
			const response = await fetch(url, optionsPUT);
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function getTask() {
		try {
			let url =
				"https://assets.breatheco.de/apis/fake/todos/user/eligraciel";
			let optionsGET = {
				method: "GET"
			};
			const response = await fetch(url, optionsGET);
			const task = await response.json();
			let tareas = task.map(function(valor) {
				return valor.label;
			});

			// Elements ya ha sido procesado
			console.log(tareas);
			return tareas;
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function cargar(e) {
		try {
			//loadTask(e.target.value);

			let padre = document.querySelector("ul");
			let tareas = await getTask();
			tareas.push(e);
			sent(tareas);
			padre.innerHTML = "";

			for (let index = 0; index < tareas.length; index++) {
				let hijo = document.createElement("li");
				hijo.innerHTML = tareas[index];
				hijo.className = "list-group-item";
				hijo.id = index;
				hijo.onclick = function() {
					let indice = this.id;
					putDelete(indice);
					this.remove();
					setCantidad(document.querySelectorAll("li").length);
				};
				padre.appendChild(hijo);
				setCantidad(document.querySelectorAll("li").length);
			}

			//hijo.innerHTML = e.target.value;
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function recargar(arr) {
		try {
			let padre = document.querySelector("ul");
			padre.innerHTML = "";

			for (let index = 0; index < arr.length; index++) {
				let hijo = document.createElement("li");
				hijo.innerHTML = arr[index];
				hijo.className = "list-group-item";
				hijo.id = index;
				hijo.onclick = function() {
					let indice = this.id;
					putDelete(indice);
					this.remove();
					setCantidad(document.querySelectorAll("li").length);
				};
				padre.appendChild(hijo);
				setCantidad(document.querySelectorAll("li").length);
			}
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function putDelete(id) {
		try {
			let arr = await getTask();
			arr.splice(id, 1);
			await sent(arr);
			recargar(arr);
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}

	async function deleteAll() {
		try {
			let url =
				"https://assets.breatheco.de/apis/fake/todos/user/eligraciel";
			let optionsDelete = {
				method: "DELETE"
			};
			const response = await fetch(url, optionsDelete);
			let padre = document.querySelector("ul");
			padre.innerHTML = "";
			postUsuario();
			setCantidad(0);
		} catch (error) {
			console.warn("Ha ocurrido un error: ", error);
		}
	}
	return (
		<>
			<div className="container">
				<div className="card">
					<div className="card-header">
						<input
							name="name"
							id="name"
							placeholder="ToDo"
							onKeyPress={e => {
								if (
									e.key === "Enter" &&
									e.target.value !== ""
								) {
									let newTask = e.target.value;
									cargar(newTask);
									e.target.value = "";
								}
							}}></input>
					</div>
					<ul className="list-group list-group-flush"></ul>
					<div className="card-footer bg-info border-success">
						Total task: {cantidad}
					</div>
					<div
						className="col-md-2 btn btn-danger"
						onClick={deleteAll}>
						Delete list
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
