import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private http:Http
  ) { }

  get(url) {
    return this.http.get(url)
      .pipe(map(res => res.json())).toPromise();
  }

  post(url, params) {
    return this.http.post(url, params).toPromise();
  }

  put(url, id, params) {
    return this.http.put(url + '/' + id, params).toPromise();
  }

  putAll(url, params) {
    return this.http.put(url, params).toPromise();
  }

  delete(url, id) {
    return this.http.delete(url + '/' + id).toPromise();
  }
}