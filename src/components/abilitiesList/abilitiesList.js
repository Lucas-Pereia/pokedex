/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from "react";
import "./abilitiesList.css";

const AbilitiesList = ({itens, index}) => {
	return(
		<div className="abilitiesList">
			<p key={index}>{itens.map(item =>(`${item.ability.name } `))}</p>
		</div>
	);
};


export default AbilitiesList;