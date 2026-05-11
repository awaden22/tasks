"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    _password;
    _age;
    phone;
    constructor(id, name, email, _password, _age, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this._password = _password;
        this._age = _age;
        this.phone = phone;
        if (_age < 18 || _age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this._age = _age;
    }
    displayInfo() {
        console.log(`ID:${this.id}, Name:${this.name}, Email:${this.email}, Age:${this._age}, Phone:${this.phone}, Password: Hidden`);
    }
}
const infoUser = new User(1, "mahmoud", "task15@gmail.com", "123456", 22, "01097027575");
infoUser.displayInfo();
class Admin extends User {
    constructor(id, name, email, password, age, phone) {
        super(id, name, email, password, age, phone);
    }
    manageNotes() {
        console.log("admin can manage notes");
    }
}
const adminInfo = new Admin(1, "mahmoud", "task15@gmail.com", "123456", 22, "01097027575");
adminInfo.displayInfo();
adminInfo.manageNotes();
class Note {
    id;
    title;
    content;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    preview() {
        console.log("short content: " + this.content.substring(0, 10));
    }
}
const noteInfo = new Note(1, "note1", "this is my first note", infoUser);
noteInfo.preview();
class NoteBook {
    notes = [];
    addNote(note) {
        this.notes.push(note);
        console.log("Note added");
    }
    removeNote(index) {
        this.notes.splice(index, 1);
        console.log("Note removed");
    }
    showNotes() {
        console.log(this.notes);
    }
}
const noteBookInfo = new NoteBook();
noteBookInfo.addNote(noteInfo);
noteBookInfo.showNotes();
noteBookInfo.removeNote(0);
noteBookInfo.showNotes();
class UserNoteBook {
    user;
    noteBook;
    constructor(user, noteBook) {
        this.user = user;
        this.noteBook = noteBook;
    }
    displayNoteBook() {
        console.log(`User: ${this.user.name}`);
        this.noteBook.showNotes();
    }
}
const userBookInfo = new UserNoteBook(infoUser, noteBookInfo);
userBookInfo.displayNoteBook();
class Storage {
    data = [];
    addItem(item) {
        this.data.push(item);
    }
    removeItem(index) {
        this.data.splice(index, 1);
    }
    getAllItems() {
        return this.data;
    }
}
const storageInfo = new Storage();
storageInfo.addItem(noteInfo);
console.log(storageInfo.getAllItems());
storageInfo.removeItem(0);
console.log(storageInfo.getAllItems());
