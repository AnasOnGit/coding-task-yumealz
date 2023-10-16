# 👨‍💻Yumealz Coding Task

This project is my submission for Yumealz coding task, which includes the following requirements:

## Requirements

1. The user should be able to view orders.
2. The user should be able to view a single order.
3. The user should be able to view captains.
4. The user should be able to view a captain page, which includes some statistics about the captain's performance.
5. The user should be able to assign a captain for a set of orders.
6. The user should be able to view an additional captain's performance report.

### Optional Task

- (FRONTEND) Develop a dynamic comparison page that visually contrasts the performance, achievements, and attributes of two captains.

- (BACKEND) Implement an endpoint that generates an estimation of a
delivery date for a given order based on the delivery distance and the
expected load in your system while taken into consideration historical of
the captain data in building the estimation, feel free to build historical
dummy data (or use any publicly published dataset) to aid you in building
a solution with high accuracy.


## API Endpoints

1. `/api/order`
   - Description: Get a list of all orders.
2. `/api/order/{order_id}`
   - Description: Get details of a specific order by ID.
3. `/api/order/new/`
   - Description: Create a new order.
4. `/api/order/assign/`
   - Description: Assign a captain to a order.
5. `/api/order/{order_id}/assign/{captainId}`
   - Description: Assign a specific captain to a set of orders.
6. `/api/order/{order_id}/deliver`
   - Description: Mark a specific order as delivered.
7. `/api/captain`
   - Description: Get a list of all captains.
8. `/api/captain/{captain_id}`
   - Description: Get details of a specific captain by ID.

## Front End Endpoints

1. `/`
   - Description: Landing page.
2. `/order`
   - Description: Page displaying all orders.
3. `/order/{order_id}`
   - Description: Page displaying details of a specific order.
4. `/captain`
   - Description: Page displaying all captains.
5. `/captain/{captain_id}`
   - Description: Page displaying details of a specific captain.
6. `/captain/{captain_id}/orders`
   - Description: Page displaying orders assigned to a specific captain.
7. `/captain/compare`
   - Description: Dynamic page that visually contrasts the performance, achievements, and attributes of two captains.


## Getting Started

To view the final project, you can visit the [website](https://coding-task-yumealz.vercel.app/). To run it locally, follow these steps:

1. Clone the project.
2. Run `npm install`.
3. Run `npm run dev`.
4. Visit [http://localhost:3000](http://localhost:3000).

Please note that this project requires the following environment variable for database connection: `DATABASE_URL`.

## Database

Initially, the project used MySQL, but due to issues in production, it was migrated to PostgreSQL with Supabase. Here is the database schema:

### Captains model

- Fields:
  - `id`
  - `name`
  - `email`
  - `phone_number`
  - `joining_date`
  - `status`
- Relationships:
  - `captain_statistic`
  - `captain_attributes`
  - `orders`

### Captain Attributes

- Fields:
  - `id`
  - `captain_id`
  - `vehicle_type`
  - `vehicle_model`
  - `vehicle_color`
  - `vehicle_plate_number`

### Captain Statistics

- Fields:
  - `id`
  - `captain_id`
  - `total_distance_traveled`
  - `total_orders_delivered`
  - `total_orders_canceled`
  - `total_orders_rejected`
  - `total_orders_accepted`
  - `total_rating`

### Customer model

- Fields:
  - `id`
  - `name`
  - `email`
  - `phone_number`
  - `customer_longitude`
  - `customer_latitude`

### Orders model

- Fields:
  - `id`
  - `item_id`
  - `customer_id`
  - `captain_id`
  - `delivered`
  - `delivered_at`

### Items model

- Fields:
  - `id`
  - `name`
  - `price`
  - `description`
  - `image`


