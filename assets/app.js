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
    // the books
    static displayBooks(){
        //books in local storage
        const books = Store.getBooks();

        // loop through all books in array and call add book to list to add book to list
        books.forEach((book) => UI.addBookToList(book));
    };

    // add a new book based on user input
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

    // delete a book
    static deleteBook(el) {
        // make sure that what we clicked contains the delete class!
        if(el.classList.contains('delete')){
            // delete parent element (tr) of parent element (td) (to delete complete row)
            el.parentElement.parentElement.remove();
        };
    };

    // error or success alert
    static showAlert(message, className) {
        //create a new div
        const div = document.createElement('div');
        div.className = `alert alert-dismissible alert-${className}`;
        div.appendChild(document.createTextNode(message));
        //select container
        const container = document.querySelector('.container');
        //select form
        const form = document.querySelector('#book-form');
        // insert alert div before the form
        container.insertBefore(div, form);
        // vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(),1700);

    }
    
    // clear fields
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    };

};


// LOCAL STORAGE MODULE
class Store {
    // get books from local storage
    static getBooks() {
        // check if books is already in local storage
        let books;
        if(localStorage.getItem('books') === null){
            // if not create a new empty array for books
            books = [];
        } else {
            // if exist get current array
            books = JSON.parse(localStorage.getItem('books'));
        };
        // return whatever is in books
        return books;
    };

    // add book to local storage
    static addBook(book) {
        // get books from local storage
        const books = Store.getBooks();
        // push on whatever is passed on books
        books.push(book);
        // set it to localstorage
        localStorage.setItem('books', JSON.stringify(books));

    };

    // remove book from local storage by their isbn since it's their unique id
    static removeBook(isbn) {
        const books = Store.getBooks();
        // loop through books
        books.forEach((book, index) => {
            // if isbn matches one input to remove
            if(book.isbn === isbn){
                // slice matched book out of the array using index
                books.splice(index, 1);
            };
        });
        localStorage.setItem('books', JSON.stringify(books));
    };
};

// DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//ADD A BOOK
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent default action (submit form - refreshes webpage!)
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate form input
    if(title === '' || author === '' || isbn === '') {
        // show error message prompting user to fill in all fields
        UI.showAlert('Please fill in all of the fields.', 'danger')
    } else {
        // let user know the book was added
        UI.showAlert('The book was added successfully.','success')
        // instantiate book
        const book = new Book(title, author, isbn);
        // add book to the ui
        UI.addBookToList(book);
        // add book to local storage
        Store.addBook(book);
        // clear fields after submit
        UI.clearFields();
    };

    

});

//REMOVE A BOOK
//target the actual list w/ event listener
document.querySelector('#book-list').addEventListener('click', (el) => {
    //target the current element - remove book from UI
    UI.deleteBook(el.target);
    // remove book from local storage
    Store.removeBook(el.target.parentElement.previousElementSibling.textContent);
    // alert the user that the book was removed
    UI.showAlert(`The book was removed.`, 'secondary');
});