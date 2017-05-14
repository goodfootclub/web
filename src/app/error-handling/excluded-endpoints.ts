import { UrlSegment } from '@angular/router';

export default class Exclusions {
    public static readonly LIST: Exclusion[] = [
        { matcher: (segments => {
            return segments.length === 3 &&
                (segments[0].path === 'teams' ||
                    segments[0].path === 'games') &&
                segments[2].path === 'players';
        }), status: 409 },
    ];
}

export class Exclusion {
    matcher: (segments: UrlSegment[]) => boolean;
    status: number;
}
