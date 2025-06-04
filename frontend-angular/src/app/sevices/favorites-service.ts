
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../classes/product';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class FavoritesServiceService {

  private cartItems: Item[] = [];
  private cartSubject = new BehaviorSubject<Item[]>([]);
  cart$ = this.cartSubject.asObservable();
  amountInCart = 0;
  totalSumInCart = 0;

  favoriteImg : string// = "favorites.png"

  constructor() {
    this.loadCartFromStorage();
  }

  /**
   * טוען נתונים מה־localStorage, ומסנן מוצרים לא תקינים.
   */
  private loadCartFromStorage(): void {
    try {
      const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.cartItems = (stored as Item[]).filter(item =>
        item?.product && typeof item.product.productId === 'number'
      );
    } catch (error) {
      console.error('שגיאה בקריאת העגלה מה-localStorage:', error);
      this.cartItems = [];
    }

    this.cartSubject.next(this.cartItems);
  }

  /**
   * מעדכן את ה־localStorage ואת הסטרים
   */
  private updateCart(): void {
    const cleanedCart = this.cartItems.filter(item =>
      item?.product && typeof item.product.productId === 'number'
    );
    localStorage.setItem('cart', JSON.stringify(cleanedCart));
    this.cartSubject.next(this.cartItems);
  }

  // ובודקת האם הפריט בדל id פונקציה שמקבלת 
  isInCart(id : number)
  {
    return this.cartItems.some(item => item.product.productId === id);
  }

  /**
   * הוספת מוצר לעגלה
   */
  addToCart(product: Product): void {
    if (!product || typeof product.productId !== 'number') {
      console.warn('מוצר לא תקין לא נוסף לעגלה:', product);
      return;
    }
  
    // בדיקה אם המוצר כבר קיים בסל
    const exists = this.cartItems.some(item => item.product.productId === product.productId);
    if (exists) {
      // לא מוסיפים שוב
      return;
    }
  
    // אם לא קיים - מוסיפים
    this.cartItems.push({ index: this.cartItems.length, product, quantity: 1 });
    this.totalSumInCart += product.price;
    this.amountInCart += 1;
    this.updateCart();
  }

  /**
   * producyId הסרת מוצר לפי 
   */
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.productId !== productId);
    this.amountInCart -= 1;
    this.updateCart();
  }

  /**
   * הגדלת כמות
   */
  increaseQuantity(index: number): void {
    if (this.cartItems[index]) {
      this.cartItems[index].quantity += 1;
      this.updateCart();
    }
  }

  /**
   * הקטנת כמות
   */
  decreaseQuantity(index: number): void {
    if (this.cartItems[index]) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
      this.updateCart();
    }
  }

  /**
   * ניקוי כל העגלה
   */
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  /**
   * החזרת העגלה עצמה
   */
  getCart(): Item[] {
    return this.cartItems;
  }

  /**
   * חישוב סך כולל
   */
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
}
