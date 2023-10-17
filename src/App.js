import "./App.css";
import React,{useContext} from "react";
import {ThemeProvider, themes, ThemeContext} from "./context/theme-context";
import Router from "./routes/index";

function App() {
	const {theme} = useContext(ThemeContext);

	const bodyClass = theme === themes.light ? "theme-light" : "theme-dark";

	return (
		<div className={bodyClass}>
			<ThemeProvider>
				<Router/>
			</ThemeProvider>
		</div>
	);
}

export default App;
