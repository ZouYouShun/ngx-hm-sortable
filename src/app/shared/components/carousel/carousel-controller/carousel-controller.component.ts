import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-controller',
  templateUrl: './carousel-controller.component.html',
  styleUrls: ['./carousel-controller.component.css'],
})
export class CarouselControllerComponent implements OnInit {

  index;

  constructor() { }

  ngOnInit() {
  }

  // next() {
  //   this.drawView(++this.ViewIndex);
  // }

  // prev() {
  //   this.drawView(--this.ViewIndex);
  // }

}
