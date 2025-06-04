import { Component, OnInit } from '@angular/core';
import { Category } from '../../classes/category';
import { CategoryServiceService } from '../../sevices/category-service.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [NgIf, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  // בקובץ ה-TS של הקומפוננטה
  editingCategoryId: number | null = null;

  showEdit(categoryId: number) {
    this.editingCategoryId = categoryId;
  }

  closeEdit() {
    this.editingCategoryId = null;
  }

  constructor(private categoryService: CategoryServiceService) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  addCategory(name : string){
    this.categoryService.addCategory(name).subscribe(()=>{
       this.loadCategories();
    });
  }

  deleteCategory(id : number){
    this.categoryService.deleteCategory(id).subscribe(()=>{
      this.loadCategories();
    })
  }

  save(id: number, newName: string) {
    this.categoryService.updateCategory(id, newName).subscribe(() => {
      this.loadCategories(); // טען מחדש את הרשימה
      this.editingCategoryId = null; // סגור את הטופס
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
