import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class SaucerService
{

	//private apiUrl = 'https://stark-river-41252.herokuapp.com/api/';
	private apiUrl = environment.API_URL;
	restaurants = [];
	constructor(private http: Http){}

	getSaucers(restaurantId:string){

		//https://stark-river-41252.herokuapp.com/api/restaurants/58866b06eaa0c200046f5e6e
		return this.http.get( this.apiUrl + 'restaurants/' + restaurantId + '/saucers')
		.map((response:Response) => response.json())
		.toPromise();
	}

	getSaucer(saucerId:string){
		return this.http.get(this.apiUrl + 'saucers/' + saucerId)
		.map((response:Response) => response.json())
		.toPromise();
	}
}