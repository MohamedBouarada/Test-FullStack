import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/application';
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) {
  }

  login(params: { username: string; password: string; }): Observable<User> {
    const url = this.baseUrl + '/login';
    return this.http.post<User>(url, params, this.httpOptions);
  }

  // TODO : refactorer les paramètres de `register` sur le modèle de `login`
  // -> On doit avoir un seul paramètre nommé `params` et il doit contenir
  //    les trois champs username, password et email
  register(username: string, password: string, email: string): Observable<User> {
    const url = this.baseUrl + '/register';
    return this.http.post<User>(url, { username, password, email }, this.httpOptions);
  }

  /**
   * TODO : Implémenter les requêtes pour la sauvegarde et le chargement des projets
   * -> Il faut s'inspirer des fonctions ci-dessus
   */
  saveProject() { }
  getProjects() { }

}
