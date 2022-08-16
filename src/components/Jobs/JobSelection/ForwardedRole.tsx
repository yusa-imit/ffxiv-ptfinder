import { forwardRef } from 'react';
import RoleIcon, { RoleIconProps } from '../Icon/RoleIcon';

const ForwaredRole = forwardRef<HTMLButtonElement, RoleIconProps>(
  ({ ...etc }: RoleIconProps, ref) => <RoleIcon {...etc} ref={ref} />
);

export default ForwaredRole;
