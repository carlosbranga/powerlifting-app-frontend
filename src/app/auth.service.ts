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
}