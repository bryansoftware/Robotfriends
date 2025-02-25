import React from 'react';
import './Card.css';

// destructure the props straight into the arguments
// otherwise you can do {props.name} or {props.email} etc
const Card = ({ name, email, id }) => {
	return(				// can only return 1 thing per Component, so make sure everything is wrapped in one big <div>
		<>
			<div class='card'>
				<img alt='robots' src={`https://robohash.org/${id}?100x100`} />
				<div>
					<h3>{name}</h3>
					<p>{email}</p>
				</div>
			</div>
		</>
	);
}

export default Card;