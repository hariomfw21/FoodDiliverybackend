{
    "name": "Hariom Kumar",
    "email": "hariom@gmail.com",
    "password": "hariom",
    "address": {
      "street": "Satanpur",
      "city": "samastipur",
      "state": "Bihar",
      "country": "INDIA",
      "zip": "848132"
    }
}

{
    name: "Example Restaurant",
    address: {
      street: "123 Main Street",
      city: "Cityville",
      state: "State",
      country: "Country",
      zip: "12345",
    },
    menu: [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Burger",
        description: "Delicious burger with all the fixings",
        price: 9.99,
        image: "burger.jpg",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Pizza",
        description: "Cheesy pizza with your favorite toppings",
        price: 12.99,
        image: "pizza.jpg",
      },
      // Add more menu items here if needed
    ],
  }