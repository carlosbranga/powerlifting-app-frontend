import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroments';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    login(credenciais: any) {
        return this.http.post(`${environment.apiUrl}/login`, credenciais);
    }

    registrar(dados: any) {
        return this.http.post(`${environment.apiUrl}/register`, dados);
    }

    getPerfil() {
    const token = localStorage.getItem('token');
    return this.http.get(`${environment.apiUrl}/user-info`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePerfil(dados: any) {
    const token = localStorage.getItem('token');
    return this.http.put(`${environment.apiUrl}/user`, dados, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}