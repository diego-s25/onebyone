require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require('./db');

const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
	try {
		// const results = await db.query("SELECT * FROM restaurants");
		const restaurantRatingsData = await db.query(
			"SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
		);

		res.status(200).json({
			status: "success",
			results: restaurantRatingsData.rows.length,
			data: {
				restaurants: restaurantRatingsData.rows,
			}
		});	
	} catch (error) {
		console.log(error);
	}
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
	try {
		const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1", [req.params.id]);

		const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);

		res.status(200).json({
			status: "success",
			data: {
				restaurant: restaurant.rows[0],
				reviews: reviews.rows,
			}
		});
	} catch (error) {
		console.log(error)
	}
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
	try {
		const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);

		res.status(201).json({
			status: "success",
			data: {
				restaurant: results.rows[0],
			}
		});
	} catch (error) {
		console.log(error)
	}
});

// Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
	try {
		const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
		 
		res.status(200).json({
			status: "success",
			data: {
				restaurant: results.rows[0],
			}
		});
	} catch (error) {
		console.log(error)
	}
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
	try {
		const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id])
		res.status(204).json({
			status: "success",
		});
	} catch (error) {
		console.log(error)
	}
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
	try {
		const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", [req.params.id, req.body.name, req.body.review, req.body.rating]);
		console.log(newReview)
		res.status(201).json({
			status: 'success',
			data: {
				review: newReview.rows[0]
			}
		})
	} catch (error) {
		console.log(error)
	}
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});