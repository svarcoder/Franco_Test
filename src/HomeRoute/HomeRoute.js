import React from "react";
import { Route, Switch } from "react-router";
import AddItem from "../Component/AddItem";
import Edit from "../Component/Edit";
import Login from "../Component/Login";
import Menu from "../Component/Menu";

const HomeRoute = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Login}></Route>
				<Route exact path='/menu' component={Menu}></Route>
				<Route exact path='/addItem' component={AddItem}></Route>
				<Route exact path='/editItem/:id' component={Edit}></Route>
			</Switch>
		</>
	);
};

export default HomeRoute;
