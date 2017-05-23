import { UrlSegment } from '@angular/router';

/**
 * A list of exclusions for Http Error Handler service
 * provide a matcher function and error http status to exclude an endpoint(s)
 * from common error handling functionality
 */
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

/**
 * Represents single Http Error Handler service exclusion rule
 */
export class Exclusion {
    matcher: (segments: UrlSegment[]) => boolean;
    status: number;
}
