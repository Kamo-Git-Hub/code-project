const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser")
const connectMongoBase = require("./utils/mongo-connect");
const connectSession = require("./middleware/session");
const helmet = require("helmet");
const compression = require("compression");
const flash = require("connect-flash");
const userMeddleware = require("./middleware/user-meddleware");
const fileMeddleware = require("./middleware/file");

const app = express();

//middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectSession(app);
app.use(fileMeddleware.single("avatar"));
app.use(userMeddleware);
app.use(flash());
app.use(helmet());
app.use(compression());
app.use(require("./middleware/isAutorized"));
app.use(require("./middleware/admin"));

//handlebars
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    helpers: require("./utils/hbs-helper"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views");

app.use("/", require("./route/home-rout"));
app.use("/tape", require("./route/tape-rout"));
app.use("/add", require("./route/add-rout"));
app.use("/auth", require("./route/auth-rout"));
app.use("/admin", require("./route/admin/admin-router"));
app.use("/profile", require("./route/profile-rout"));
app.use("/code-editor", require("./route/footer-routs/code-editor-rout"));
app.use("/users", require("./route/user-rout"));
app.use('/help-posts', require('./route/help-posts/post-router'))
app.use('/comment', require('./route/help-posts/comment-rout'))

//courses
app.use("/courses", require("./route/courses-routs/html-rout"));
app.use("/courses", require("./route/courses-routs/css-rout"));
app.use("/courses", require("./route/courses-routs/js-rout"));
app.use("/courses", require("./route/courses-routs/php-rout"));

//error
app.use(require("./middleware/404"));

connectMongoBase(app);
