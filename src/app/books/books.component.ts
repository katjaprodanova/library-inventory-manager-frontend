import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../book'
import { HttpErrorResponse } from '@angular/common/http';
import { BookService } from '../book.service';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { NgForm, UntypedFormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddBookComponent } from './add-book/add-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  displayedColumns: string[] = ['imgUrl', 'bookName', 'author', 'category', 'numberOfPages', 'description', 'edit', 'delete'];
  public books: Book[] = [];
  dataSource = new MatTableDataSource<Book>(this.books);

  public totalBooks: number = 0;
  public categories: Category[]=[];
  public selectedCategoryId: number | null = null;

  public editBook: Book | null = null;
  public deleteBook: Book | null = null;

  public isAddingCategory: boolean = false;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService,
    private categoryService: CategoryService,
    public matDialog:MatDialog,
  ){
    this.dataSource.data = this.books;
  }

    
 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
    this.getTotalBooks();
    //this.dataSource.data = this.books;
  //  this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
    console.log("helloooo" + this.dataSource.data.length);
  }

 public getBooks(): void{
  this.bookService.getBooks().subscribe(
    (response: Book[]) =>{
      this.books = response;
      this.dataSource.data = response;
      console.log(this.books);
      console.log(this.totalBooks);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
 }

 applyFilter(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const filterValue = inputElement.value.trim().toLowerCase();
  
  // Implement your filtering logic here
  // For example, you can filter books based on the filterValue

  // Update dataSource or perform filtering action
  this.dataSource.filter = filterValue;
}

public searchBooks(key: string): void {
  const results: Book[] = [];
  //this.totalNumOfBooks = this.getBooks.length;
  for(const book of this.books){
    if (book.bookName.toLowerCase().indexOf(key.toLowerCase())!== -1
        || book.author.toLowerCase().indexOf(key.toLowerCase())!== -1
        || book.author.toLowerCase().indexOf(key.toLowerCase())!== -1
        || book.description.toLowerCase().indexOf(key.toLowerCase())!== -1
        || book.category.name.toLowerCase().indexOf(key.toLowerCase())!== -1){
      results.push(book);
    }
  }
  this.books = results;
  if(results.length === 0 || !key) {
    this.getBooks();
  }
}

public onOpenModal(book: Book | null, mode: string): void{
  const bookContainer = document.getElementById('main-book-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display= 'none';
  button.setAttribute('data-toggle','modal');
  if(mode === 'add'){
    button.setAttribute('data-target','#AddBookModal');
  }
  if(mode === 'edit'){
    this.editBook = book;
    button.setAttribute('data-target','#UpdateBookModal');
  }
  if(mode === 'delete'){
    this.deleteBook = book;
    button.setAttribute('data-target','#DeleteBookModal');
  }

  bookContainer?.appendChild(button);
  button.click();
}
public onOpenCategoryModal(category: Category | null, mode: string): void{
  const container = document.getElementById('body');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display= 'none';
  button.setAttribute('data-toggle','modal');
  if(mode === 'addCategory'){
    button.setAttribute('data-target','#AddCategoryModal');
  }


  container?.appendChild(button);
  button.click();
}


showAddCategoryInput(): void {
  this.isAddingCategory = true;
}

public onAddBook(addForm: NgForm): void{
  document.getElementById('add-form-close-btn')?.click();
  this.bookService.addBook(addForm.value).subscribe(
    (response: Book)=>{
      console.log(response);
      this.getBooks();
      addForm.reset();
    },
    (error: HttpErrorResponse)=>{
      alert(error.message);
    }
    
  )
}

public onUpdateBook(book: Book): void{
  document.getElementById('edit-form-close-btn')?.click();
  this.bookService.updateBook(book).subscribe(
    (response: Book)=>{
      console.log(response);
      console.log(book);
      this.getBooks();
    },
    (error: HttpErrorResponse)=>{
      alert(error.message);
    }
    
  )
}

public onDeleteBook(bookId: number | undefined): void{
  if (bookId === undefined) {
    alert('Book ID is not valid');
    return;
  }
  document.getElementById('delete-form-close-btn')?.click();
  this.bookService.deleteBook(bookId).subscribe(
    (response: void)=>{
      console.log(response);
      this.getBooks();
    },
    (error: HttpErrorResponse)=>{
      alert(error.message);
    }
    
  )
}

 public getCategories(): void {
  this.categoryService.getCategories().subscribe(
    (response: Category[]) => {
      this.categories = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onAddCategory(addCategoryForm: NgForm): void{
  document.getElementById('add-category-form-close-btn')?.click();
  this.categoryService.addCategory(addCategoryForm.value).subscribe(
    (response: Category)=>{
      console.log(response);
      this.getCategories();
      addCategoryForm.reset();
    },
    (error: HttpErrorResponse)=>{
      alert(error.message);
    }
    
  )
}

public getTotalBooks(): void {
  this.bookService.getBookCount().subscribe(
    (count: number) => {
      this.totalBooks = count;
    },
    (error: any) => {
      console.error('Error fetching book count:', error);
    }
  );
}


public filterBooksByCategory(books: Book[]): Book[] {
  if (this.selectedCategoryId) {
    return books.filter(book => book.category && book.category.id === this.selectedCategoryId);
  }
  return books;
}

public onCategoryChange(categoryId: number): void {
  this.selectedCategoryId = categoryId;
  this.getBooks();
}

onEditBookClick(book:Book){
 const dialogRef =  this.matDialog.open(BookDetailsComponent, {data:book})

  dialogRef.afterClosed().subscribe(result => {
    this.bookService.updateBook(result)
  });
}

onAddBookClick(){
  const dialogRef =  this.matDialog.open(AddBookComponent)
   dialogRef.afterClosed().subscribe(result => {
     this.bookService.addBook(result)
   });
 }

}
