require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Movie = require("./models/movieModel");
const Show = require("./models/showModel");

async function seedShowsForAllMovies() {
  try {
    await connectDB();

    const now = new Date();

    const templates = await Show.find({
      isActive: true,
      startTime: { $gte: now },
    }).sort({ startTime: 1 });

    if (!templates.length) {
      console.log("No future shows found.");
      return;
    }

    // Use the existing theatre and screen
    const template = templates[0];
    const theatreId = template.theatre;
    const screenId = template.screenId;
    const screenName = template.screenName;
    const prices = template.prices.toObject
      ? template.prices.toObject()
      : template.prices;

    // Preserve the time-of-day pattern from existing shows
    const timeSlots = [
      ...new Map(
        templates.map((show) => [
          `${show.startTime.getUTCHours()}:${show.startTime.getUTCMinutes()}`,
          {
            hour: show.startTime.getUTCHours(),
            minute: show.startTime.getUTCMinutes(),
          },
        ])
      ).values(),
    ];

    const movies = await Movie.find({ isActive: true }).sort({
      title: 1,
    });

    let created = 0;
    let skipped = 0;

    // Schedule movies in available slots over the next 30 days
    const slots = [];

    for (let day = 0; day < 30; day++) {
      for (const time of timeSlots) {
        const start = new Date();
        start.setUTCHours(time.hour, time.minute, 0, 0);
        start.setUTCDate(start.getUTCDate() + day);

        if (start <= now) continue;

        slots.push(start);
      }
    }

    slots.sort((a, b) => a - b);

    for (const movie of movies) {
      const existing = await Show.exists({
        movie: movie._id,
        isActive: true,
        startTime: { $gte: now },
      });

      if (existing) {
        console.log(`Already scheduled: ${movie.title}`);
        skipped++;
        continue;
      }

      let scheduled = false;

      for (const start of slots) {
        const end = new Date(
          start.getTime() + (movie.duration + 15) * 60000
        );

        const clash = await Show.exists({
          theatre: theatreId,
          screenId,
          isActive: true,
          startTime: { $lt: end },
          endTime: { $gt: start },
        });

        if (clash) continue;

        await Show.create({
          movie: movie._id,
          theatre: theatreId,
          screenId,
          screenName,
          startTime: start,
          endTime: end,
          prices,
          bookedSeats: [],
          isActive: true,
        });

        console.log(
          `Created: ${movie.title} | ${start.toISOString()}`
        );

        created++;
        scheduled = true;
        break;
      }

      if (!scheduled) {
        console.log(`No available slot: ${movie.title}`);
        skipped++;
      }
    }

    console.log("\nShow seeding completed!");
    console.log("Created:", created);
    console.log("Skipped:", skipped);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedShowsForAllMovies();