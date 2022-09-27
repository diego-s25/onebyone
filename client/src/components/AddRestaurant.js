import React, { useContext, useState } from 'react';
import OneByOne from "../apis/OneByOne";
import {
	Row,
	Col,
	Form,
	FormGroup,
	Input,
	Button
} from "reactstrap";
import { RestaurantsContext } from '../context/RestaurantContext';

const AddRestaurant = () => {
	const { addRestaurant } = useContext(RestaurantsContext);
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [priceRange, setPriceRange] = useState("Price range");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await OneByOne.post("/", {
				name,
				location,
				price_range: priceRange
			})
			addRestaurant(response.data.data.restaurant);
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="mb-4">
			<Form>
				<Row>
					<Col>
      			<FormGroup>
        			<Input
          			id="name"
          			name="name"
								placeholder="Name"
								value={name}
								onChange={e => setName(e.target.value)}
        			/>
     	 			</FormGroup>
    			</Col>
    			<Col>
      			<FormGroup>
        			<Input
          			id="location"
          			name="location"
								placeholder="Location"
								value={location}
								onChange={e => setLocation(e.target.value)}
        			/>
     	 			</FormGroup>
    			</Col>
    			<Col>
      			<FormGroup>
        			<Input
          			id="price_range"
          			name="price_range"
								type="select"
								value={priceRange}
								onChange={e => setPriceRange(e.target.value)}
        			>
								<option disabled>Price range</option>
								<option value={1}>$</option>
								<option value={2}>$$</option>
								<option value={3}>$$$</option>
								<option value={4}>$$$$</option>
								<option value={5}>$$$$$</option>
							</Input>
      			</FormGroup>
    			</Col>
					<Col>
						<Button type="submit" onClick={handleSubmit}>
							Add
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	)
}

export default AddRestaurant
