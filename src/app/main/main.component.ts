import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../service/data.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showUploadBtn: boolean;
	translations: Array<any>;
	languages: Array<any>;
  translation: any;
  
  constructor(private http: HttpClient, private data: DataService) {
    
    this.translations = [];
		this.languages = [
			{ name: 'Русский', value: 'ru' },
			{ name: 'English', value: 'en' },
			{ name: 'French', value: 'fr' }
		];
		this.translation = {
			translation_name: '',
			initial_text: '',
			initial_lang: '',
			translation_text: '',
			translation_lang: ''
		};
		this.showUploadBtn = true;
   }

  ngOnInit(): void {
    console.log('Created main component...');
    localStorage.getItem('user-translation') ? this.translations = JSON.parse(localStorage.getItem('user-translation')) : this.translations = [];
    
    // get selected translation from archive
    this.data.currentTranslation.subscribe(item => this.translation = item);
    console.log('Current selected translation: ',this.translation);

    // hide upload button to avoid uploading same translation
    (Object.keys(this.translation).length > 0) ? this.showUploadBtn = false : this.showUploadBtn = true;
  }

  public setTranslation(item) {
    console.log('Get: ', item);
    this.translations.push(item);
    localStorage.setItem('user-translation', JSON.stringify(this.translations));
    this.clearForm();
  }

  public clearForm() {
	  this.translation = {};
  }

}
