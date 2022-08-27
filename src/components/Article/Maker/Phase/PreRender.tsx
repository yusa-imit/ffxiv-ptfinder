import BigContainer from '@components/base/BigContainer';
import { PhaseStyles } from './Phase.styles';

export function PreRender() {
  const { classes } = PhaseStyles();
  return (
    <BigContainer
      style={{ height: 0 }}
      className={classes.inner}
      //style={{ position: current !== 0 ? 'absolute' : 'relative' }}
    />
  );
}
