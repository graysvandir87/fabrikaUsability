import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../service/data.service";
import uuid from 'uuid';
// import { GoogleObj } from '../models/solution';

import { SolutionService } from '../service/solution.service';
import { Solution, GoogleObj } from '../models/solution';
import { GoogletranslateService } from '../service/googletranslate.service';

// declare var translate: any;
// declare var require: NodeRequire;

// const translate = require('google-translate-api');

// import translate from 'google-translate-api';

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

  solData: Solution = {
    title: '',
    description: '',
    detail: ''
  };

  lang: string;

  
  
  constructor(private http: HttpClient, private data: DataService, private solution: SolutionService, private google: GoogletranslateService) {
    
    this.translations = [];
		this.languages = [
			{ name: 'Русский', value: 'ru' },
			{ name: 'English', value: 'en' },
      { name: 'French', value: 'fr' },
      { name: 'Spanish', value: 'es' },
      { name: 'German', value: 'de' },
      { name: 'Arabic', value: 'ar' }
		];
		this.translation = {
			translation_name: '',
			initial_text: '',
			initial_lang: '',
			translation_text: '',
			translation_lang: ''
		};
    this.showUploadBtn = true;
    this.lang = 'en';
   }

  ngOnInit(): void {
    console.log('Created main component...');
    localStorage.getItem('user-translation') ? this.translations = JSON.parse(localStorage.getItem('user-translation')) : this.translations = [];
    
    // get selected translation from archive
    this.data.currentTranslation.subscribe(item => this.translation = item);
    console.log('Current selected translation: ',this.translation);

    // hide upload button to avoid uploading same translation
    (Object.keys(this.translation).length > 0) ? this.showUploadBtn = false : this.showUploadBtn = true;

    this.solution.getSolution().subscribe(res => this.solData = res);
    console.log(this.solData);
 
    // translate('Ik spreek Engels', {to: 'en'}).then(res => {
    //     console.log(res.text);
    //     //=> I speak English
    //     console.log(res.from.language.iso);
    //     //=> nl
    // }).catch(err => {
    //     console.error(err);
    // })

    this.getAvailableLanguage()
  }

  public getAvailableLanguage() {
    return this.http.get('https://api.cognitive.microsofttranslator.com/')
      .pipe(response => {
        console.log('Response',response);
        return response;
      });
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

  public getLanguages() {
    this.http.get('https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation')
      .subscribe(response => {
        console.log('Reponse',response);
        return response;
    });
  }

  public translateText(){
    let options = {
        method: 'POST',
        baseUrl: 'https://api.cognitive.microsofttranslator.com/',
        url: 'translate',
        qs: {
          'api-version': '3.0',
          'to': ['de', 'it']
        },
        headers: {
          'Ocp-Apim-Subscription-Key': 'b76bf350a06c42b885c06d58ab69f0f9',
          'Ocp-Apim-Subscription-Region': 'westeurope',
          'Content-type': 'application/json',
          'X-ClientTraceId': uuid.v4().toString()
        },
        body: [{
          'text': 'Hello World!'
        }],
        json: true,
    };

    this.http.post(options.baseUrl, options).subscribe(
      success => {
          console.log('response',success);
      }
    );
    
  }

  public testConnection2() {
    const googleObj: GoogleObj = {
      q: [this.solData.title, this.solData.description, this.solData.detail],
      target: this.translation.translation_lang
    };
    this.google.translate(googleObj).subscribe( (res: any) => {
        console.log(res.data.translations[0].translatedText)
      },
      err => {
        console.log(err);
      }
    );

    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.solData = {
          title: res.data.translations[0].translatedText,
          description: res.data.translations[1].translatedText,
          detail: res.data.translations[2].translatedText
        };
        console.log(this.solData);
      },
      err => {
        console.log(err);
      }
    );
  }

}
