'use strict';

class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state = this._state * 1.5;
  }

  set state(value) {
    if (value < 0) {
      this._state = 0;
    } else if (value > 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    for (const book of this.books) {
      if (book[type] === value) {
        return book;
      }
    }
    return null;
  }

  giveBookByName(bookName) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].name === bookName) {
        const book = this.books[i];
        this.books.splice(i, 1);
        return book;
      }
    }
    return null;
  }
}

// Тестовый сценарий
const library = new Library('Библиотека имени Ленина');

library.addBook(
  new DetectiveBook(
    'Артур Конан Дойл',
    'Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе',
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    'Аркадий и Борис Стругацкие',
    'Пикник на обочине',
    1972,
    168
  )
);
library.addBook(new NovelBook('Герберт Уэллс', 'Машина времени', 1895, 138));
library.addBook(new Magazine('Мурзилка', 1924, 60));

console.log(library.findBookBy('name', 'Властелин колец')); // null
console.log(library.findBookBy('releaseDate', 1924).name); // "Мурзилка"

console.log('Количество книг до выдачи: ' + library.books.length); // 4
library.giveBookByName('Машина времени');
console.log('Количество книг после выдачи: ' + library.books.length); // 3

// Поиск книги 1919 года или её создание
let book1919 = library.findBookBy('releaseDate', 1919);
if (!book1919) {
  book1919 = new NovelBook('Неизвестный автор', 'Книга 1919 года', 1919, 200);
  library.addBook(book1919);
  console.log('Книга 1919 года создана и добавлена:', book1919.name);
} else {
  console.log('Книга 1919 года найдена:', book1919.name);
}

// Выдача книги
const givenBook = library.giveBookByName('Пикник на обочине');
console.log('Выдана книга:', givenBook.name);

// Повреждение книги
givenBook.state = 20;
console.log('Состояние после повреждения:', givenBook.state); // 20

// Восстановление книги
givenBook.fix();
console.log('Состояние после восстановления:', givenBook.state); // 30

// Попытка добавить восстановленную книгу обратно
library.addBook(givenBook);
console.log('Количество книг после попытки возврата:', library.books.length);
// Книга не добавится, так как state = 30 (не больше 30)git add ./5.classes/task.js