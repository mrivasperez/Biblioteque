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

        // add html to row
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-outline-danger btn-sm delete">X</a></td>
        `;
        // append the row to the list
        list.appendChild(row);
    };

    static deleteBook(el) {
        //make sure that what we clicked contains the delete class
        if(el.classList.contains('delete')){
            //delete parent of parent element (complete row)
            el.parentElement.parentElement.remove();
        };
    };

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    };

};


// STORAGE

// DISPLAY BOOKS

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//ADD A BOOk
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent default action (submit form - refreshes webpage!)
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // instantiate book
    const book = new Book(title, author, isbn);

    // add book to the ui
    UI.addBookToList(book);

    // clear fields after submit
    UI.clearFields();

});

//REMOVE A BOOK
document.querySelector('#book-list').addEventListener('click', (el) => {
    UI.deleteBook(el.target);
});