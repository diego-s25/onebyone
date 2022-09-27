import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';


const Rating = ({rating}) => {
	const stars = [];

	for(let i = 1; i<=5; i++){
		if(i <= rating){
			stars.push(
				<FontAwesomeIcon key={i} icon={faStar} />
			)
		} else if (i===Math.ceil(rating) && !Number.isInteger(rating)){
			stars.push(
				<FontAwesomeIcon key={i} icon={faStarHalfStroke} />
			)
		} else {
			stars.push(
				<FontAwesomeIcon key={i} icon={faStarEmpty} />
			)
		}
	}
	return <>{stars}</>
}

export default Rating
