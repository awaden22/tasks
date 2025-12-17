const fs = require("fs");
const { resolve } = require("path");
const http = require("http");
const zlib = require("zlib");

let port = 3003;

// قراءة المستخدمين من ملف JSON (تأكد أن الملف يحتوي على [] في البداية)
let userdata = [];
try {
  userdata = JSON.parse(fs.readFileSync("user.json", "utf-8"));
} catch (err) {
  userdata = [];
}

// العمليات على الملفات (نفس نظامك الأصلي)
if (fs.existsSync("source.txt")) {
  const readstream = fs.createReadStream(resolve("source.txt"), {
    encoding: "utf-8",
  });
  const writestream = fs.createWriteStream("dest.txt");
  readstream.pipe(writestream);
}

if (fs.existsSync("data.txt")) {
  const gzip = zlib.createGzip();
  fs.createReadStream("data.txt")
    .pipe(gzip)
    .pipe(fs.createWriteStream("data.txt.gz"));
}

// السيرفر
const creatserver = http.createServer((req, res) => {
  // 1. إضافة مستخدم (POST)
  if (req.url === "/user" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log(req.url);
      try {
        body = JSON.parse(body);
        const existingUser = userdata.find((user) => user.email === body.email);
        if (existingUser) {
          res.writeHead(409, { "Content-Type": "application/json" });

          return res.end(JSON.stringify({ message: "user already exists" }));
        }

        userdata.push(body);
        fs.writeFileSync("user.json", JSON.stringify(userdata, null, 2));
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "added successfully" }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "invalid json data" }));
      }
    });

    // 2. حذف مستخدم (DELETE) - الرابط: /delete/1
  }
   else if (req.url.includes("/delete") && req.method === "DELETE") {
    console.log(req.url.split("/"));

    const id = req.url.split("/")[2];
    const userIndex = userdata.findIndex((user) => user.id == id);

    if (userIndex == -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "user not found" }));
    }
    userdata.splice(userIndex, 1);
    fs.writeFileSync("user.json", JSON.stringify(userdata, null, 2));
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "deleted successfully" }));

    // 3. تحديث بيانات (PATCH) - الرابط: /update
  }
   else if (req.url === "/update" && req.method === "PATCH") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const updatedInfo = JSON.parse(body);
        const userIndex = userdata.findIndex((u) => u.id == updatedInfo.id);

        if (userIndex === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "user not found" }));
        }

        userdata[userIndex].name = updatedInfo.name;
        userdata[userIndex].age = updatedInfo.age;
        fs.writeFileSync("user.json", JSON.stringify(userdata, null, 2));

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "updated successfully" }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "invalid json data" }));
      }
    });

    // 4. عرض كل المستخدمين (GET) - للتأكد من النتائج
  } 
  else if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(userdata));
  }
  else if (req.url.includes("/users") && req.method === "GET") {
    console.log(req.url.split("/"));

    const id = req.url.split("/")[2];
    const userIndex = userdata.findIndex((user) => user.id == id);

    if (userIndex == -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "user not found" }));
    }
    
    res.writeHead(200, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(userdata[userIndex]));

    // 3. تحديث بيانات (PATCH) - الرابط: /update
  }
  
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "route not found" }));
  }

});


creatserver.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

creatserver.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    port += 1;
    creatserver.listen(port);
  }
});




//Assignment 3

// 1. What is the Node.js Event Loop?

// The Event Loop is responsible for executing asynchronous tasks.
// It checks the Call Stack and runs callbacks when the stack is empty.

// 2. What is Libuv and What Role Does It Play in Node.js?

// Libuv is a library that handles asynchronous operations in Node.js.
// It manages the Event Loop and the thread pool.

// 3. How Does Node.js Handle Asynchronous Operations Under the Hood?

// Async tasks are sent to Libuv.
// After finishing, their callbacks are added to the Event Queue and executed by the Event Loop.

// 4. What is the Difference Between the Call Stack, Event Queue, and Event Loop?

// Call Stack: Executes current code.

// Event Queue: Holds async callbacks.

// Event Loop: Moves callbacks to the stack when it is empty.

// 5. What is the Node.js Thread Pool and How to Set the Thread Pool Size?

// The thread pool handles heavy background tasks.
// Default size is 4 and can be changed using:


// 6. How Does Node.js Handle Blocking and Non-Blocking Code Execution?

// Blocking code stops execution.
// Non-blocking code runs asynchronously and improves performance.