class User {
  constructor(
    private id: number,
    public name: string,
    public email: string,
    private _password: string,
    private _age: number,
    protected phone: string,
  ) {
    if (_age < 18 || _age > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = _age;
  }

  public displayInfo(): void {
    console.log(
      `ID:${this.id}, Name:${this.name}, Email:${this.email}, Age:${this._age}, Phone:${this.phone}, Password: Hidden`
    );
  }
}

const infoUser = new User(
  1,
  "mahmoud",
  "task15@gmail.com",
  "123456",
  22,
  "01097027575"
);

infoUser.displayInfo();


// 2
class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    age: number,
    phone: string,
  ) {
    super(id, name, email, password, age, phone);
  }

  public manageNotes(): void {
    console.log("admin can manage notes");
  }
}

const adminInfo = new Admin(
  1,
  "mahmoud",
  "task15@gmail.com",
  "123456",
  22,
  "01097027575"
);

adminInfo.displayInfo();
adminInfo.manageNotes();


// 3
class Note {
  constructor(
    private id: number,
    public title: string,
    public content: string,
    public author: User
  ) {}

  public preview(): void {
    console.log("short content: " + this.content.substring(0, 10));
  }
}

const noteInfo = new Note(
  1,
  "note1",
  "this is my first note",
  infoUser
);

noteInfo.preview();


// 4
class NoteBook {
  private notes: Note[] = [];

  public addNote(note: Note): void {
    this.notes.push(note);
    console.log("Note added");
  }

  public removeNote(index: number): void {
    this.notes.splice(index, 1);
    console.log("Note removed");
  }

  public showNotes(): void {
    console.log(this.notes);
  }
}

const noteBookInfo = new NoteBook();

noteBookInfo.addNote(noteInfo);
noteBookInfo.showNotes();
noteBookInfo.removeNote(0);
noteBookInfo.showNotes();


// 5
class UserNoteBook {
  constructor(public user: User, public noteBook: NoteBook) {}

  public displayNoteBook(): void {
    console.log(`User: ${this.user.name}`);
    this.noteBook.showNotes();
  }
}

const userBookInfo = new UserNoteBook(infoUser, noteBookInfo);

userBookInfo.displayNoteBook();


// 7
class Storage<T> {
  private data: T[] = [];

  public addItem(item: T): void {
    this.data.push(item);
  }

  public removeItem(index: number): void {
    this.data.splice(index, 1);
  }

  public getAllItems(): T[] {
    return this.data;
  }
}

const storageInfo = new Storage<Note>();

storageInfo.addItem(noteInfo);

console.log(storageInfo.getAllItems());

storageInfo.removeItem(0);

console.log(storageInfo.getAllItems());