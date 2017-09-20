CREATE TABLE products(
  item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INTEGER(11),
  PRIMARY KEY (item_id)
);

Insert into bamazon.products(product_name, department_name,price,stock_quantity)
VALUES

	("Cantu Coconut Shampoo", "Hair Care", 5.00, 20),
	("Loreal Curl Shampoo", "Hair Care", 8.00, 15),
	("Tressemme Conditioning Shampoo", "Hair Care", 10.00, 10),
	("Its A Ten LeaveIn Conditioner", "Hair Care", 15.00,10),
	("Miss Jessies Pillow Soft Curl Creme", "Hair Care", 20.00, 5),
	("FentyBeauty Lipstick", "Beauty", 25.00, 30),
	("NYX Buttergloss", "Beauty", 5.00, 25),
	("Japanese Cherry Blossom", "Beauty", 20.00, 10),
	("Sephora Micellar Cleansing Water", "Beauty", 7.00, 15),
	("NYX Rouge Blush", "Beauty", 4.00, 16);
    