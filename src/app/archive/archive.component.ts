import { Component, OnInit } from '@angular/core';
import { DataService } from "../service/data.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  translations: Array<any>;

  constructor(private router: Router, private data: DataService) {
    this.translations = [];
   }

  ngOnInit(): void {
    console.log('Created archive component...');
		localStorage.getItem('user-translation') ? this.translations = JSON.parse(localStorage.getItem('user-translation')) : this.translations = [];
		console.log(this.translations);
  }

  public openDocument(doc:object) {
		console.log('Current document:', doc);
		this.data.setTranslation(doc);
		this.router.navigate(['/']);
	}

}
