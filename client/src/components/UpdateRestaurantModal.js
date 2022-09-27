import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import OneByOne from '../apis/OneByOne';

const UpdateRestaurantModal = (props) => {
	const [modal, setModal] = useState(false);
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [priceRange, setPriceRange] = useState("");

	useEffect(() => {
		const setData = () => {
			setName(props.restaurant.name);
			setLocation(props.restaurant.location);
			setPriceRange(props.restaurant.price_range);
		}

		setData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updatedRestaurant = await OneByOne.put(`/${props.restaurant.id}`, {
			name,
			location,
			price_range: priceRange
		});
		toggle();
		window.location.reload(false);
	}

  const toggle = (e) => {
		e.stopPropagation();
		setModal(!modal);
	}
	return (
		<div>
			<Button onClick={(e) => toggle(e)}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit restaurant</ModalHeader>
        <ModalBody>
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
      					<FormGroup>
        					<Input
          					id="location"
          					name="location"
										placeholder="Location"
										value={location}
										onChange={e => setLocation(e.target.value)}
        					/>
     	 					</FormGroup>
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
						</Row>
					</Form>
        </ModalBody>
        <ModalFooter>
					<Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button type="submit" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
		</div>
	)
}

export default UpdateRestaurantModal
