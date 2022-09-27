import React, { useContext, useEffect } from 'react';
import OneByOne from "../apis/OneByOne";
import {
	Table,
	Button
} from "reactstrap";
import { RestaurantsContext } from '../context/RestaurantContext';
import UpdateRestaurantModal from './UpdateRestaurantModal';
import { useNavigate } from "react-router-dom";
import Rating from './Rating';

const RestaurantList = (props) => {
	const {restaurants, setRestaurants} = useContext(RestaurantsContext)
	let navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await OneByOne.get("/");
				setRestaurants(response.data.data.restaurants);
			} catch (error) {
				console.log(error)
			}
		};

		fetchData();
	}, [])

	const handleDelete = async (e, id) => {
		e.stopPropagation();
		try {
			const response = await OneByOne.delete(`/${id}`)
			setRestaurants(restaurants.filter(restaurant => {
				return restaurant.id !== id
			}));
		} catch (error) {
			console.log(error)
		}
	}

	const handleRestaurantSelect = (id) => {
		navigate(`/restaurants/${id}`);
	}

	const getRating = (restaurant) => {
		if(!restaurant.count){
			return (
				<span>No reviews</span>
			)
		}
		return (
			<>
				<Rating rating={restaurant.average_rating} />
				<span className="ml-1">({restaurant.count})</span>
			</>
		)
	}
	
	return (
		<div>
			<Table dark>
  			<thead>
					<tr>
    			<th>
						Restaurant
    			</th>
					<th>
						Location
    			</th>
					<th>
						Price range
    			</th>
					<th>
						Ratings
    			</th>
					<th>
						
    			</th>
					<th>
						
    			</th>
					</tr>
  			</thead>
  			<tbody>
					{restaurants && restaurants.map(restaurant => {
							return(
								<tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
									<td>{restaurant.name}</td>
									<td>{restaurant.location}</td>
									<td>{"$".repeat(restaurant.price_range)}</td>
									<td>{getRating(restaurant)}</td>
									<td>
										<UpdateRestaurantModal restaurant={restaurant}/>
									</td>
									<td>
										<Button onClick={(e) => handleDelete(e, restaurant.id)}>
											Delete
										</Button>
									</td>
								</tr>
							)
						})}
					{/* <tr>
						<td>Wendys</td>
						<td>San Salvador</td>
						<td>$$</td>
						<td>Rating</td>
						<td>
							<Button>
								Edit
							</Button>
						</td>
						<td>
							<Button>
								Delete
							</Button>
						</td>
					</tr> */}
  			</tbody>
			</Table>
		</div>
	)
}

export default RestaurantList
