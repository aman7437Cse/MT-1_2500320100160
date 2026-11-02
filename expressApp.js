import express from "express";

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Books array
let books = [
    {
        id: 1,
        bookName: "Java Programming",
        author: "James Gosling",
        price: 500,
        quantity: 5,
        category: "Programming"
    },
    {
        id: 2,
        bookName: "Python Basics",
        author: "Guido van Rossum",
        price: 400,
        quantity: 3,
        category: "Programming"
    },
    {
        id: 3,
        bookName: "Data Structures",
        author: "Mark Allen Weiss",
        price: 600,
        quantity: 4,
        category: "Computer Science"
    }
];

// 1. HOME ROUTE
app.get("/", (req, res) => {
    res.send("Welcome to Student Management System API");
});

// 2. GET ALL BOOKS
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// 3. GET BOOK BY ID
app.get("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json(book);
});

// 4. ADD NEW BOOK
app.post("/books", (req, res) => {

    const { id, bookName, author, price, quantity, category } = req.body;

    if (
        !Number.isInteger(id) ||
        !bookName ||
        !author ||
        typeof price !== "number" ||
        typeof quantity !== "number" ||
        books.some(b => b.id === id)
    ) {
        return res.status(400).json({
            message: "Invalid or duplicate book details"
        });
    }

    const newBook = {
        id,
        bookName,
        author,
        price,
        quantity,
        category: category || "General"
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

// 5. UPDATE BOOK
app.put("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { bookName, author, price, quantity, category } = req.body;

    if (
        !bookName ||
        !author ||
        typeof price !== "number" ||
        typeof quantity !== "number"
    ) {
        return res.status(400).json({
            message: "Please provide valid book details"
        });
    }

    book.bookName = bookName;
    book.author = author;
    book.price = price;
    book.quantity = quantity;
    book.category = category || book.category;

    res.status(200).json({
        message: "Book updated successfully",
        book: book
    });
});

// 6. DELETE BOOK
app.delete("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

// START SERVER
app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});