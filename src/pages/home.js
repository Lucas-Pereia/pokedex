/* eslint-disable linebreak-style */
import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { ThemeContext, themes } from "../context/theme-context";
import axios from "axios";
import NavBar from "../components/navBar/navBar";
import PokemonCard from "../components/pokemonCard/pokemonCard";
import Footer from "../components/footer/footer";
import {
	Container,
	Grid,
	Button,
	Select,
	MenuItem,
	CircularProgress
} from "@mui/material";

// eslint-disable-next-line react/prop-types
const Home = ({setPokemonData}) => {
	const [pokemons, setPokemons] = useState([]);
	const [page, setPage] = useState(1);
	const [types, setTypes] = useState([]);
	const [selectedType, setSelectedType] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
	const {theme} = useContext(ThemeContext);

	const ITENS_PER_PAGE = 12;

	const getAllPokemonTypes = async () => {
		try{
			const response = await axios.get("https://pokeapi.co/api/v2/type/");
			const typesData = response.data.results.map((type) => type.name);
			setTypes(typesData);
		} catch (error) {
			console.error("Error when searching for Pokémon types:", error);
		}
	};

	useEffect(() => {
		getAllPokemonTypes();
		getPokemons();
	}, [page]);

	const getPokemons = () => {
		var endPoints = [];
		const offset = (page -1) * ITENS_PER_PAGE;

		for (var i = offset + 1; i <= offset + ITENS_PER_PAGE; i++) {
			endPoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
		}

		setIsLoading(true);
		axios.all(endPoints.map((endpoint) => axios.get(endpoint))).then((res) => {
			const newPokemons = res.map((pokemon) => pokemon.data);
			setPokemons(newPokemons);
			setIsLoading(false);
		});
	};

	const loadMorePokemons = () => {
		setPage(page + 1);
	};

	const filterPokemonsByType = async () => {
		if (selectedType === "") {
			setPage(1);
			setPokemons([]);
		} else {
			try {
				const response = await axios.get(
					`https://pokeapi.co/api/v2/type/${selectedType}`
				);

				const pokemonUrls = response.data.pokemon.map(
					(entry) => entry.pokemon.url
				);

				const promises = pokemonUrls.map(async (url) => {
					const res = await axios.get(url);
					return res.data;
				});

				setIsLoading(true);
				const filtered = await Promise.all(promises);
				setPokemons(filtered);
				setIsLoading(false);
			} catch (error) {
				console.error("Error when filtering Pokémon by type:", error);
			}
		}
	};

	const handleSearchChange = (event) => {
		if (event.target && event.target.value !== undefined) {
			setSearchTerm(event.target.value.toLowerCase());
		}
	};

	const filteredPokemons = pokemons.filter((pokemon) => {
		return pokemon.name.includes(searchTerm);
	});

	const handleTypeChange = (event) => {
		setSelectedType(event.target.value);
	};

	const handleSearchClick = () => {
		filterPokemonsByType();
	};

	const pokemonPickHandler = (pokemonData) => {
		setPokemonData(pokemonData);
		navigate("/profile");
	};

	const homeStyles = {
		flexDirection: "column",
		display: "flex",
		minHeight: "100vh",
		transition: "background-color 0.3s ease-in-out",
		backgroundColor: theme === themes.light ? "#3333aa" : "rgb(79, 75, 75)",
	};

	const buttonStyles = {
		color: "white",
		backgroundColor: "rgb(199, 30, 30)",
		margin: "10px auto",
		width: "250px",
	};

	const selectStyles = {
		backgroundColor: "white",
		margin: "10px auto",
		width: "250px",
	};

	return (
		<div style={homeStyles}>
			<NavBar 
				pokemonFilter={filterPokemonsByType}
				handleSearchChange={handleSearchChange}
			/>

			<Container maxWidth="false" sx={homeStyles}>
				<Select
					value={selectedType}
					onChange={handleTypeChange}
					style={selectStyles}
					displayEmpty
				>

					<MenuItem value="" disabled>
                        Search your Pokémon
					</MenuItem>
					<MenuItem value="">Search by type</MenuItem>
					{types.map((type) => (
						<MenuItem key={type} value={type}>
							{type}
						</MenuItem>
					))}            
				</Select>

				<Button
					variant="contained"
					onClick={handleSearchClick}
					style={buttonStyles}
				>
                Search
				</Button>
                
				<Grid container>
					{isLoading ? (
						<CircularProgress sx={{marginLeft: "50%", marginTop: "20px" }} />
					) : (
						filteredPokemons.map((pokemon, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<div onClick={() => pokemonPickHandler(pokemon)}>
                                    
									<PokemonCard 
										name={pokemon.name}
										image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
										types={pokemon.types}
										cardStyle={{
											backgroundColor: theme.cardBackground,
											color: theme.text,
										}}
										alt='Pokemon image'
									/>

								</div>
							</Grid>
						))
					)}
				</Grid>

				<div style={{textAlign: "center", margin:"20px" }}>
					<Button
						style={buttonStyles}
						variant="contained"
						onClick={loadMorePokemons}
					>
                        Load More
					</Button>
				</div>
			</Container>

			<Footer className="pokemon-footer" />

		</div>
	);
};

export default Home;