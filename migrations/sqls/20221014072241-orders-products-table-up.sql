/* Replace with your SQL commands */
CREATE TABLE orders_products (order_id BIGINT REFERENCES orders(id), product_id BIGINT REFERENCES products(id), quantity INTEGER);