import { Injectable } from '@angular/core';

function getWindow (): any {
    return window;
}

@Injectable()
export class WindowRefService {

    private _fullscreen = true;

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
        return getWindow().localStorage.getItem(this.jwtTokenKeyName);
    }

    set token(token: string) {
        getWindow().localStorage.setItem(this.jwtTokenKeyName, token);
    }

    deleteToken() {
        getWindow().localStorage.removeItem(this.jwtTokenKeyName);
    }

    private get jwtTokenKeyName() {
        return 'gffcjwttoken';
    }
}
