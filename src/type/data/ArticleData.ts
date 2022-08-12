import { FixedLengthArray } from '../structure/FixedLengthArray';
import { DungeonType, Game, Job, Region, Language } from './FFXIVInfo';
import { Timezone } from './Timezone';

export interface ArticleData {
  userId: string;
  title: string;
  description: string;
  dungeon: Dungeon;
  isTemporary: boolean;
  scheduleWrittenInDescription: boolean;
  schedule?: Schedule;
  job: Array<Job>;
  region: Region;
  specification: Specification;
  language: Language;
  answerType: 0 | 1 | 2 | 3; // 0 : 직접 연락 1: 시스템으로부터 연락을 받음 2: 코멘트 3: 사이트 채팅 기능 이용
  answerAddress?: string;
}

interface Dungeon {
  game: Game;
  type: DungeonType;
}

/**
 * @interface Schedule
 * 아티클의 스케쥴 지정
 * @param wholeWrittenInDescription 모든 스케줄을 어플리케이션에서 정해준 타입에 따라 입력할 것인지 (false), 아니면 직접 description에 입력할 것인지(true)
 * @param dateTime unix timestamp - 이 기사가 임시/대타 모집인 경우, dateTime으로 시간/날짜를 특정함.
 * @param adjustable 스케줄을 협상 가능한지 여부
 * @param day 활동일 배열. 길이 7이 강제되는 Array. 0일 경우 활동일 아님, 1일경우 활동일.
 * @param timeType 활동시간 배열의 타입 time 참고
 * @param time 활동 시간 배열. 기본적인 구조는 day 데이터와 같음
 * timeType 선택에 따라 일주일 전체 적용/평일*주말/일주일 각각 을 선택가능함
 * 0일 경우 : 현재 활동 시간을 활동일 전체에 적용
 * 1일 경우 : 현재 선택된 활동 시간을 첫번째 배열은 평일에, 두번째 배열은 주말에 적용
 * 2일 경우 : 월화수목금토일 각각 활동시간을 직접 작성
 * @param timezone 작성자의 timezone
 */
interface Schedule {
  wholeWrittenInDescription: boolean;
  dateTime?: number;
  adjustable?: boolean;
  day?: FixedLengthArray<0 | 1, 7>;
  timeType?: 0 | 1 | 2;
  time?:
    | FixedLengthArray<0 | 1, 24>
    | FixedLengthArray<FixedLengthArray<0 | 1, 24>, 2>
    | FixedLengthArray<FixedLengthArray<0 | 1, 24>, 7>;
  timezone?: Timezone;
}

/**
 * @interface Specification
 * 태그를 통해 편한 Search를 제공하기 위한 article specification.
 * @param many 모집 인원
 * @param jobs 모집중인 직업
 * @param minimumWeek 최소 공대 유지 기간
 * @param firstWeekClear 첫 주 공략 목적
 * @param worldFirstRace 세계 1st 레이스 목적
 * @param voiceChat 0 : 보이스챗 필수, 1: 보이스 챗 사용, 듣톡 가능 2: 보이스챗 사용 안함
 * @param specifyUserRegion (optional) 유저의 data-center를 제한함. (data-center travel이 가능하게 되었으므로 optional로 변경)
 * @param specifyUserLanguage @important (optioanl) 유저의 언어를 제한함. 유저는 이 언어를 필수로 사용 가능해야 함을 나타냄.
 */
interface Specification {
  many: number;
  jobs: FixedLengthArray<Array<Job>, number>;
  minimumWeek: number;
  firstWeekClear: boolean;
  worldFirstRace: boolean;
  voiceChat: 0 | 1 | 2;
  specifyUserRegion?: Region;
  specifyUserLanguage?: Language;
}
