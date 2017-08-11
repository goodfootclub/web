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
        getWindow().localStorage.setItem(this.jwtTokenKeyName, token);
    }

    deleteToken() {
        this._token = null;
        getWindow().localStorage.removeItem(this.jwtTokenKeyName);
    }

    private get jwtTokenKeyName() {
        return 'gffcjwttoken';
    }
}
