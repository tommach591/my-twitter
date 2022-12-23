const express = require("express");
const router = express.Router();

const Profile = require("../../schemas/Profile");

router.get("/allProfiles", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/allProfiles");
  Profile.find()
    .then((prof) => res.json(prof))
    .catch((err) => res.status(404).json({ profile_not_found: "No profiles" }));
});

router.get("/get/:user_id", (req, res) => {
  const { user_id } = req.params;

  console.log(`Hit at http://localhost:3001/api/profile/get/${user_id}`);
  Profile.findOne({ user_id: user_id })
    .then((prof) => {
      return res.json(prof);
    })
    .catch((err) => {
      return res.status(404).json({ profile_not_found: "No profiles" });
    });
});

router.get("/search/:query", (req, res) => {
  const { query } = req.params;

  console.log(`Hit at http://localhost:3001/api/profile/search/${query}`);
  Profile.find({
    $or: [
      { first: { $regex: query, $options: "i" } },
      { last: { $regex: query, $options: "i" } },
    ],
  })
    .then((prof) => {
      return res.json(prof);
    })
    .catch((err) => {
      return res.status(404).json({ profile_not_found: "No profiles" });
    });
});

router.post("/signup", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/signup");
  const { user_id, email, first, last, birthdate, gender } = req.body;

  const newProfile = new Profile({
    user_id: user_id,
    email: email,
    first: first,
    last: last,
    birthdate: birthdate,
    gender: gender,
    date_created: new Date(Date.now()),
    friends: [],
    friend_requests: [],
    pfp: "",
    banner: "",
    bio: "",
    work: "",
    education: "",
    city: "",
    hometown: "",
    relationship: "",
    name_pronunciation: "",
    photos: [],
    posts_made: [],
    posts_liked: [],
    posts_shared: [],
  });

  newProfile.save().then((prof) => {
    return res.json(prof);
  });
});

router.post("/update/intro", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/intro");
  const { user_id, bio, work, education, city, hometown, relationship } =
    req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    {
      bio: bio,
      work: work,
      education: education,
      city: city,
      hometown: hometown,
      relationship: relationship,
    }
  ).exec();
});

router.post("/update/add_friend", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/add_friend");
  const { user_id, new_friend } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $pull: { friend_requests: new_friend }, $push: { friends: new_friend } }
  ).exec();
});

router.post("/update/remove_friend", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/remove_friend");
  const { user_id, new_friend } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $pull: { friend: new_friend } }
  ).exec();
});

router.post("/update/add_friend_request", (req, res) => {
  console.log(
    "Hit at http://localhost:3001/api/profile/update/add_friend_request"
  );
  const { user_id, new_friend } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { friend_requests: new_friend } }
  ).exec();
});

router.post("/update/remove_friend_request", (req, res) => {
  console.log(
    "Hit at http://localhost:3001/api/profile/update/remove_friend_request"
  );
  const { user_id, new_friend } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $pull: { friend_requests: new_friend } }
  ).exec();
});

router.post("/update/pfp", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/pfp");
  const { user_id, new_pfp } = req.body;

  Profile.findOneAndUpdate({ user_id: user_id }, { pfp: new_pfp }).exec();
});

router.post("/update/banner", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/banner");
  const { user_id, new_banner } = req.body;

  Profile.findOneAndUpdate({ user_id: user_id }, { banner: new_banner }).exec();
});

router.post("/update/add_photo", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/add_photo");
  const { user_id, new_photo } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { photos: new_photo } }
  ).exec();
});

router.post("/update/add_new_post", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/add_new_post");
  const { user_id, new_post } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { posts_made: new_post } }
  ).exec();
});

router.post("/update/add_post_liked", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/update/add_post_liked");
  const { user_id, new_post_liked } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { posts_liked: new_post_liked } }
  ).exec();
});

router.post("/update/add_post_shared", (req, res) => {
  console.log(
    "Hit at http://localhost:3001/api/profile/update/add_post_shared"
  );
  const { user_id, new_post_shared } = req.body;

  Profile.findOneAndUpdate(
    { user_id: user_id },
    { $push: { posts_shared: new_post_shared } }
  ).exec();
});

router.delete("/delete", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/delete");
  const { email } = req.body;

  Profile.findOneAndRemove({ email: email }).exec();
  return res.json({ success: true });
});

module.exports = router;
