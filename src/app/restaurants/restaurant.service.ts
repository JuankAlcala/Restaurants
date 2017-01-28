import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class RestaurantService
{

	private apiUrl = environment.API_URL + 'restaurants/';
	restaurants = [];
	constructor(private http: Http){}

	getRestaurants(){

		return this.http.get(this.apiUrl)
		.map((response:Response) => response.json())
		.toPromise();
	}

	getRestaurant(id:string){

		//https://stark-river-41252.herokuapp.com/api/restaurants/58866b06eaa0c200046f5e6e
		return this.http.get(this.apiUrl + id )
		.map((response:Response) => response.json())
		.toPromise();
	}
}