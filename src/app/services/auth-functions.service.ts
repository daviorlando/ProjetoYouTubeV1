import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthFunctionsService {
    private apiUrl = 'http://localhost:3000/users';
    constructor(private auth: AuthService, private http: HttpClient) { }

    // Função para obter o user ID como uma Promise
    async getUserId(): Promise<string | undefined> {
        const user = await firstValueFrom(this.auth.user$);
        return user?.sub;
    }

    // Função para registrar o usuário no db.json
    async registerUser(): Promise<void> {
        const userId = await this.getUserId();
        if (!userId) return;

        // Verifica se o usuário já está registrado
        const users = await firstValueFrom(this.http.get<any[]>(this.apiUrl));
        const userExists = users.some(user => user.userId === userId);

        if (!userExists) {
            // Adiciona o novo usuário ao db.json
            await firstValueFrom(
                this.http.post(this.apiUrl, { userId })
            );
            console.log('Usuário registrado:', userId);
        } else {
            console.log('Usuário já registrado:', userId);
        }
    }
}
