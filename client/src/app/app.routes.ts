import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Messages } from '../features/messages/messages';
import { Lists } from '../features/lists/lists';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors.component';
import { NotFound } from '../shared/not-found/not-found';
import { ServerError } from '../shared/server-error/server-error';
import { Profile } from '../features/members/profile/profile';
import { Photos } from '../features/members/photos/photos';
import { memberResolver, photoResolver } from '../features/members/member-resolver';

export const routes: Routes = [
  {path: '', component: Home},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [ authGuard ],
    children: [
      {path: 'members', component: MemberList},
      {
        path: 'members/:id',
        runGuardsAndResolvers: 'always',
        resolve: {
          member: memberResolver,
          photo: photoResolver
        },
        component: MemberDetailed,
        children: [
          {path: '', redirectTo: 'profile', pathMatch: 'full'},
          {path: 'profile', component: Profile, title: 'Profile'},
          {path: 'photos', component: Photos, title: 'Photos'},
          {path: 'messages', component: Messages, title: 'Messages'}
        ]
      },
      {path: 'lists', component: Lists},
      {path: 'messages', component: Messages},
    ]
  },
  {path: 'errors', component: TestErrors},
  {path: 'server-error', component: ServerError},
  {path: '**', component: NotFound},
];
