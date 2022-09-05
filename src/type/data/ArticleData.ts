import { FixedLengthArray } from '../structure/FixedLengthArray';
import { DungeonType, Game, Job, Region, Language } from './FFXIVInfo';
import { Timezone } from './Timezone';
/**
 * @interface ArticleData 기사 데이터
 * @param articleType article의 타입 -  0 : 구인, 1: 구직
 * @param status article의 상태 - 0 : 모집 중, 1: 모집완료, 2: 미노출
 * @param userId article 작성한 유저 id (캐릭터 or 계정?)
 * @param title 제목
 * @param description 상세 (inner html document)
 * @param isTemporary 대타/임시 멤버 모집일 경우 true
 * @param schedule 스케쥴 오브젝트
 * @param content 콘텐츠
 * @param type 파판 던전 타입
 * @param jobs 모집중인 직업
 * @param additional - 추가 색인 목적 변수
 * @param additioanl.minimumWeek 최소 공대 유지 기간
 * @param additional.firstWeekClear 첫 주 공략 목적
 * @param additional.worldFirstRace 세계 1st 레이스 목적
 * @param additional.boxNumber 상자 갯수
 * @param additional.farm 파밍인지 아닌지
 * @param voiceChat // 0: 안함, 1: 듣톡 가능, 2: 필수
 * @param region 파판 데이터센터 'JP', 'NA', 'EU', 'OA', 'CN', 'KR'
 * @param language[] 쓰여진 언어(클라이언트)  'JP', 'EN', 'KR', 'CN', 'FR', 'DE'
 * @param specifyUserLanguage @important (optional) 모집할 유저의 언어를 제한함. 유저는 이 언어를 필수로 사용 가능해야 함을 나타냄.
 * @param answerType 0 : 직접 연락, 1: 코멘트, (?2: 시스템으로 연락을 받음?)
 * @param answerAddress (optional) answerType이 2(시스템으로 연락을 받음) 일 경우 연락받을 mail address
 */

export interface ArticleData {
  author: {
    name: string;
    image?: string;
  };
  articleType: number;
  status: number;
  userId: string;
  title: string;
  description: string;
  isTemporary: boolean;
  schedule: Schedule;
  content: number;
  type: DungeonType;
  jobs: Job[][][]; // [[],[]]
  // [
  //   [ [], [], [] ],
  //   [ [], [], [], [], [] ],
  //   [ [], [], [] ]
  // ]
  minimumWeek: number;
  voiceChat: 0 | 1 | 2;
  additional: {
    heading?: boolean;
    firstTime?: boolean;
    firstWeekClear?: boolean;
    worldFirstRace?: boolean;
    farm?: boolean;
    boxNumber?: 0 | 1 | 2;
  };
  region: Region;
  language: Language;
  specifyUserLanguage?: Language[];
  answerType: 0 | 1 | 2;
  answerAddress?: string;
}

/**
 * @interface Schedule
 * 아티클의 스케쥴 지정
 * @param writtenInDescription 모든 스케줄을 어플리케이션에서 정해준 타입에 따라 입력할 것인지 (false), 아니면 직접 description에 입력할 것인지(true)
 * @param dateTime unix timestamp - 이 기사가 임시/대타 모집인 경우, dateTime으로 시간/날짜를 특정함.
 * @param adjustable 스케줄을 협상 가능한지 여부
 * @type FixedLengthArray - 고정된 길이의 Array를 뜻함, FixedLengthArray<자료형, 배열 길이>
 * @param day 활동일 배열. 길이 7이 강제되는 FixedLengthArray<0|1, 7>. 0일 경우 활동일 아님, 1일경우 활동일.
 * @param timeType 활동시간 배열의 타입 time 참고
 * @param time 활동 시간 배열. 기본적인 구조는 day 데이터와 같음
 * timeType 선택에 따라 일주일 전체 적용/평일*주말/일주일 각각 을 선택가능함
 * 0일 경우 : 시작시간, 지속시간을 배열로 받음.
 * 1일 경우 : 현재 선택된 활동 시간을 첫번째 배열은 평일에, 두번째 배열은 주말에 적용. 자료형 : FixedLengthArray<FixedLengthArray<0 | 1, 24>, 2>
 * 2일 경우 : 월화수목금토일 각각 활동시간을 직접 작성. 자료형 : FixedLengthArray<FixedLengthArray<0 | 1, 24>, 7>
 * @param timezone 작성자의 timezone ex) Korean Standard Time, Japan Standard Time
 */
export interface Schedule {
  writtenInDescription: boolean;
  dateTime?: FixedLengthArray<number, 2>;
  adjustable?: boolean;
  day?: Array<0 | 1>;
  dayPerWeek?: number;
  timeType?: 0 | 1 | 2;
  time?: string[][];
  timezone?: Timezone;
  average?: number;
}
