import { Pipe, PipeTransform } from '@angular/core';

/**
 * Simple text search
 *
 */
@Pipe({
    name: 'textSearch',
})
export class TextSearchPipe implements PipeTransform {

    searchObject(obj, value) {
        for (let key in obj) {
            if (typeof obj[key] !== 'string') {
                continue;
            }
            if (obj[key].toLowerCase().indexOf(value) !== -1) {
                return true;
            }
        }
        return false;
    }

    transform(items: any[], value: string): any {

        if (!items) {
            return items;
        }

        value = value.toLowerCase();
        if (!value) {
            return items;
        }

        let terms = value.split(' ');

        return items.filter(item => {
            for (let term of terms) {
                if (term && !this.searchObject(item, term)) {
                    return false;
                };
            }
            return true;
        });
    }
}
