import storage from './modules/storage.js';
import BookcollectionClass from './modules/BookCollectionClass.js';
import { DateTime } from './modules/luxonDate.js';

// check storage

let isStorage = false;

if (storage('localStorage')) {
  isStorage = true;
}

// Books functionalities

const bookscontainer = document.querySelector('.bookscontainer');
const addbook = document.querySelector('.addbutton');
const book = {
  title: '',
  author: '',
};

const bookcollection = new BookcollectionClass();

const appendNewBook = (book) => {
  bookcollection.addBook(book);
  localStorage.setItem('bookcollection', JSON.stringify(bookcollection));
  const div1 = document.createElement('div');
  div1.classList.add('dflex');
  div1.classList.add('spacebetween');
  if (bookcollection.collection.indexOf(book) % 2 !== 0) div1.classList.add('grey');
  const content = `<p>"${book.title}" by ${book.author}</p><button class="removebutton">Remove</button>`;
  div1.innerHTML = content;
  bookscontainer.appendChild(div1);
  const removebutton = div1.querySelector('.removebutton');
  removebutton.addEventListener('click', () => {
    bookcollection.removeBook(book);
    localStorage.setItem('bookcollection', JSON.stringify(bookcollection));
    div1.remove();
  });
};

addbook.addEventListener('click', () => {
  const newbook = Object.create(book);
  newbook.title = document.querySelector('#title').value;
  newbook.author = document.querySelector('#author').value;
  appendNewBook(newbook);
});

document.addEventListener('DOMContentLoaded', () => {
  const booksstoraged = JSON.parse(localStorage.getItem('bookcollection'));
  if (isStorage && booksstoraged != null) {
    for (let i = 0; i < booksstoraged.collection.length; i += 1) {
      appendNewBook(booksstoraged.collection[i]);
    }
  }
});

// date and time

const datetime = document.querySelector('.dateandtime');

const updateTime = () => {
  const date = DateTime.local();

  //   const formattedDate = date.toLocaleDateString('en-US', options).replace(' at', ',');
  const formattedDate = date.toFormat('LLL d, yyyy, hh:mm:ss a');
  datetime.innerHTML = formattedDate;
};

setInterval(updateTime, 1000);

// navbar

const menu = document.querySelectorAll('header li');
const section = document.querySelectorAll('.section');

const menuselector = (menuelement) => {
  for (let i = 0; i < menu.length; i += 1) {
    if (menuelement === menu[i]) {
      if (!menu[i].classList.contains('activewindow')) menu[i].classList.add('activewindow');
      if (section[i].classList.contains('dnone')) section[i].classList.remove('dnone');
    } else {
      if (menu[i].classList.contains('activewindow')) menu[i].classList.remove('activewindow');
      if (!section[i].classList.contains('dnone')) section[i].classList.add('dnone');
    }
  }
};

for (let i = 0; i < menu.length; i += 1) {
  menu[i].addEventListener('click', () => {
    menuselector(menu[i]);
  });
}
