import { DragScrollDirective } from './shared/directive/drag-scroll/drag-scroll.directive';
import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  avatars = [
    {
      name: '1',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: '2',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: '3',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: '4',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: '5',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: '6',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    },
  ];
  ngOnInit(): void {
  }

  constructor() {
  }

}
