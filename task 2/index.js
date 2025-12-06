//qusetion 1
function logPath() {
    return { File: __filename, Dir: __dirname};
}
console.log(logPath())

// question 2
const path = require("path")
function fileName(filePath){
     return path.basename(filePath);
}
console.log(fileName("/user/files/report.pdf"))

//question3
function format(filePath){
    return path.format(filePath);
}
console.log(format(
    { dir: "/folder", name: "app", ext: ".js"})
);

//question 4
function extname(filePath){
    return path.extname(filePath)
}
console.log(extname("/docs/readme.md"))

//question 5
function parse(filePath){
    return path.parse(filePath)
}
console.log(parse("/home/app/main.js"));

//question 6 
function absoluted(filePath){
    return path.isAbsolute(filePath)
}
console.log(absoluted("/home/user/file.txt"));

//question 7
 function joinPath(...filePath){
    return path.join(...filePath)
 }
 console.log(joinPath("src","components", "App.js"))

 //question 8
 function resolvePath(filePath){
    return path.resolve(filePath)
 }
 console.log(resolvePath("index.js"))

 //question 9
  function joinpath(...filePath){
    return path.join(...filePath)
 }
console.log(joinpath("/folder1","folder2/file.txt"))

//question 10 

const fs = require("fs")

function deleteFile(filePath) {
    const fileName = path.basename(filePath);
    
    
    fs.unlink(filePath, (err) => {

        if (err) {
            console.log("Error deleting file:", err.message);
        } else {
            console.log(`The ${fileName} is deleted.`);
        }
    });
}
deleteFile("../task 2/delete/test.txt");

//question 11
function createFolder(folderPath) {
    try {
        fs.mkdirSync(folderPath, { recursive: true }); // recursive: لو الفولدر الأب مش موجود
        console.log("Success");
    } catch (err) {
        console.log("Error:", err.message);
    }
}
createFolder("../task 2/path/newFoleder")

//question 12
const Event = require("events")
const event = new Event();
event.on("start",()=>{
    console.log("Welcome event triggered!")
})
event.emit("start")

//question 13 
event.on("login",(username)=>{
    console.log(`User logged in:${username}`)
})
event.emit("login","Ahmed")

//question 14
function readFileSync(filePath) {
    try {
        const content = fs.readFileSync(filePath, "utf8");
        console.log("File content =>", content);
    } catch (err) {
        console.log("Error reading file:", err.message);
    }
}
readFileSync("../task 2/path/notes.txt");

//question 15
function writeFileAsync() {
    fs.writeFile("./async.txt", "Async save", (err) => {
        if (err) console.log("Error:", err.message);
        else console.log("successfully!");
    });
}
writeFileAsync();

//question 16
async function Exist(path) {
    const exists = fs.existsSync(path);
    console.log(exists);
}
Exist("./path/notes.txt")

//question 17
const os = require("os");

function getOSInfo() {
    console.log({
        Platform: os.platform(),
        Arch: os.arch()
    });
}

getOSInfo();
