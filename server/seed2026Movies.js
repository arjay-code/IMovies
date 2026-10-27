require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Movie = require("./models/movieModel");

const movieTitles = [
  "Dhurandhar: The Revenge",
  "Drishyam: The Conclusion",
  "Border 2",
  "Hanuman Ansh",
  "Mirzapur: The Movie",
  "Chhaava",
  "Saiyaara",
  "Housefull 5",
  "War 2",
  "Mahavatar Narsimha",
  "A Minecraft Movie",
  "Jurassic World Rebirth",
  "Superman",
  "Zootopia 2",
  "Project Hail Mary",
];

async function getPoster(title) {
  try {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      formatversion: "2",
      generator: "search",
      gsrsearch: `${title} film`,
      gsrnamespace: "0",
      gsrlimit: "5",
      prop: "pageimages",
      piprop: "thumbnail",
      pithumbsize: "600",
    });

    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?${params}`
    );

    if (!response.ok) {
      throw new Error(`Wikipedia returned ${response.status}`);
    }

    const data = await response.json();
    const pages = data.query?.pages || [];

    const normalize = (value) =>
      value.toLowerCase().replace(/[^a-z0-9]/g, "");

    const matchingPage = pages.find(
      (page) =>
        normalize(page.title).includes(normalize(title)) &&
        page.thumbnail?.source
    );

    const pageWithImage =
      matchingPage || pages.find((page) => page.thumbnail?.source);

    return pageWithImage?.thumbnail?.source || "";
  } catch (error) {
    console.log(`Poster fetch failed for "${title}": ${error.message}`);
    return "";
  }
}

async function seedMovies() {
  try {
    await connectDB();

    let updated = 0;
    let notFound = 0;
    let noPoster = 0;

    for (const title of movieTitles) {
      console.log(`Checking: ${title}`);

      const movie = await Movie.findOne({
        title: { $regex: `^${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
      });

      if (!movie) {
        console.log(`Movie not found in database: ${title}`);
        notFound++;
        continue;
      }

      const poster = await getPoster(title);

      if (!poster) {
        console.log(`No poster found; keeping existing poster: ${title}`);
        noPoster++;
        continue;
      }

      movie.poster = poster;
      await movie.save();

      console.log(`Poster updated: ${title}`);
      updated++;

      // Avoid sending requests too quickly
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("\nPoster update completed!");
    console.log(`Updated: ${updated}`);
    console.log(`Not found in database: ${notFound}`);
    console.log(`Poster unavailable: ${noPoster}`);
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
}

seedMovies();