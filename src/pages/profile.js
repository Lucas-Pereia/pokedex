/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, {useContext, useEffect, useState} from "react";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import {ThemeContext, themes} from "../context/theme-context";
import NavBar from "../components/navBar/navBar";
import MoveList from "../components/moveList/moveList";
import AbilitiesList from "../components/abilitiesList/abilitiesList";
import Footer from "../components/footer/footer";
import "./profile.css";

const Profile = ({pokemonData}) => {
	const navigate = useNavigate();
	const {theme} = useContext(ThemeContext);
	const [localTheme, setLocalTheme] = useState(themes.light);

	useEffect(() => {
		setLocalTheme(theme);
	}, [theme]);

	const handleBackToHome = () => {
		navigate("/");
	};

	const profileStyles = {
		backgroundColor: localTheme === themes.light ? "#ffff00" : "#333333",
		color: localTheme === themes.light ? "#000000" : "#ffffff",
		borderRadius: "15px",
		padding: "20px",
		margin: "20px",
		transition: "background-color 0.3s ease-in-out",
	};

	const pageStyles = {
		backgroundColor: localTheme === themes.light ? "#0000ff" : "#4f4b4b", 
		minHeight: "100vh", 
	};

	return (
		<div style={pageStyles}>
			<NavBar hideSearch />
			<div style={{display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "calc(100vh - 150px)"            
			}}>
                                
				<Container maxWidth="md" style={profileStyles}>
					<div className="pokeCard pokemon-card">
						<button className="back-button" onClick={handleBackToHome}>
							<FiArrowLeft />
						</button>

						<h3>{pokemonData.name}</h3>
						<p>Type: {pokemonData.types.map((pokemon) => pokemon.type.name)}</p>
                        

						<img 
							src={pokemonData.sprites.front_default}
							alt= "pokemon"
							width="50%"
							height="50%"
						/>                      

						<h2>Move List</h2>
						<MoveList itens={pokemonData.moves} />

						<h2>Abilities</h2>
						<AbilitiesList itens={pokemonData.abilities} />

					</div>
				</Container>
			</div>
			<Footer />
		</div>
	);
};

export default Profile;