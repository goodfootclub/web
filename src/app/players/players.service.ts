import { Injectable } from '@angular/core';


const TEST_PLAYERS = [];

@Injectable()
export class PlayersService {

    constructor() { }

    getPlayers() {
        return TEST_PLAYERS;
    }
}
