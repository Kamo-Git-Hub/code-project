const { Router } = require("express");
const User = require("../models/user-model");

const router = Router();

router.get("/", async (req, res) => {
    const user = await User.find();
    res.render("users", {
        title: "пользователи",
        isUser: true,
        user: JSON.parse(JSON.stringify(user)),
    });
});

router.get("/user-profile/:id", async (req, res) => {

    const user = await User.findById(req.params.id);
    res.render("user-profile", {
        title:user.name,
        user: JSON.parse(JSON.stringify(user)),
        userId: req.user ? req.user._id.toString() : null,
        items: JSON.parse(JSON.stringify(user.profile.tape)),
    });

});

module.exports = router;
