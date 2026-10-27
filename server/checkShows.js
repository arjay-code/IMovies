require("dotenv").config();


const mongoose = require("mongoose");
const Movie = require("./models/movieModel");
const Show = require("./models/showModel");
const Theatre = require("./models/theatreModel");

async function checkShows() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const shows = await Show.find({
        isActive: true,
      })
      .populate("movie", "title")
      .populate("theatre", "name city")
      .sort({ startTime: 1 });

    for (const show of shows) {
      console.log({
        movie: show.movie?.title,
        theatre: show.theatre?.name,
        city: show.theatre?.city,
        screen: show.screenName,
        startTime: show.startTime,
        endTime: show.endTime,
        prices: show.prices,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

checkShows();