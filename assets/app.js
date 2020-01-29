//BOOK
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI
class UI {
    //
    static displayBooks(){
        //books in storage
        const StoredBooks = [
            {
                title: 'Example One',
                author: 'Example Two',
                isbn: '123456'
            },
            {
                title: 'Example Two: The Second Example',
                author: 'Example Two',
                isbn: '122345'
            }
        ];
        // books variable linked to StordBooks
        const books = StoredBooks;

        // loop through all books in array and call add book to list to add book to list
        books.forEach((book) => UI.addBookToList(book));
    };
    static addBookToList(book) {
        //create row to add to tbody
        const list = document.querySelector('#book-list');

        //insert tr tag
        const row = document.createElement('tr');

        //add html to row
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        
        `;

    };


}


// STORAGE

// DISPLAY BOOKS

//ADD A BOOk

//REMOVE A BOOK