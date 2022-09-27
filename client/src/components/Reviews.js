import React from 'react'
import { Card, CardHeader, Container, CardBody, CardText, Row } from 'reactstrap';
import Rating from './Rating';

const Reviews = ({reviews}) => {
	return (
		<Container>
		<Row className="mb-3">
			{reviews.map(review => {
				return (
					<Card
						key={review.id}
    				className="my-2 mx-1"
    				color="dark"
    				inverse
    				style={{
      				maxWidth:'30%',
							borderRadius: '10px'
    				}}
  				>
    			<CardHeader>
      			{review.name}
						<div style={{float: 'right', color: '#FFD700'}}>
							<Rating rating={review.rating}/>
						</div>
    			</CardHeader>
    			<CardBody>
      			<CardText>
        			{review.review}
      			</CardText>
    			</CardBody>
  			</Card>
				)
			})}
	</Row>
	</Container>
	)
}

export default Reviews
