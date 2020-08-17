import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  translations: Array<any>;

  constructor() {
    this.translations = [];
   }

  ngOnInit(): void {
    console.log('Created archive component...');
		localStorage.getItem('user-translation') ? this.translations = JSON.parse(localStorage.getItem('user-translation')) : this.translations = [];
		console.log(this.translations);
  }

}
