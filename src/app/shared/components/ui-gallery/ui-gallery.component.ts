import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './ui-gallery.component.html',
  styleUrls: ['./ui-gallery.component.css']
})
export class UiGalleryComponent {
  private allowSelected = true;

  @Input() toggle = true;
  @Input() currentAvatar = 0;
  @Input() avatars = [
    {
      name: 'kristy',
      image: 'https://de.aorus.com/upload/Downloads/F_20170531143736CxudUM.JPG',
      visible: true,
      loadding: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false,
      loadding: true
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    }
  ];

  onSelected(idx) {
    this.currentAvatar = idx;
  }

  prev() {
    if (this.currentAvatar === 0) {
      this.currentAvatar = this.avatars.length - 1;
      return;
    }
    this.currentAvatar--;
  }

  next() {
    if (this.currentAvatar === this.avatars.length - 1) {
      this.currentAvatar = 0;
      return;
    }
    this.currentAvatar++;
  }
<<<<<<< HEAD


  prev() {
    if (this.currentAvatar === 0) {
      this.currentAvatar = this.avatars.length - 1;
      return;
    }
    this.currentAvatar--;
  }

  next() {
    if (this.currentAvatar === this.avatars.length - 1) {
      this.currentAvatar = 0;
      return;
    }
    this.currentAvatar++;
  }

=======
>>>>>>> 9724fb3d2b077c0c636ec299a01975f1c3effb5d
}
