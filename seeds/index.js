const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../model/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Datebase connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //your author id
      author: "6859d5a3d0ea1f7e39d70dfc",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },

      images: [
        {
          url: "https://res.cloudinary.com/deyu33ucu/image/upload/v1751456474/Yelp-camp/a0d6wuqfgst2yq39ongh.jpg",
          filename: "Yelp-camp/a0d6wuqfgst2yq39ongh",
        },
        {
          url: "https://res.cloudinary.com/deyu33ucu/image/upload/v1751456479/Yelp-camp/tf4vlxbuc0xdfipj1o2i.jpg",
          filename: "Yelp-camp/tf4vlxbuc0xdfipj1o2i",
        },
      ],
    });
    await camp.save();
  }
};
seedDb().then(() => {
  mongoose.connection.close;
});
