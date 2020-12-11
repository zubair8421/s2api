const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT||4000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://zubair:Dhaphase6125@cluster0.t5cvz.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to mongoDB.."))
  .catch((err) => console.error("Could not connect..", err));

const courseSchema = new mongoose.Schema({
  crName: String,
  id: Number,
  crDuration: Number,
  crFee: Number,
});

const Courses = mongoose.model("Courses", courseSchema);

app.get("/",(req,res)=>{
  Courses.find({}, function(err,result){
    if(err){console.log(err)}
    else if(result){
      res.send(result)
    }
  })
})

app.post("/api/getCourses", (req, res) => {
  var newEntry = new Courses({
    crName: req.body.crName,
    id: req.body._id,
    crDuration: req.body.crDuration,
    crFee: req.body.crFee,
  });
  newEntry
    .save()
    .then((result) => {
      res.status(200).json({ success: true, document: result });
    })
    .catch((err) => console.log(err));
});

app.put("/api/deleteCourse/:_id", (req, res) => {
  Courses.findByIdAndDelete({ _id: req.params._id }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
app.put("/api/updateCourse/:_id", (req, res) => {
  Courses.findByIdAndUpdate(
    { _id: req.params._id },
    {
      crName: req.body.crName,
      id: req.body.id,
      crDuration: req.body.crDuration,
      crFee: req.body.crFee,
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
