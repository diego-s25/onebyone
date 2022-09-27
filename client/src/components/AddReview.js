import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Form, Row, Col, FormGroup, Input, Button } from 'reactstrap';
import OneByOne from '../apis/OneByOne';


const AddReview = () => {
	const { id } = useParams();

	const [name, setName] = useState("");
	const [rating, setRating] = useState("Rating");
	const [reviewText, setReviewText] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await OneByOne.post(`/${id}/addReview`, {
				name,
				review: reviewText,
				rating
			})
			window.location.reload(false);
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
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
          			id="rating"
          			name="rating"
								type="select"
								value={rating}
								onChange={e => setRating(e.target.value)}
        			>
								<option disabled>Rating</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
							</Input>
      			</FormGroup>
    			</Col>
				</Row>
				<Row>
					<Col>
      			<FormGroup>
        			<Input
          			id="reviewText"
          			name="reviewText"
								type="textarea"
								placeholder="Review"
								value={reviewText}
								onChange={e => setReviewText(e.target.value)}
        			/>
     	 			</FormGroup>
    			</Col>
				</Row>
						<Button type="submit" onClick={handleSubmit}>
							Add
						</Button>
			</Form>
		</div>
	)
}

export default AddReview
