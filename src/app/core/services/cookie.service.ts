import { Injectable } from '@angular/core';

declare var document: any;

@Injectable()
export class CookieService {

    createCookie(name: string, value: string, days: number): void {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toISOString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    readCookie(name: string): string {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    eraseCookie(name: string): void {
        this.createCookie(name, '', -1);
    }
}
