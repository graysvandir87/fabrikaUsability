import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
	private translationObject = new BehaviorSubject({});
	currentTranslation = this.translationObject.asObservable();

	$selectTranslation = new EventEmitter();

	constructor() {}

	setTranslation(item: object) {
		this.translationObject.next(item);
	}

	getTranslation() {
		return this.currentTranslation;
	}
}