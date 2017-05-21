import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameEvent, RsvpStatuses } from '../../../types';

const DATE_GROUPS = {
    '-1': 'have already past',
    '0': 'today',
    '1': 'tomorrow',
    '2': 'in a week',
    '3': 'in a month',
    '4': 'later',
};

class RsvpStatus {
    id: number;
    name: string;
}

@Component({
    selector: 'app-games-list',
    styleUrls: ['./game-list.component.styl'],
    templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {

    gamesDictionary: { [id: string]: GameEvent[] };

    rsvpMessages = RsvpStatuses.RSVP_MESSAGES;

    rsvpStatusesList = this.getRsvpStatusesList();

    @Output() rsvpStatusChanged: EventEmitter<any> = new EventEmitter();

    @Input('rsvpStatuses')
    rsvpStatuses = false;

    @Input('games')
    set games(games: GameEvent[]) {
        if (games) {
            this.gamesDictionary = this.groupGames(games);
        } else {
            this.gamesDictionary = {};
        }
    }

    constructor() {}

    ngOnInit(): void {}

    keys(): string[] {
        if (this.gamesDictionary) {
            return Object.keys(this.gamesDictionary);
        }
        return [];
    }

    // we shouldn't show group header if there is only one group 'later'
    showGroupTitle(): boolean {
        const keys = this.keys();
        return !(keys.length === 1 && keys[0] === 'later');
    }

    getRsvpStatus(game: GameEvent) {
        if (!this.rsvpStatuses && game.rsvp != null) {
            return this.rsvpMessages[game.rsvp];
        }
    }

    groupGames(games: GameEvent[]): { [id: string]: GameEvent[] } {
        const groupedGames: { [id: string]: GameEvent[] } = {};
        if (games) {
            const now = new Date();
            games.forEach((game) => {
                const gameDate = new Date(game.datetime as string);
                const group = this.findGroupForGame(now, gameDate);
                if (groupedGames[group] == null) {
                    groupedGames[group] = [];
                }
                groupedGames[group].push(game);
            });
        }
        return groupedGames;
    }

    changeRsvpStatus(game: GameEvent, rsvpId: number) {
        this.rsvpStatusChanged.next({ game: game, rsvpId: rsvpId });
    }

    deleteRsvpStatus(game: GameEvent, event: Event) {
        event.stopPropagation();
        this.rsvpStatusChanged.next({ game: game, isDelete: true });
    }

    handleFooterClick(event: Event) {
        event.stopPropagation();
    }

    showRsvpStatuses(game: GameEvent) {
        if (!this.rsvpStatuses) { return false; }
        const gameDate = game.datetime instanceof Array ?
            new Date(game.datetime[0]) : new Date(game.datetime);
        return gameDate > new Date();
    }

    private findGroupForGame(now: Date, date: Date): string {
        date.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        if (now.getTime() > date.getTime()) {
            return DATE_GROUPS['-1'];
        } else if (now.getTime() === date.getTime()) {
            return DATE_GROUPS['0'];
        }
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays =
            Math.round(Math.abs((date.getTime() - now.getTime()) / (oneDay)));
        if (diffDays === 1) {
            return DATE_GROUPS['1'];
        } else if (diffDays <= 7) {
            return DATE_GROUPS['2'];
        } else if (diffDays <= 30) {
            return DATE_GROUPS['3'];
        }
        return DATE_GROUPS['4'];
    }

    private getRsvpStatusesList(): RsvpStatus[] {
        return Object.keys(RsvpStatuses.RSVP_MESSAGES).map(key =>
            ({ id: +key, name: RsvpStatuses.RSVP_MESSAGES[key] } as RsvpStatus),
        ).filter(a => a.id >= 0)
            .sort((a, b) => b.id - a.id);
    }
}
