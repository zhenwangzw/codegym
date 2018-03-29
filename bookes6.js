;
(function (global) {
  // ==================BOOKLIST SECTION==================

  // ===Elements===
  const bookSection = global.bookSection = document.querySelector('#book-section')
  const bookFormSection = global.bookFormSection = document.querySelector('#book-form-section')
  const bookForm = global.bookForm = document.querySelector('#book-form')

  const bookTitle = global.bookTitle = document.querySelector('#book-title')
  const bookAuthor = global.bookAuthor = document.querySelector('#book-author')
  const bookIsbn = global.bookIsbn = document.querySelector('#book-isbn')
  const addBook = global.addBook = document.querySelector('#addbook')
  const bookList = global.bookList = document.querySelector('#booklist')

  const localStorage = global.localStorage

  // ===Load All Event Listeners===
  loadAllEventListeners()

  function loadAllEventListeners() {
    document.addEventListener('DOMContentLoaded', getBookList)
    bookForm.addEventListener('submit', addBookToBookList)
    bookList.addEventListener('click', removeBookFromBookList)
  }


  // ===Book & UI & LocalStorage Class===
  class Book {
    constructor(title, author, isbn) {
      this.title = title
      this.author = author
      this.isbn = isbn
    }
  }

  class UI {
    // UI add book method
    addBook(book) {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">Delete</a></td>
      `
      bookList.appendChild(row)
    }

    // UI delete book method
    removeBook(e) {
      if (e.target.classList.contains('delete')) {
        const bookToDelete = e.target.parentElement.parentElement
        bookToDelete.remove()
      }
      e.preventDefault()
    }

    // UI clear book form method
    clearForm() {
      bookTitle.value = ''
      bookAuthor.value = ''
      bookIsbn.value = ''
    }

    // UI show alert message method
    showAlert(message, className) {
      const div = document.createElement('div')
      div.className = `alert ${className}`
      div.appendChild(document.createTextNode(message))
      bookFormSection.insertBefore(div, bookForm)
      setTimeout(function () {
        document.querySelector('.alert').remove()
      }, 3000)
    }
  }

  class LocalStorage {
    // localStorage add book method
    addBook(book) {
      let bookList
      if (localStorage.getItem('book-list') === null) {
        bookList = []
      } else {
        bookList = JSON.parse(localStorage.getItem('book-list'))
      }

      bookList.push(book)
      localStorage.setItem('book-list', JSON.stringify(bookList))
    }

    // localStorage remove book method
    removeBook(book) {
      let bookList
      if (localStorage.getItem('book-list') === null) {
        bookList = []
      } else {
        bookList = JSON.parse(localStorage.getItem('book-list'))
      }
      bookList.forEach((bookItem, index) => {
        if (book.isbn === bookItem.isbn) {
          bookList.splice(index, 1)
        }
      });
      localStorage.setItem('book-list', JSON.stringify(bookList))
    }

    // localStorage clear book list
    clearBook() {
      // clear UI first
      if (confirm('are you sure to clear all books?')) {
        while (bookList.firstChild) {
          bookList.removeChild(bookList.firstChild)
        }
        localStorage.removeItem('book-list')
      }
    }
  }

  // ===Event Handlers===

  // Get all books from local storage and display
  function getBookList() {
    let bookList
    if (localStorage.getItem('book-list') === null) {
      bookList = []
    } else {
      bookList = JSON.parse(localStorage.getItem('book-list'))
    }

    bookList.forEach(function (b) {
      const ui = new UI()
      ui.addBook(b)
    })
  }

  // Add book to localstorage and display
  function addBookToBookList(e) {
    const title = bookTitle.value
    const author = bookAuthor.value
    const isbn = bookIsbn.value
    const isValid = (title !== '' && author !== '' && isbn !== '')

    const ui = new UI()
    const localStorage = new LocalStorage()

    if (!isValid) {
      ui.showAlert('Please fill in all fields.', 'error')
    } else {
      const book = new Book(title, author, isbn)
      ui.addBook(book)
      ui.clearForm()
      localStorage.addBook(book)
      ui.showAlert('Book Added.', 'success')
    }

    e.preventDefault()
  }

  // Delete book from ui and localstorage
  function removeBookFromBookList(e) {
    const ui = new UI()
    const localStorage = new LocalStorage()

    if (e.target.classList.contains('delete')) {
      const title = e.target.parentElement.parentElement.firstElementChild
      const author = title.nextElementSibling
      const isbn = author.nextElementSibling

      if (confirm(`Are you sure to delete ${title.textContent}?`)) {
        const book = new Book(title.textContent, author.textContent, isbn.textContent)
        ui.removeBook(e)
        localStorage.removeBook(book)
        ui.showAlert('Book deleted.', 'success')
      }
    }

    e.preventDefault()
  }

})(window)