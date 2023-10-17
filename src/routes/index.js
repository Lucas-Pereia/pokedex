/* eslint-disable linebreak-style */
import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/home";
import Profile from "../pages/profile";
import {BrowserRouter} from "react-router-dom/dist";

const Router = () => {

	const [pokemonData, setPokemonData] = useState();

	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home setPokemonData ={setPokemonData} />} />
				<Route path="/profile" element={<Profile pokemonData={pokemonData} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;