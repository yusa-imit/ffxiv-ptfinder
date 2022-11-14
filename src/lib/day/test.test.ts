import dayjs from './idx';

test('dayjs function', () => {
  expect(dayjs.tz.guess()).toBe('Asia/Seoul');
  const seoul = dayjs.unix(1668422314);
  console.log(seoul);
  console.log(seoul.format());
  console.log(seoul.utcOffset() / 60);
  console.log(seoul.tz('Asia/Taipei').format());
});
