import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import Context from "../Context/Context";

const Edit = () => {
	const history = useHistory();
	const { details } = useContext(Context);
	const params = useParams();
	const [taskDetails, setTaskDetails] = useState({
		task: "",
	});

	useEffect(() => {
		if (!details) return;
		setTaskDetails({
			task: details?.value.replace(/['"]+/g, ""),
		});
	}, [details]);

	const handelChange = (e) => {
		setTaskDetails({
			...taskDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onLogIn = (taskDetails) => {
		let displayItems = JSON.parse(localStorage.getItem("DATA"));
		displayItems.splice(
			params.id,
			1,
			JSON.stringify({
				value: taskDetails?.task,
				done: false,
			})
		);
		localStorage.setItem("DATA", JSON.stringify(displayItems));
		history.push("/menu");
	};

	if (details == null) {
		return <Redirect to='/' />;
	}

	return (
		<>
			<div
				className=' d-flex justify-content-center'
				style={{ marginTop: "10%" }}>
				<div className='card w-100 loginCard' style={{ maxWidth: "800px" }}>
					<h2>Edit Task</h2>
					<div className='card-body text-left'>
						<form>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Task</label>
								<input
									type='text'
									className='form-control'
									id='task'
									placeholder='Task'
									value={taskDetails.task}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>

							<button
								type='submit'
								className='themeButton loginButton '
								onClick={(e) => onLogIn(taskDetails)}>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
