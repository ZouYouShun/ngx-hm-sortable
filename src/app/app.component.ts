import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  switchValue = false;
  name: string;
  key = 'children';
  searchText = '';
  data: Array<Object> = [
    {
      name: 'beverages',
      collapse: true,
      children: [
        {
          name: '1',
          collapse: true,
          children: []
        },
        {
          name: '2',
          collapse: true,
          children: [
            {
              name: '1',
              collapse: true,
              children: []
            },
            {
              name: '2',
              collapse: true
            },
            {
              name: '3',
              collapse: true,
              children: []
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            },
            {
              name: '4',
              collapse: true
            }
          ]
        },
        {
          name: '3',
          collapse: true,
          children: []
        },
        {
          name: '4',
          collapse: true
        },
      ]
    },
    {
      name: 'footwear',
      collapse: true,
      children: [
        {
          name: 'footwear/Sneakers',
          collapse: true,
          children: []
        }
      ]
    }
  ];
  constructor() {
    this.name = 'Rendering Nested Trees in Angular 5';
  }
}
