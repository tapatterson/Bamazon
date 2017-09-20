//require node modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");
var Table = require("cli-table");

//sql connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon"
});

//connect to mysql, run main function
connection.connect(function(err) {
  if (err) throw err;
  showItems() 
});

function showItems() {
	//cli- table (using cli-table npm)	
  var table = new Table ({
    head: ['Item ID', 'Product', 'Department', 'Price', 'Qty Available']
  });

  //get all rows from the Products table
	connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    //add all of the rows to the cli-table
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity]);
    	}
    	//print table to the console
    	console.log(table.toString());
    	//callback the productList function to prompt the user to add items to cart
    	selectItem();
  })
}

function selectItem(){
	var items = [];
	
	//get product id's from table
	connection.query("SELECT item_id FROM products", function(err, res){
		if(err) throw err;
		for (var i = 0; i < res.length; i++){
			items.push(res[i].item_id)
		}

		// console.log("array has: " + items);

		inquirer.prompt ([
		{
			type: "input",
			name: "option",
			message: "Enter the id of the item you want to purchase."

		}

		]).then(function(answer){
			console.log(answer.option);
			console.log("The item number is: " + answer.option);
			// console.log("The value passed is: " + items);
			amountSelected(items, answer.option);
		})
	});
}

function amountSelected(items, itemsChosen){
	// console.log("Coming in is: " + items);
	var item = items.shift();
	var itemsChosen = itemsChosen;
	item = itemsChosen;
	// console.log("The selected item is : " + itemsChosen);

	var itemQuantity;
	var department;

	connection.query('SELECT stock_quantity, price, department_name FROM products WHERE ?',{
		item_id: item
	}, function(err, res){
		if(err) throw err;
		//set stock, price, and department in a variable
		itemQuantity = res[0].stock_quantity;
		itemCost = res[0].price;
		department = res[0].department_name;
	});

	//prompt the user asking what qty they want
	inquirer.prompt([
	{
		type: "input",
		name: "amount",
		message: "How many of item number " + itemsChosen + " would you like to purchase?"
	}
	]).then(function (amountIs) {
		console.log(amountIs.amount);
		console.log("Quantity is: " + itemQuantity);
		if (amountIs.amount > itemQuantity) {
			console.log("Sorry, this item is sold out.");
		}

		else {
			itemQuantity -= amountIs.amount;
			// console.log(itemQuantity + " remaining")
			var total = amountIs.amount * itemCost;
			console.log("Total due is $" + total);
			console.log("OK! Would you like to continue shopping?")
		}

		updateDB(itemQuantity, itemsChosen);

})

	
}

function updateDB(itemQuantity,itemsChosen){
	var totalQty = itemQuantity;
  var itemId = itemsChosen;
  // console.log("Amount remaining " + totalQty);
  // console.log("The item selected is: " + itemId);

  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: totalQty
        },
        {
          item_id: itemId
        }

    ],function(err,res) {
        if (err) throw err;
        console.log("New stock quantity: " +totalQty);
    }
 )
connection.end();	

}


	

