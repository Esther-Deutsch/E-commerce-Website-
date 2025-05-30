import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appColorHeart]'
})
export class ColorHeartDirective {

  constructor(private elementRef : ElementRef) { }

  @HostListener('click') onClick(){
    this.elementRef.nativeElement.style.background = "yello";
  }

}
