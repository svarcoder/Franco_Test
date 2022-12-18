import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const AddItem = () => {
	const history = useHistory();

	const [taskDetails, setTaskDetails] = useState({
		task: "",
	});

	const handelChange = (e) => {
		setTaskDetails({
			...taskDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onAdd = (taskDetails) => {
		let task = taskDetails.task;
		if (JSON.parse(localStorage.getItem("DATA") === null)) {
			localStorage.setItem("DATA", JSON.stringify([]));
		}
		var old_arr = JSON.parse(localStorage.getItem("DATA"));
		old_arr.push(JSON.stringify({ value: task, done: false }));
		localStorage.setItem("DATA", JSON.stringify(old_arr));
		history.push("/menu");
	};

	return (
		<>
			<div
				className=' d-flex justify-content-center'
				style={{ marginTop: "10%" }}>
				<div className='card w-100 loginCard' style={{ maxWidth: "800px" }}>
					<h2>Add Task</h2>
					<div className='card-body text-left'>
						<form>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Task</label>
								<input
									type='text'
									className='form-control'
									id='task'
									placeholder='Enter Task'
									value={taskDetails.task}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>

							<button
								type='submit'
								className='themeButton loginButton '
								onClick={() => onAdd(taskDetails)}>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddItem;
