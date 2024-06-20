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
import { DeleteBookComponent } from './delete-book/delete-book.component';

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
  

  this.dataSource.filter = filterValue;
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


// public filterBooksByCategory(books: Book[]): Book[] {
//   if (this.selectedCategoryId) {
//     return books.filter(book => book.category && book.category.id === this.selectedCategoryId);
//   }
//   return books;
// }


onEditBookClick(book:Book){
 const dialogRef =  this.matDialog.open(BookDetailsComponent, {data:book})

  dialogRef.afterClosed().subscribe(result => {
    this.bookService.updateBook(result)
  });
}

onAddBookClick(){
  const dialogRef =  this.matDialog.open(AddBookComponent)
   dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.getBooks();
    }
   });
 }
 public onDeleteBook(bookId: number): void{
  const dialogRef =  this.matDialog.open(DeleteBookComponent,{data:bookId})
   dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.getBooks();
    }
   });
}
}
