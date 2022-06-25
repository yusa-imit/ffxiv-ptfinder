import { KeyboardEvent } from 'react';

/**
 * Buttonize function for eslint jsx-a11y/click-events-have-key-events accesibility issues.
 * @param handlerFn handler function when event occurs
 * @returns parameters for buttonize
 */
export function allyButtonizer(handlerFn: (e: any) => void) {
  return {
    role: 'button',
    onClick: handlerFn,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'enter') handlerFn(event);
    },
  };
}
