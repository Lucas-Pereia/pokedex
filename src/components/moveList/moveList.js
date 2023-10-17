/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from "react";
import "./moveList.css";

const MoveList = ({itens, index}) => {
	return(
		<div className="moveList">
			<p key={index}>
				{itens.map(item =>(`${item.move.name} `))}
			</p>
		</div>
	);
};

export default MoveList;