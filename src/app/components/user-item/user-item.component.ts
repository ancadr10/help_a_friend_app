import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { User } from '../../models/user.model';

@Component({
  selector: 'user-item',
  imports: [
    RouterLink
  ],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent {
  user = input.required<User>();

}
