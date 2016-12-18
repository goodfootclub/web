import { Pipe, PipeTransform } from '@angular/core';

/**
 * Simple text search
 *
 */
@Pipe({
    name: 'textSearch',
})
export class TextSearchPipe implements PipeTransform {

    transform(items: any[], value: string): any {

        if (!items) {
            return items;
        }

        value = value.toLowerCase();
        if (!value) {
            return items;
        }

        return items.filter(item => {
            for (let key in item) {
                if (typeof item[key] !== 'string') {
                    continue;
                }
                if (item[key].toLowerCase().indexOf(value) !== -1) {
                    return true;
                }
            }
            return false;
        });
    }
}
