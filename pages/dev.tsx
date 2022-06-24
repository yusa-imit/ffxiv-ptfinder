import AppHeader from '../src/components/base/AppHeader/AppHeader';
import DEV_TOP_ICON from '../src/components/icons/DEV_TOP_ICON';

export default function dev() {
  return <AppHeader Logo={<DEV_TOP_ICON />} title="DEV_APP_TITLE" buttonText="DEV_BUTTON_TEXT" />;
}
