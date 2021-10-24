import React from "react";
import { useState } from "react";

//create your first component
const Home = () => {
	const [cantidad, setCantidad] = useState(0);
	//const [lista, setLista] = useState([]);

	return (
		<>
			<div className="container">
				<div className="card">
					<div className="card-header">
						<input
							name="name"
							id="name"
							placeholder="¿Tienes tareas pendiente?"
							onKeyPress={e => {
								if (
									e.key === "Enter" &&
									e.target.value !== ""
								) {
									let padre = document.querySelector("ul");
									let hijo = document.createElement("li");
									hijo.innerHTML = e.target.value;
									hijo.className = "list-group-item";
									hijo.onclick = function() {
										this.remove();
										setCantidad(
											document.querySelectorAll("li")
												.length
										);
									};
									padre.appendChild(hijo);
									e.target.value = "";
									setCantidad(
										document.querySelectorAll("li").length
									);
								}
							}}></input>
					</div>
					<ul className="list-group list-group-flush"></ul>
					<div className="card-footer bg-info border-success">
						Tareas por hacer: {cantidad}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
