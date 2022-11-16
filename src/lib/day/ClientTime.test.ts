import ClientTime, { dayjs } from './ClientTime';

describe('Client Time Tests', () => {
  test('Default Force Timezone Test', () => {
    expect(ClientTime.getTimezone()).toBe(dayjs.tz.guess());
  });
  test('Set Force Timezone Test', () => {
    expect(
      (() => {
        ClientTime.setForceTimezone('Asia/Tokyo');
        return ClientTime.getTimezone();
      })()
    ).toBe('Asia/Tokyo');
  });
});
