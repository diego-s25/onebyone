import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'

import { Container } from "reactstrap";

const HomePage = () => {
	return (
		<div>
		<Header/>
		<Container>
			<AddRestaurant/>
			<RestaurantList/>
		</Container>
		</div>
	)
}

export default HomePage

