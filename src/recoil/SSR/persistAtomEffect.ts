import { AtomEffect } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { SSRCompleted } from './SSRCompleted';

const { persistAtom } = recoilPersist();

/**
 * @function pesistAtomEffect
 * @description Verifies wether SSR process is done or not. And get persisted atom.
 * @usage (in atom function) effect_UNSTABLE : [persistAtomEffect]
 * @param param Atom Parameter (does not need to be modified)
 *
 * @link https://stackoverflow.com/questions/68110629/nextjs-react-recoil-persist-values-in-local-storage-initial-page-load-in-wrong/70459889#70459889
 */
export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(SSRCompleted).then(() => persistAtom(param));
};
