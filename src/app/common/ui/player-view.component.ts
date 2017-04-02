import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
} from '@angular/core';
import { User } from 'app/types';

/**
 * PlayerViewComponent used by profile and player-details
 */
@Component({
    selector: 'app-player',
    templateUrl: './player-view.component.html',
    styleUrls: ['./player-view.component.styl'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerViewComponent implements OnChanges {
    @Input() player: User;

    coverUrl: string;
    profilePicUrl: string;

    ngOnChanges(param: any) {
        if (this.player == null) {
            return;
        }
        // Change urls to use as a background property
        this.coverUrl = `url(${this.player.cover})`;
        this.profilePicUrl = `url(${this.player.img})`;
    }
}
