import { Router } from "express";
import multer from "multer";
import fs from "fs";
import imageDownloader from "image-downloader";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { unlink } from "fs/promises";
import Placemodel from "../model/Placemodel.js";
import jwt from "jsonwebtoken";
import Usermodel from "../model/Usermodel.js";
import Bookingmodel from "../model/Bookingmodel.js";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import connectDB from "../database/conn.js";
import mime from "mime-types";
import dotenv from "dotenv";

const placerouter = Router();
const photosMiddelware = multer({ dest: "/tmp" });

dotenv.config();

// upload pictures to AWS
async function uploadToS3(newpath, originalFilename, mimetype) {
  connectDB();
  const client = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const ext = originalFilename.split(".")[1];
  const newFilename = Date.now() + "." + ext;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKETNAME,
      Body: fs.readFileSync(newpath),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );

  console.log({ data });
  return `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${newFilename}`;
}

// delete pictures from AWS
async function deleteFromS3(filename) {
  connectDB();
  const client = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  try {
    const data = await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: filename,
      })
    );
    console.log(`Successfully deleted ${filename}`);
    return true;
  } catch (error) {
    console.error(`Error deleting ${filename}: ${error.message}`);
    return false;
  }
}

// upload pictures with link to aws
placerouter.post("/api/upload-by-link", async (req, res) => {
  connectDB();
  try {
    const { link } = req.body;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const newName = "photo" + Date.now() + ".jpg";
    const destinationPath = join("/tmp/", newName).replace(/\\/g, "/");
    await imageDownloader.image({
      url: link,
      dest: destinationPath,
    });
    const url = await uploadToS3(
      destinationPath,
      newName,
      mime.lookup(destinationPath)
    );
    res.json(url);
  } catch (error) {
    console.error("Error Adding photo:", error);
    res.status(500).json({ error: "Unable to Add photo" });
  }
});

// upload pictures with file to aws
placerouter.post(
  "/api/upload",
  photosMiddelware.array("files", 30),
  async (req, res) => {
    connectDB();
    try {
      const uploadedFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const { path, originalname, mimetype } = req.files[i];
        const newpath = path.replace(/\\/g, "/");
        const url = await uploadToS3(newpath, originalname, mimetype);
        uploadedFiles.push(url);
      }

      res.json(uploadedFiles);
    } catch (error) {
      console.error("Error Adding photo:", error);
      res.status(500).json({ error: "Unable to Add photo" });
    }
  }
);

// delete pictures
placerouter.delete("/api/delete-photo", async (req, res) => {
  connectDB();
  const { filename } = req.body;
  try {
    const deleted = await deleteFromS3(filename);
    res.status(200).json(deleted);
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ error: "Unable to delete photo" });
  }
});

// delete pictures
placerouter.delete("/api/delete-photo/:id", async (req, res) => {
  connectDB();

  const { id } = req.params;
  const { filename } = req.body;

  try {
    const deleted = await deleteFromS3(filename);
    if (deleted) {
      res.status(200).json("Photo deleted");
    } else {
      res.status(400).json("Error deleting photo:");
    }

    const place = await Placemodel.findById(id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    const imageIndex = place.images.indexOf(filename);
    if (imageIndex === -1) {
      return res.status(404).json({ error: "Image not found in place" });
    }

    place.images.splice(imageIndex, 1);

    await place.save();

    res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ error: "Unable to delete photo" });
  }
});

