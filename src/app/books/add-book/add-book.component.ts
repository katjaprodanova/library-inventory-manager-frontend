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

  public book:Book = {
    author:"",
    bookName:"",
    description:"",
    imgUrl:"",
    category: {
      id: 0,
      name: ''
    },
    numberOfPages:0,
    id :0

  }
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
     this.form = new FormGroup({
       bookName: new FormControl("",Validators.required),
       author: new FormControl("",Validators.required),
       category: new FormControl("",Validators.required),
     
       numberOfPages: new FormControl("",Validators.required),
       description: new FormControl("",Validators.required),
       imgUrl: new FormControl("",Validators.required)
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
    if(this.form.valid){
     this.book.bookName = this.form.get("bookName")?.value;
     this.bookService.addBook(this.book).subscribe(response => {
       console.log(response);
       this.dialogRef.close(true);
     })
    }
   }
   cancel(){
     this.dialogRef.close()
   }
   ngOnDestroy(): void {
     this.sub.unsubscribe();
    }

}
