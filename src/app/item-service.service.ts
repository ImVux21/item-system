import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Item } from './model/item';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { } 

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getItems() {
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    })
    return this.http.get('assets/db.json', options).pipe(catchError(this.handleError)); 

    // http.post(url, body, option);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    return throwError(() => new Error('Cannot retrieve data'))
  }

  addItem(item: Item) {
    let options = this.getStandardOptions();
    console.log(item);
    
    // options.headers = options.headers.set('Authorization', 'value');

    return this.http.post('assets/db.json', item, options).pipe(catchError(this.handleError));
  }
}
