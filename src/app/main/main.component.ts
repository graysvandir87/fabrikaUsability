import { Component, OnInit } from '@angular/core';

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
  
  constructor() {
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
  }

  public clearForm() {
		this.translation = {};
	}

}
