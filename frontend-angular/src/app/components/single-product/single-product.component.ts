import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../classes/product';
import { NumberWithCommasPipe } from '../../pipes/number-with-commas.pipe';

@Component({
  selector: 'app-single-product',
  imports: [NumberWithCommasPipe],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {

  @Input() singleProduct : Product
  @Output() close = new EventEmitter<void>();
}
