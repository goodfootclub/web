import { Injectable } from '@angular/core';

function getWindow (): any {
    return window;
}

@Injectable()
export class WindowRefService {

    private _fullscreen = true;
    /* Safari workaround */
    private _token: string;

    setFullScreen(value: boolean) {
        this._fullscreen = value;
    }

    get fullScreen(): boolean {
        return this._fullscreen;
    }

    get window (): any {
        return getWindow();
    }

    get token(): string {
        return this._token ||
            getWindow().localStorage.getItem(this.jwtTokenKeyName);
    }

    set token(token: string) {
        this._token = token;
        try {
            getWindow().localStorage.setItem(this.jwtTokenKeyName, token);
        } catch (e) { /* Do nothing. Looks like Safari */ }
    }

    deleteToken() {
        this._token = null;
        try {
            getWindow().localStorage.removeItem(this.jwtTokenKeyName);
        } catch (e) { /* Do nothing. Looks like Safari */ }
    }

    private get jwtTokenKeyName() {
        return 'gffcjwttoken';
    }
}
