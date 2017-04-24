import { Injectable } from '@angular/core';

function getWindow (): any {
    return window;
}

@Injectable()
export class WindowRefService {

    get window (): any {
        return getWindow();
    }
}
