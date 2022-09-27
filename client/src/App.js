import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { RestaurantsContextProvider } from './context/RestaurantContext';
import HomePage from './routes/HomePage';
import SingleRestaurantPage from './routes/SingleRestaurantPage';

const App = () => {
	return (
		<RestaurantsContextProvider>
		<div>
			<Router>
				<Routes>
					<Route exact path="/" element={<HomePage/>}/>
					<Route exact path="/restaurants/:id" element={<SingleRestaurantPage/>}/>
				</Routes>
			</Router>
		</div>
		</RestaurantsContextProvider>
	)
}

export default App;