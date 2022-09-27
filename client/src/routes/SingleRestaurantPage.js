import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Container } from 'reactstrap';
import OneByOne from '../apis/OneByOne';
import Rating from '../components/Rating';
import Reviews from '../components/Reviews';
import { RestaurantsContext } from '../context/RestaurantContext';
import Header from '../components/Header'
import AddReview from '../components/AddReview';

const SingleRestaurantPage = () => {
	const {id} = useParams();
	const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await OneByOne.get(`/${id}`);
				setSelectedRestaurant(response.data.data);
			} catch (error) {
				console.log(error)
			}
		}

		fetchData();
	}, [])

	return (
		<div>
		<Header/>
		<Container>
			{selectedRestaurant && (
				<>
					<h1>
						{selectedRestaurant.restaurant.name}
					</h1>
					<div>
						<Rating rating={selectedRestaurant.restaurant.average_rating}/>
						<span>
							{selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
						</span>
					</div>
					<div className="mt-4">
						<Reviews reviews={selectedRestaurant.reviews}/>
					</div>
					<AddReview />
				</>
			)}
		</Container>
		</div>
	)
}

export default SingleRestaurantPage
