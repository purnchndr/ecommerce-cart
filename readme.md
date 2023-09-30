# Ecommerse Cart System

This node backend system exposes two API's

- /cart  
   user can get all cart items with discounted price and total price with GET request
- /cart/add
  user can add items to cart via POST request in following formate.
  id can be "A" to "D"
  `{ "id" : "A",  "quantity" : 2 }`

  # IMPORTANT NOTE

- I am usng local local variables to store data, due to not having an active public MySQL server
- I have write the sql connection class as well as query with can be run in place of local variables

Author : Purnachandra
