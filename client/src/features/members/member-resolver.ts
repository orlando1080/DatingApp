import { ResolveFn, Router } from '@angular/router';
import { MemberService } from '../../core/services/member.service';
import { inject } from '@angular/core';
import { Member, photo } from '../../types/Member';
import { EMPTY } from 'rxjs';

export const memberResolver: ResolveFn<Member> = (route, state) => {
  const memberService: MemberService = inject(MemberService);
  const router: Router = inject(Router);
  const memberId: string | null = route.paramMap.get('id');

  if (!memberId) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return memberService.getMember(memberId);
};

export const photoResolver: ResolveFn<Array<photo>> = (route, state) => {
  const memberService: MemberService = inject(MemberService);
  const router: Router = inject(Router);
  const memberId: string | null = route.paramMap.get('id');

  if (!memberId) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return memberService.getMemberPhotos(memberId);
};
