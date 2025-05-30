import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductsServiceService } from '../../sevices/products-service.service';
import { NumberWithCommasPipe } from '../../pipes/number-with-commas.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-manage-products',
  imports: [ReactiveFormsModule, CommonModule, NumberWithCommasPipe,NgIf, MatFormFieldModule,],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent implements OnInit {

  // משתנה לשליטה על החלון הקופץ
  isAddProductVisible: boolean = false; 

  constructor(public productService : ProductsServiceService, private productsService : ProductsServiceService) {}

  addProductForm : FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    imgName: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    qty: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productsService.getAllProducts().subscribe(data =>{ this.productsService.products = data });
  }

  toggleAddProduct(): void {
    this.isAddProductVisible = !this.isAddProductVisible;
  }

  deleteProduct(id : number)
  {
    this.productService.deleteProduct(id).subscribe(()=>{
      this.loadProducts();
    });
  }

  outOfStock(){
    this.productService.getNotInStack().subscribe(data => this.productService.products = data)
  }

  submit(){
    const newProduct : Product = new Product(
      0,
      this.addProductForm.get("categoryId")?.value,
      this.addProductForm.get("productName")?.value,
      this.addProductForm.get("desc")?.value,
      this.addProductForm.get("price")?.value,
      this.addProductForm.get("qty")?.value,
      this.addProductForm.get("imgName")?.value,
      this.addProductForm.get("color")?.value,
    )

    this.productService.addProduct(newProduct).subscribe(()=>{
      this.toggleAddProduct();
      this.loadProducts();
    })
  }

}

