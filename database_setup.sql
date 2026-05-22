-- I create a products table to store the dresses sold on the website
CREATE TABLE products (
    -- Unique ID for each product
    product_id INT PRIMARY KEY AUTO_INCREMENT,

    -- Product name
    name VARCHAR(100),

    -- Product colour
    colour VARCHAR(50),

    -- Available dress size
    size VARCHAR(20),

    -- Product price with two decimal places
    price DECIMAL(10,2),

    -- Image file name used by the website
    image VARCHAR(100)
);

-- I insert sample dresses into the products table
INSERT INTO products (name, colour, size, price, image)

VALUES
('Emerald Elegance Dress', 'Green', 'M', 299.99, 'imagegreen.jpg'),

('Pink Glamour Dress', 'Pink', 'S', 349.99, 'imagepink.JPG'),

('Royal Blue Dress', 'Blue', 'L', 399.99, 'imageblue.JPG'),

('Classic Black Dress', 'Black', 'M', 459.99, 'image3.JPG');