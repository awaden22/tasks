const express = require("express");

const app = express();

const port = 3005;

app.use(express.json());

let users = [];


app.post("/user", (req, res) => {
    const newUser = {
    id: Date.now(),      // أو Math.random()
    ...req.body          // أي بيانات جاية من اليوزر
  };

  const user = users.find((u)=>
  u.email === req.body.email
)
  if (user){
    return res.status(409).json({message:"user already exists "});
  }else{
  users.push(newUser);
  res.status(201).json({
    message: "User added successfully",
  });
}
});

app.get("/user", (req, res) => {
  res.status(200).json({message: "user list", users: users, });
});
app.get("/user/getByName", (req, res) => {
  const name = req.query.name;
  const user = users.filter ((u)=> name === u.name);
  if(user.length===0){
    return res.status(404).json({message:"user not name found"})
  }
  return res.status(200).json({user:user})

});
app.get("/user/filter",(req,res)=>{
  const age = parseInt(req.query.age);
  const filteredusers = users.filter((u)=> u.age > age);
  if(filteredusers.length ===0){
    return res.status(404).json({message:"no user found"})
  }
  return res.status(200).json({users:filteredusers})
})

app.patch("/user/:id", (req, res) => {
  const id = req.params.id;

  const userIndex = users.findIndex((u) => u.id == id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "user ID not found "});
  }
const updateData = req.body;
  users[userIndex] = { ...users[userIndex], ...updateData };


  res.status(200).json({
    message: "user updated successfully",
  });
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;

  const userIndex = users.findIndex((u) => u.id == id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "user ID not found" });
  }

 users.splice(userIndex, 1);



  res.status(200).json({
    message: "user deleted successfully",
  
  });
});


app.listen(port, () => {
  console.log(`server is running ${port}`);
});
