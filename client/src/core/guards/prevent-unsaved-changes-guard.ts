import { CanDeactivateFn } from '@angular/router';
import { Profile } from '../../features/members/profile/profile';

export const preventUnsavedChangesGuard: CanDeactivateFn<Profile> = (component: Profile): boolean => {
  if (component.editForm?.dirty) {
    return confirm('Are you sure you want to leave? Your changes will be lost.');
  }
  return true;
};
