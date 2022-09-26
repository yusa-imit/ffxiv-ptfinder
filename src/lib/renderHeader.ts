import { NextRouter } from 'next/router';
import { PreventRenderHeader } from '@constant/PreventRenderHeader';

export const renderHeader: (router: NextRouter) => 'none' | 'block' = (router: NextRouter) => {
  const distructure = router.pathname.split('/');
  for (let i = 0; i < PreventRenderHeader.length; i++) {
    const prevent = PreventRenderHeader[i].split('/');
    if (prevent[1] === distructure[1]) {
      // if prevent is same as distructure
      if (prevent.length === 2) return 'none';

      // else for looping prevent render route.
      for (let j = 2; j < distructure.length; j++) {
        // if prevent render contains '*' then always none
        if (prevent[j] === '*') return 'none';
        // if prevent render differs to distructure's name, then block
        if (prevent[j] !== distructure[j]) return 'block';
      }
      // loop over means every route is same to distructure, so return none
      return 'none';
    }
  }
  // nothing else is founded, return block
  return 'block';
};
