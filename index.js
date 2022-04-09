const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: 'Green Curry',
      cuisine: 'Thai'
    });
  })
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })
  .then((data) => {
    console.log(data);
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipe) => {
    console.log('Updated recipe: ', recipe);
    Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Carrot Cake was deleted...');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnect successful');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