// add a place
placerouter.post("/api/place/:Userid", async (req, res) => {
  connectDB();

  const {
    title,
    description,
    price,
    address,
    city,
    country,
    images,
    type,
    bedrooms,
    bathrooms,
    livingRooms,
    kitchens,
    perks,
    extrainfo,
    userNumber,
    checkIn,
    checkOut,
    maxGuests,
    rating,
    owner,
  } = req.body;

  const { Userid } = req.params;

  try {
    if (Userid) {
      const user = await Usermodel.findById(Userid);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        user.host = true;

        const placeDoc = await Placemodel.create({
          title: title,
          description: description,
          price: price,
          address: address,
          city: city,
          country: country,
          images: images,
          type: type,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          livingRooms: livingRooms,
          kitchens: kitchens,
          perks: perks,
          extrainfo: extrainfo,
          userNumber: userNumber,
          checkIn: checkIn,
          checkOut: checkOut,
          maxGuests: maxGuests,
          rating: rating,
          owner: owner,
        });

        res.json(placeDoc);
        await user.save();
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// edit a place
placerouter.put("/api/place", async (req, res) => {
  connectDB();

  try {
    const {
      id,
      title,
      description,
      price,
      address,
      city,
      country,
      images,
      type,
      bedrooms,
      bathrooms,
      livingRooms,
      kitchens,
      perks,
      extrainfo,
      userNumber,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    const placeDoc = await Placemodel.findById(id);

    placeDoc.set({
      title: title || placeDoc.title,
      description: description || placeDoc.description,
      price: price || placeDoc.price,
      address: address || placeDoc.address,
      city: city || placeDoc.city,
      country: country || placeDoc.country,
      images: images || placeDoc.images,
      type: type || placeDoc.type,
      bedrooms: bedrooms || placeDoc.bedrooms,
      bathrooms: bathrooms || placeDoc.bathrooms,
      livingRooms: livingRooms || placeDoc.livingRooms,
      kitchens: kitchens || placeDoc.kitchens,
      perks: perks || placeDoc.perks,
      extrainfo: extrainfo || placeDoc.extrainfo,
      userNumber: userNumber || placeDoc.userNumber,
      checkIn: checkIn || placeDoc.checkIn,
      checkOut: checkOut || placeDoc.checkOut,
      maxGuests: maxGuests || placeDoc.maxGuests,
    });
    await placeDoc.save();
    res.json(placeDoc);
  } catch (error) {
    console.log(error);
  }
});

// get all places
placerouter.get("/api/places", async (req, res) => {
  connectDB();

  try {
    const places = await Placemodel.find().sort({ createdAt: -1 });
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get places by types
placerouter.get("/api/placesByType/:type", async (req, res) => {
  connectDB();

  const { type } = req.params;
  try {
    const places = await Placemodel.find({ type: type }).sort({
      createdAt: -1,
    });
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get place by id
placerouter.get("/api/place/:id", async (req, res) => {
  connectDB();

  const { id } = req.params;
  if (id === undefined) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const place = await Placemodel.findById(id).populate(
      "owner",
      "fullname profilepic phone"
    );
    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get places by location
placerouter.get("/api/placesByCountry/:country", async (req, res) => {
  connectDB();

  const { country } = req.params;
  try {
    const places = await Placemodel.find({ country: country }).sort({
      createdAt: -1,
    });
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get places by location and type
placerouter.get(
  "/api/placesByCountryAndType/:country/:type",
  async (req, res) => {
    connectDB();

    const { country, type } = req.params;
    try {
      const places = await Placemodel.find({ country, type }).sort({
        createdAt: -1,
      });
      res.status(200).json(places);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// get places by search
placerouter.get(
  "/api/placesBySearch/:country/:checkin/:checkout/:guests",
  async (req, res) => {
    connectDB();

    const { country, checkin, checkout, guests } = req.params;
    try {
      // Find all bookings that overlap with the provided dates
      const bookings = await Bookingmodel.find({
        $or: [
          {
            checkin: { $lte: checkout },
            checkout: { $gte: checkin },
          },
        ],
      });

      // Get the IDs of places that have been booked
      const bookedPlaceIds = bookings.map((booking) =>
        booking.place.toString()
      );

      // Find all places that have never been booked or are available
      const places = await Placemodel.find({
        _id: { $nin: bookedPlaceIds }, // Exclude places with bookings
        country,
        maxGuests: { $gte: guests },
      }).sort({
        createdAt: -1,
      });

      res.status(200).json(places);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// get places by owner
placerouter.get("/api/placeByowner/:id", async (req, res) => {
  connectDB();

  const { id } = req.params;
  try {
    const place = await Placemodel.find({ owner: id }).populate({
      path: "owner",
      select: "fullname profilepic phone",
    });
    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get places by Likes
placerouter.get("/api/placeBylikes/:id", async (req, res) => {
  connectDB();
  const { id } = req.params;
  try {
    const user = await Usermodel.findById(id);
    if (user.likedPosts.length > 0) {
      const likedPlaces = await Promise.all(
        user.likedPosts.map(async (postid) => {
          const place = await Placemodel.findById(postid).populate(
            "owner",
            "fullname profilepic phone"
          );
          return place;
        })
      );

      return res.status(200).json(likedPlaces);
    } else {
      return res.status(400).json("User not found or has no likes");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// like place
placerouter.post("/api/save/:id/:Userid", async (req, res) => {
  connectDB();

  try {
    const { id, Userid } = req.params;

    if (Userid) {
      const followerId = Userid;
      try {
        // Find the post to be liked
        const postToLike = await Placemodel.findById(id);

        if (!postToLike) {
          return res.status(404).json({ error: "Post not found" });
        }

        // Find the user
        const user = await Usermodel.findById(followerId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Check if the like is already in the likes list
        if (postToLike.likedBy.includes(followerId)) {
          const postIndex = postToLike.likedBy.indexOf(followerId);
          if (postIndex > -1) {
            postToLike.likedBy.splice(postIndex, 1);
          }
          const userIndex = user.likedPosts.indexOf(id);
          if (userIndex > -1) {
            user.likedPosts.splice(userIndex, 1);
          }

          await postToLike.save();
          await user.save();

          return res
            .status(200)
            .json({ post: postToLike.likedBy, user: user.likedPosts });
        }

        user.likedPosts.push(id);
        await user.save();

        postToLike.likedBy.push(followerId);
        await postToLike.save();

        return res
          .status(200)
          .json({ post: postToLike.likedBy, user: user.likedPosts });
      } catch (error) {
        console.error(error);
        return res.status(500).send(error);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//add reviews
placerouter.post("/api/reviews/:placeid/:Userid", async (req, res) => {
  connectDB();

  const { placeid, Userid } = req.params;
  const { comment, rating } = req.body;

  try {
    if (Userid) {
      const user = await Usermodel.findById(Userid);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      if (user) {
        const place = await Placemodel.findById(placeid);

        if (!place) {
          return res.status(404).json({ error: "Place not found." });
        }

        if (!comment || !rating) {
          return res
            .status(400)
            .json({ error: "Please provide comment and rating." });
        }

        const newPlaceReview = {
          comment,
          rating,
          userId: Userid,
          userName: user.fullname,
          userPhoto: user.profilepic,
          createdAt: new Date(),
        };

        place.reviews.push(newPlaceReview);

        await place.save();

        return res.status(201).json({ message: "Review added successfully." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete reviews
placerouter.delete("/api/deletereview/:id/:index/:Userid", async (req, res) => {
  connectDB();

  const { id, index, Userid } = req.params;

  try {
    if (Userid) {
      const user = await Usermodel.findById(Userid);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const place = await Placemodel.findById(id);

      if (!place) {
        return res.status(404).json({ error: "Place not found." });
      }

      if (index < 0 || index >= place.reviews.length) {
        return res.status(404).json({ error: "Review not found" });
      }

      place.reviews.splice(index, 1);

      await place.save();

      return res.status(200).json("deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//add booking
placerouter.post(`/api/addBooking/:Userid`, async (req, res) => {
  connectDB();
  const { Userid } = req.params;
  const {
    id,
    host,
    checkin,
    checkout,
    guests,
    Username,
    Userphone,
    fullprice,
    halfprice,
    worktrip,
  } = req.body;

  try {
    if (id) {
      const user = await Usermodel.findById(Userid);
      if (user) {
        const Userid = user._id;

        const bookingdoc = await Bookingmodel.create({
          place: id,
          host,
          user: Userid,
          checkin,
          checkout,
          guests,
          Username,
          Userphone,
          fullprice,
          halfprice,
          worktrip,
        });

        return res.status(200).json(bookingdoc);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get booking by id
placerouter.get("/api/Bookings/:id", async (req, res) => {
  connectDB();

  const { id } = req.params;
  try {
    const bookingdoc = await Bookingmodel.findById(id).populate(
      "user place host"
    );

    return res.status(200).json(bookingdoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get booking by user
placerouter.get("/api/BookingPlaces/:id", async (req, res) => {
  connectDB();

  const { id } = req.params;

  try {
    if (id) {
      const user = await Usermodel.findById(id);

      if (user) {
        const Hostid = user._id;

        const bookeddoc = await Bookingmodel.find({ user: Hostid })
          .populate("user place")
          .sort({ createdAt: -1 });
        res.status(200).json(bookeddoc);
      } else {
        res.status(404).json("ID not Found");
      }
    } else {
      res.status(404).json("User not Found");
    }
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get booking by host
placerouter.get("/api/Booked/:id", async (req, res) => {
  connectDB();

  const { id } = req.params;

  try {
    if (id) {
      const user = await Usermodel.findById(id);

      if (user) {
        const Hostid = user._id;

        const bookeddoc = await Bookingmodel.find({ host: Hostid })
          .populate("user place")
          .sort({ createdAt: -1 });
        res.status(200).json(bookeddoc);
      }
    } else {
      res.status(404).json("User not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get booking by place
placerouter.get("/api/BookPlace/:id", async (req, res) => {
  connectDB();

  const { id } = req.params;
  try {
    const bookeddoc = await Bookingmodel.findOne({ place: id });
    res.status(200).json(bookeddoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default placerouter;
