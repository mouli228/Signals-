import 'zone.js/dist/zone';
import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { item } from './item';


@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:"./signals.html"
    
})
export class App {
  name = 'signals';

  //example of signal
  quantity = signal<number>(1)
  qtyAvailable = signal([1,2,3,4,5,6])

  Electronics = signal<item>({ id: "1", name: 'Apple Macbook Pro', price: 120000 });

 //computed function
  price = computed(() => this.Electronics().price * this.quantity() )

  color = computed (( )=> this.price() > 120000 ? 'green':'blue' )

constructor(){
  console.log(this.quantity());

  // Update
  this.quantity.update((qty) => qty * 2);

  // mutate function
  this.Electronics.mutate((v) => v.price = v.price + (v.price * 0.2));


// Example of an effect
effect(() => console.log(JSON.stringify(this.Electronics())));
}

   // Example of a declarative effect
   qtyEff = effect(() => console.log("Latest quantity:", this.quantity()));

  onQuantitySelected(qty:number){
    this.quantity.set(qty);

    // set example
    // this.quantity.set(5)
  }
}

bootstrapApplication(App);
