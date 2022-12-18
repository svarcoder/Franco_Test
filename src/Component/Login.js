import React, { useState } from "react";
import { useHistory } from "react-router";

const Login = () => {
	const history = useHistory();

	const [taskDetails, setTaskDetails] = useState({
		userName: "",
		password: "",
	});

	const handelChange = (e) => {
		setTaskDetails({
			...taskDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onLogIn = (e) => {
		e.preventDefault();
		var value1 = ["subham", "char", "vai"];
		var value2 = ["12345", "123456", "12345678"];

		localStorage.setItem("name", JSON.stringify(value1));
		localStorage.setItem("password", JSON.stringify(value2));

		var storedName = JSON.parse(localStorage.getItem("name"));
		var storedPw = JSON.parse(localStorage.getItem("password"));
		if (
			storedName.includes(taskDetails.userName) &&
			storedPw.includes(taskDetails.password)
		) {
			alert("You are loged in.");
			history.push("/menu");
		} else {
			alert("ERROR.");
		}
	};

	return (
		<>
			<div
				className=' d-flex justify-content-center'
				style={{ marginTop: "10%" }}>
				<div className='card w-100 loginCard' style={{ maxWidth: "800px" }}>
					<h2>Log In</h2>
					<div className='card-body text-left'>
						<form>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Username</label>
								<input
									type='text'
									className='form-control'
									id='userName'
									placeholder='Enter Username'
									value={taskDetails.userName}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Password</label>
								<input
									type='password'
									className='form-control'
									id='password'
									placeholder='*****'
									value={taskDetails.password}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>

							<button
								type='submit'
								className='themeButton loginButton '
								onClick={(e) => onLogIn(e)}>
								Log In
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
