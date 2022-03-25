var express = require("express");
var bodyParser = require("body-parser");
var getdate = require(__dirname + "/date.js");
var mongoose = require("mongoose");
app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// main().catch(err=>console.log(err));

mongoose.connect("mongodb://localhost:27017/todolistDB");
const titleSchema = {
    name: String
}

const headingSchema = {
    name: String,
    title: [titleSchema]
};

const Title = mongoose.model("title", titleSchema);
const Heading = mongoose.model("Heading", headingSchema);

const shop = new Title({ name: 'shop' });
const study = new Title({ name: 'study' });
const cleaning = new Title({ name: 'cleaning' });

const defaultArr = [shop, study, cleaning];


app.use(express.static("public"));

app.get("/", function(req, res) {

    Title.find({}, (err, result) => {
        if (result.length === 0) {
            Title.insertMany(defaultArr, (err) => {
                (err) ? console.log(err): console.log("sucess enternt");
            })
            res.redirect("/");
        } else { res.render("list", { heading: currentDate, titles: result }); }
    })
    currentdate = getdate.onlyday();


});

app.get("/:route", function(req, res) {
    const routeName = req.params.route;

    Heading.findOne({ name: routeName }, (err, results) => {
        if (!err) {
            if (results) {

                res.render("list", { heading: routeName, titles: results.title });
            } else {
                const List = new Heading({
                    name: routeName,
                    title: defaultArr
                });
                List.save();
                res.render("list", { heading: routeName, titles: List.title });
            }

        }
    })

});
// app.post("/:route", (req, res) => {
//         if (req.body.list === "work")
//     })
app.post("/", function(req, res) {
    //     if (req.body.list === "work") {
    //         var work = req.body.title;
    //         works.push(work);
    //         res.redirect("/work");
    //     } else {

    var title = req.body.title;
    var heading = req.body.heading;
    const List = new Title({ name: title });
    if (heading === getdate.onlyday()) {

        List.save();
        res.redirect("/");
    } else {
        Heading.findOne({ name: heading }, (err, foundHeading) => {
            console.log(foundHeading)
            foundHeading.title.push(List);
            foundHeading.save();
            res.redirect("/" + heading);
        })

    }

});

app.post("/delete", (req, res) => {
    const checkItemId = req.body.checkbox;
    Title.findByIdAndRemove(checkItemId, function(err) {
        console.log('check delte run');
        res.redirect('/');
    });
});


// app.post("/work", function (req, res) {
//   var works = req.body.title;

//   works.push(work);
//   res.redirect("/work");
// });

app.listen("3000", function() {
    console.log("server is up");
});