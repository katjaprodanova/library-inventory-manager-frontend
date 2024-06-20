import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/book.service';
import { Category } from 'src/app/category';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public book:Book
  form : FormGroup
  public categories: Category[]=[];
  sub = new Subscription();
  
   constructor(
     public dialogRef: MatDialogRef<AddBookComponent>,
    // @Inject(MAT_DIALOG_DATA) public data:Book,
     private categoryService : CategoryService,
     private bookService: BookService,
     private changeDetectorRef: ChangeDetectorRef
   ) {}
 
   ngOnInit(): void {
   //  this.book = this.data;
     this.form = new FormGroup({
       bookName: new FormControl(this.book.bookName),
       author: new FormControl(this.book.author),
       category: new FormControl(this.book.category.id),
     
       numberOfPages: new FormControl(this.book.numberOfPages),
       description: new FormControl(this.book.description ),
       imgUrl: new FormControl(this.book.imgUrl)
     });
     this.sub.add(
       this.categoryService.getCategories().subscribe(response=>{
         this.categories = response;
       })
     )
     this.sub.add(
       this.form.get("category")?.valueChanges.subscribe(value=>{
         console.log(value)
         const category = this.categories.find(category=> category.id === value);
         this.book.category = category as Category,
         this.changeDetectorRef.detectChanges();
       })
     )
   }
 
   submit(){
     this.book.bookName = this.form.get("bookName")?.value;
     this.bookService.updateBook(this.book).subscribe(response => {
       console.log(response);
       this.dialogRef.close();
     })
   }
   cancel(){
     this.dialogRef.close()
   }
   ngOnDestroy(): void {
     this.sub.unsubscribe();
    }

}
