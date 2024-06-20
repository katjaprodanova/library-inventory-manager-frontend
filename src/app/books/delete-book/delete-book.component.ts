import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/book.service';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent {
  bookId:number;
  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data:number,
    private bookService: BookService,
  ) {this.bookId = data;}

  deleteBook(){
    this.bookService.deleteBook(this.bookId).subscribe(response=>{
      this.dialogRef.close(true);
    })
  }
  cancel(){
    this.dialogRef.close();

  }

}
