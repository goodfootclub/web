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
}
