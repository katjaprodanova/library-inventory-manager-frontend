# LibraryInventoryManager

This project is designed for managing library books, especially helpful for librarians to manage and keep track of the books in the library. 
- Using Angular fronend and Angular Material.
- My SpringBoot repository for backend, [click here.](https://github.com/katjaprodanova/library-inventory-manager-backend)

### Running the application
- Application runs on port 4200.
  -  Run SpringBoot backend.
  -  Run frontend by using `ng serve`in terminal.
  - Navigate to https://localhost:4200/ in your browser to use the app.

### Main page 
 - <img src="screenshot_mainpage.png" alt="ExpressInk Screenshot" width="600">
### Adding a book
- <img src="screenshot_addbook.png" alt="ExpressInk Screenshot" width="600">
- All fields are required. If the user leaves a blank field, it turns red
### Sorting
- <img src="screenshot_addsortbook.png" alt="ExpressInk Screenshot" width="600">
- We can click on the 'Number of pages' header, and it sorts our books, by ascending, or descending order. 
- On the picture above, I intentionally made the book's number of pages very low (8), so we can see the book pop up first when we sort them.
- The sorting works for Book Name, Author, Category and Number of pages. It is disabled for the other fields.
### Search a book
- <img src="screenshot_search.jpg" alt="ExpressInk Screenshot" width="600">
- Searching by keyword "Hist", it gives us the 2 books that include it in their book title.
- <img src="screenshot_searchauthor.png" alt="ExpressInk Screenshot" width="600">
- Searching by keyword "Hist", it gives us the 2 books that include it in their book title.
### Pagination
- <img src="screenshot_pagination.png" alt="ExpressInk Screenshot" width="600">
- Choose how many books per page to be displayed.
### Delete 
- <img src="screenshot_delete.png" alt="ExpressInk Screenshot" width="600">
### Edit book
- <img src="screenshot_editbook.png" alt="ExpressInk Screenshot" width="600">

