import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Context from "../Context/Context";
import { TASK_DETAILS } from "../Context/action.type";

const Menu = () => {
	let history = useHistory();
	const [content, setContent] = useState([]);
	const [details, setDetails] = useState([]);
	const [contentView, setContentView] = useState(false);
	const { dispatchDetails } = useContext(Context);

	useEffect(() => {
		const allData = JSON.parse(localStorage.getItem("DATA"));
		var myArray = [];

		if (allData)
			for (let i = 0; i < allData.length; i++) {
				let obj = JSON.parse(allData[i]);
				myArray.push(obj);
			}
		setContent(myArray);
	}, [contentView]);

	const Delete = (value, i) => {
		let displayItems = JSON.parse(localStorage.getItem("DATA"));
		displayItems.splice(i, 1);
		localStorage.setItem("DATA", JSON.stringify(displayItems));
		setContentView(!contentView);
	};

	const Edit = (value, i) => {
		dispatchDetails({
			type: TASK_DETAILS,
			payload: { value },
		});
		history.push(`/editItem/${i}`);
	};

	const LogOut = (value, i) => {
		localStorage.removeItem("name");
		localStorage.removeItem("password");
		return history.push("/");
	};

	const View = (value, k) => {
		let displayItems = JSON.parse(localStorage.getItem("DATA"));
		var myArray = [];
		for (let i = 0; i < displayItems.length; i++) {
			let obj = JSON.parse(displayItems[i]);
			if (i === k) {
				myArray.push(obj.value);
			} else {
				setDetails([]);
			}
			setDetails(myArray);
		}
	};

	const Done = (value, i) => {
		let displayItems = JSON.parse(localStorage.getItem("DATA"));
		displayItems.splice(
			i,
			1,
			JSON.stringify({
				value: value,
				done: true,
			})
		);
		localStorage.setItem("DATA", JSON.stringify(displayItems));
		setContentView(!contentView);
	};

	return (
		<>
			<div
				className=' d-flex justify-content-center'
				style={{ marginTop: "5%" }}>
				<div className='card w-100 loginCard' style={{ maxWidth: "800px" }}>
					<h2>Todo App</h2>
					<div className='card-body text-left'>
						<div className='d-flex flex-row p-0 justify-content-between align-items-center'>
							<button
								type='button'
								className='themeButton loginButton ml-2'
								onClick={() => history.push("/addItem")}>
								Add
							</button>

							<button
								type='button'
								className='themeButton loginButton ml-4'
								onClick={() => LogOut()}>
								LogOut
							</button>
						</div>

						<table className='table table-borderless'>
							<thead>
								<tr>
									<th scope='col'>Id</th>
									<th scope='col'>Task</th>
									<th scope='col'>Action</th>
								</tr>
							</thead>
							<tbody>
								{content &&
									content.map((value, i) => (
										<tr>
											<th scope='row'>{i + 1}</th>
											<td>
												<p
													data-toggle='modal'
													data-target='#exampleModal'
													onClick={() => View(value, i)}>
													{value.value}
												</p>
											</td>
											<td>
												<div className='d-flex flex-row p-0 justify-content-start align-items-center'>
													<button
														type='button'
														className='themeButton loginButton ml-2'
														onClick={() => Edit(value.value, i)}>
														Edit
													</button>
													<button
														type='button'
														className='themeButton loginButton ml-2'
														onClick={() => Delete(value.value, i)}>
														Delete
													</button>
													{value.done === false ? (
														<button
															type='button'
															className='themeButton loginButton ml-2'
															onClick={() => Done(value.value, i)}>
															Done
														</button>
													) : (
														""
													)}
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div
				className='modal fade'
				id='exampleModal'
				tabindex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Details
							</h5>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>{details}</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-dismiss='modal'>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Menu;
