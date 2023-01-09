/**
 * 1000 -> custom
 * 2000> ffxiv instance raid/extreme/ultimate result
 *
 * (1)(2)(3)(4)
 *  2  2  1  2
 *
 * (1) game version number
 * (2) game patch number
 * (3) instanced dungeon type (0: raid, 1: extreme, 2: alliance, 3: ultimate )
 * (4) sort by number (raid values can be 0 to 4, others are default 0 and increase)
 */

import { DBInstance } from '@type/data/DBInstance';
import { DungeonType } from '../../type/data/FFXIVInfo';

const Type: Record<DungeonType, DungeonType> = {
  raid: 'raid' as const,
  alliance: 'alliance' as const,
  ultimate: 'ultimate' as const,
  extreme: 'extreme' as const,
  etc: 'etc' as const,
};

export const DEV_DUNGEON_DATA: Record<number, DBInstance> = {
  // version 2.0

  // raid 2.0
  2000: {
    type: Type.raid,
    code: 2000,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 해후편',
      en: 'The Binding Coil of Bahamut',
      jp: '大迷宮バハムート : 邂逅編',
    },
  },
  2001: {
    type: Type.raid,
    code: 2001,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 해후편 1',
      en: 'The Binding Coil of Bahamut - Turn 1',
      jp: '大迷宮バハムート : 邂逅編1',
    },
  },
  2002: {
    type: Type.raid,
    code: 2002,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 해후편 2',
      en: 'The Binding Coil of Bahamut - Turn 2',
      jp: '大迷宮バハムート : 邂逅編2',
    },
  },
  2003: {
    type: Type.raid,
    code: 2003,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 해후편 3',
      en: 'The Binding Coil of Bahamut - Turn 3',
      jp: '大迷宮バハムート : 邂逅編3',
    },
  },
  2004: {
    type: Type.raid,
    code: 2004,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 해후편 4',
      en: 'The Binding Coil of Bahamut - Turn 4',
      jp: '大迷宮バハムート : 邂逅編4',
    },
  },
  2005: {
    type: Type.raid,
    code: 2005,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 해후편 5',
      en: 'The Binding Coil of Bahamut - Turn 5',
      jp: '大迷宮バハムート : 邂逅編5',
    },
  },
  // alliance 2.1
  2120: {
    type: Type.alliance,
    code: 2120,
    partyNumber: 24,
    title: {
      kr: '크리스탈 타워: 고대인의 미궁',
      en: 'The Labyrinth of the Ancients',
      jp: 'クリスタルタワー:古代の民の迷宮',
    },
  },
  // extreme 2.1
  2110: {
    type: Type.extreme,
    code: 2110,
    partyNumber: 8,
    title: {
      kr: '알테마 웨폰 파괴작전',
      en: '究極幻想 アルテマウェポン破壊作戦',
      jp: "The Minstrel's Ballad: Ultima's Bane",
    },
  },
  2111: {
    type: Type.extreme,
    code: 2111,
    partyNumber: 8,
    title: {
      kr: '극 가루다 토벌전',
      en: '極ガルーダ討滅戦',
      jp: 'The Howling Eye (Extreme)',
    },
  },
  2112: {
    type: Type.extreme,
    code: 2112,
    partyNumber: 8,
    title: {
      kr: '극 이프리트 토벌전',
      en: '極イフリート討滅戦',
      jp: 'The Bowl of Embers (Extreme)',
    },
  },
  2113: {
    type: Type.extreme,
    code: 2113,
    partyNumber: 8,
    title: {
      kr: '극 타이탄 토벌전',
      en: '極タイタン討滅戦',
      jp: 'The Navel (Extreme)',
    },
  },
  // raid 2.2
  2200: {
    type: Type.raid,
    code: 2200,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 침공편',
      en: 'The Second Coil of Bahamut',
      jp: '大迷宮バハムート:侵攻編',
    },
  },
  2201: {
    type: Type.raid,
    code: 2201,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 침공편 1',
      en: 'The Second Coil of Bahamut - Turn 1',
      jp: '大迷宮バハムート:侵攻編1',
    },
  },
  2202: {
    type: Type.raid,
    code: 2202,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 침공편 2',
      en: 'The Second Coil of Bahamut - Turn 2',
      jp: '大迷宮バハムート:侵攻編1',
    },
  },
  2203: {
    type: Type.raid,
    code: 2203,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 침공편 3',
      en: 'The Second Coil of Bahamut - Turn 3',
      jp: '大迷宮バハムート:侵攻編1',
    },
  },
  2204: {
    type: Type.raid,
    code: 2204,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트 : 침공편 4',
      en: 'The Second Coil of Bahamut - Turn 4',
      jp: '大迷宮バハムート:侵攻編1',
    },
  },
  // extreme 2.2
  2210: {
    type: Type.extreme,
    code: 2210,
    partyNumber: 8,
    title: {
      kr: '극왕 모그루 모그 XII세 토벌전',
      en: 'Thornmarch (Extreme)',
      jp: '極王モグル・モグXII世討滅戦',
    },
  },
  2211: {
    type: Type.extreme,
    code: 2211,
    partyNumber: 8,
    title: {
      kr: '극 리바이어선 토벌전',
      en: 'The Whorleater (Extreme)',
      jp: '極リヴァイアサン討滅戦',
    },
  },
  // alliance 2.3
  2320: {
    type: Type.alliance,
    code: 2320,
    partyNumber: 24,
    title: {
      kr: '크리스탈 타워: 시르쿠스 탑',
      en: 'Syrcus Tower',
      jp: 'クリスタルタワー:シルクスの塔',
    },
  },
  // extreme 2.3
  2310: {
    type: Type.extreme,
    code: 2310,
    partyNumber: 8,
    title: {
      kr: '극 라무 토벌전',
      en: 'The Striking Tree (Extreme)',
      jp: '極ラムウ討滅戦',
    },
  },
  // raid 2.4
  2400: {
    type: Type.raid,
    code: 2204,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트: 진성편',
      en: 'The Final Coil of Bahamut',
      jp: '大迷宮バハムート:真成編',
    },
  },
  2401: {
    type: Type.raid,
    code: 2401,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트: 진성편 1',
      en: 'The Final Coil of Bahamut - Turn 1',
      jp: '大迷宮バハムート:真成編1',
    },
  },
  2402: {
    type: Type.raid,
    code: 2402,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트: 진성편 2',
      en: 'The Final Coil of Bahamut - Turn 2',
      jp: '大迷宮バハムート:真成編2',
    },
  },
  2403: {
    type: Type.raid,
    code: 2403,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트: 진성편 3',
      en: 'The Final Coil of Bahamut - Turn 3',
      jp: '大迷宮バハムート:真成編3',
    },
  },
  2404: {
    type: Type.raid,
    code: 2404,
    partyNumber: 8,
    title: {
      kr: '대미궁 바하무트: 진성편 4',
      en: 'The Final Coil of Bahamut - Turn 4',
      jp: '大迷宮バハムート:真成編4',
    },
  },
  // extreme 2.4
  2410: {
    type: Type.extreme,
    code: 2410,
    partyNumber: 8,
    title: {
      kr: '극 시바 토벌전',
      en: 'Akh Afah Amphitheatre (Extreme)',
      jp: '極シヴァ討滅戦',
    },
  },
  // extreme 2.5
  2510: {
    type: Type.extreme,
    code: 2211,
    partyNumber: 8,
    title: {
      kr: '투신 오딘 토벌전',
      en: "Urth's Fount",
      jp: '闘神オーディン討滅戦',
    },
  },
  // alliance 2.5
  2520: {
    type: Type.alliance,
    code: 2520,
    partyNumber: 24,
    title: {
      kr: '크리스탈 타워: 어둠의 세계',
      en: 'The World of Darkness',
      jp: 'クリスタルタワー:闇の世界',
    },
  },
  // version 3.0

  // raid 3.0
  3000: {
    type: Type.raid,
    code: 3000,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 기동편',
      en: 'Alexander - Gordias',
      jp: '機工城アレキサンダー:起動編',
    },
  },
  3001: {
    type: Type.raid,
    code: 3001,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 기동편 1',
      en: 'Alexander - The Fist of the Father',
      jp: '機工城アレキサンダー:起動編1',
    },
  },
  3002: {
    type: Type.raid,
    code: 3002,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 기동편 2',
      en: 'Alexander - The Cuff of the Father',
      jp: '機工城アレキサンダー:起動編2',
    },
  },
  3003: {
    type: Type.raid,
    code: 3003,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 기동편 3',
      en: 'Alexander - The Arm of the Father',
      jp: '機工城アレキサンダー:起動編3',
    },
  },
  3004: {
    type: Type.raid,
    code: 3004,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 기동편 4',
      en: 'Alexander - The Burden of the Father',
      jp: '機工城アレキサンダー:起動編4',
    },
  },
  // extreme 3.0
  3010: {
    type: Type.extreme,
    code: 3010,
    partyNumber: 8,
    title: {
      kr: '극 비스마르크 토벌전',
      en: 'The Limitless Blue (Extreme)',
      jp: '極ビスマルク討滅戦',
    },
  },
  3011: {
    type: Type.extreme,
    code: 3011,
    partyNumber: 8,
    title: {
      kr: '극 라바나 토벌전',
      en: 'Thok ast Thok (Extreme)',
      jp: '極ラーヴァナ討滅戦',
    },
  },
  // alliance 3.1
  3120: {
    type: Type.alliance,
    code: 3120,
    partyNumber: 24,
    title: {
      kr: '보이드의 방주',
      en: 'The Void Ark',
      jp: '魔航船ヴォイドアーク',
    },
  },
  // extreme 3.1
  3110: {
    type: Type.extreme,
    code: 3110,
    partyNumber: 8,
    title: {
      kr: '극 나이츠 오브 라운드 토벌전',
      en: "The Minstrel's Ballad: Thordan's Reign",
      jp: '蒼天幻想 ナイツ・オブ・ラウンド討滅戦',
    },
  },
  // raid 3.2
  3200: {
    type: Type.raid,
    code: 3200,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 율동편',
      en: 'Alexander - Midas',
      jp: '機工城アレキサンダー:律動編',
    },
  },
  3201: {
    type: Type.raid,
    code: 3201,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 율동편 1',
      en: 'Alexander - The Fist of the Son',
      jp: '機工城アレキサンダー:律動編1',
    },
  },
  3202: {
    type: Type.raid,
    code: 3202,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 율동편 2',
      en: 'Alexander - The Cuff of the Son',
      jp: '機工城アレキサンダー:律動編2',
    },
  },
  3203: {
    type: Type.raid,
    code: 3203,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 율동편 3',
      en: 'Alexander - The Arm of the Son',
      jp: '機工城アレキサンダー:律動編3',
    },
  },
  3204: {
    type: Type.raid,
    code: 3204,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 율동편 4',
      en: 'Alexander - The Burden of the Son',
      jp: '機工城アレキサンダー:律動編4',
    },
  },
  // extreme 3.2
  3210: {
    type: Type.extreme,
    code: 3210,
    partyNumber: 8,
    title: {
      kr: '극 마신 세피로트 토벌전',
      en: 'Containment Bay S1T7 (Extreme)',
      jp: '極魔神セフィロト討滅戦',
    },
  },
  // alliance 3.3
  3320: {
    type: Type.alliance,
    code: 3320,
    partyNumber: 24,
    title: {
      kr: '금기도시 마하',
      en: 'The Weeping City of Mhach',
      jp: '禁忌都市マハ',
    },
  },
  // extreme 3.3
  3310: {
    type: Type.extreme,
    code: 3310,
    partyNumber: 8,
    title: {
      kr: '극 니드호그 토벌전',
      en: "The Minstrel's Ballad: Nidhogg's Rage",
      jp: '極ニーズヘッグ征竜戦',
    },
  },
  // raid 3.4
  3400: {
    type: Type.raid,
    code: 3400,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 천동편',
      en: 'Alexander - Creator',
      jp: '機工城アレキサンダー:天動編',
    },
  },
  3401: {
    type: Type.raid,
    code: 3401,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 천동편 1',
      en: 'Alexander - The Eyes of the Creator',
      jp: '機工城アレキサンダー:天動編1',
    },
  },
  3402: {
    type: Type.raid,
    code: 3402,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 천동편 2',
      en: 'Alexander - The Breath of the Creator',
      jp: '機工城アレキサンダー:天動編2',
    },
  },
  3403: {
    type: Type.raid,
    code: 3403,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 천동편 3',
      en: 'Alexander - The Heart of the Creator',
      jp: '機工城アレキサンダー:天動編3',
    },
  },
  3404: {
    type: Type.raid,
    code: 3404,
    partyNumber: 8,
    title: {
      kr: '기공성 알렉산더: 천동편 4',
      en: 'Alexander - The Soul of the Creator',
      jp: '機工城アレキサンダー:天動編4',
    },
  },
  // extreme 3.4
  3410: {
    type: Type.extreme,
    code: 3410,
    partyNumber: 8,
    title: {
      kr: '극 여신 소피아 토벌전',
      en: 'Containment Bay P1T6 (Extreme)',
      jp: '極女神ソフィア討滅戦',
    },
  },
  // extreme 3.5
  3510: {
    type: Type.extreme,
    code: 3510,
    partyNumber: 8,
    title: {
      kr: '극 귀신 주르반 토벌전',
      en: 'Containment Bay Z1T9 (Extreme)',
      jp: '極鬼神ズルワーン討滅戦',
    },
  },
  // alliance 3.5
  3520: {
    type: Type.alliance,
    code: 3520,
    partyNumber: 24,
    title: {
      kr: '둔 스카',
      en: 'Dun Scaith',
      jp: '影の国ダン・スカー',
    },
  },
  // version 4.0

  // raid 4.0
  4000: {
    type: Type.raid,
    code: 4000,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 델타편',
      en: 'Deltascape',
      jp: '次元の狭間オメガ:デルタ編',
    },
  },
  4001: {
    type: Type.raid,
    code: 4001,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 델타편 1',
      en: 'Deltascape - V1.0',
      jp: '次元の狭間オメガ:デルタ編1',
    },
  },
  4002: {
    type: Type.raid,
    code: 4002,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 델타편 2',
      en: 'Deltascape - V2.0',
      jp: '次元の狭間オメガ:デルタ編2',
    },
  },
  4003: {
    type: Type.raid,
    code: 4003,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 델타편 3',
      en: 'Deltascape - V3.0',
      jp: '次元の狭間オメガ:デルタ編3',
    },
  },
  4004: {
    type: Type.raid,
    code: 4004,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 델타편 4',
      en: 'Deltascape - V4.0',
      jp: '次元の狭間オメガ:デルタ編4',
    },
  },
  // extreme 4.0
  4010: {
    type: Type.extreme,
    code: 4010,
    partyNumber: 8,
    title: {
      kr: '극 스사노오 토벌전',
      en: 'The Pool of Tribute (Extreme)',
      jp: '極スサノオ討滅戦',
    },
  },
  4011: {
    type: Type.extreme,
    code: 4011,
    partyNumber: 8,
    title: {
      kr: '극 락슈미 토벌전',
      en: 'Emanation (Extreme)',
      jp: '極ラクシュミ討滅戦',
    },
  },
  // alliance 4.1
  4120: {
    type: Type.alliance,
    code: 4120,
    partyNumber: 24,
    title: {
      kr: '왕도 라바나스터',
      en: 'The Royal City of Rabanastre',
      jp: '失われた都 ラバナスタ',
    },
  },
  // extreme 4.1
  4110: {
    type: Type.extreme,
    code: 4110,
    partyNumber: 8,
    title: {
      kr: '극 신룡 토벌전',
      en: "The Minstrel's Ballad: Shinryu's Domain",
      jp: '極神龍討滅戦',
    },
  },
  // ultimate 4.1
  4130: {
    type: Type.ultimate,
    code: 4130,
    partyNumber: 8,
    title: {
      kr: '절 바하무트 토벌전',
      en: 'The Unending Coil of Bahamut (Ultimate)',
      jp: '絶バハムート討滅戦',
    },
  },
  // raid 4.2
  4200: {
    type: Type.raid,
    code: 4200,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 시그마편',
      en: 'Sigmascape',
      jp: '次元の狭間オメガ:シグマ編',
    },
  },
  4201: {
    type: Type.raid,
    code: 4201,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 시그마편 1',
      en: 'Sigmascape - V1.0',
      jp: '次元の狭間オメガ:シグマ編1',
    },
  },
  4202: {
    type: Type.raid,
    code: 4202,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 시그마편 2',
      en: 'Sigmascape - V2.0',
      jp: '次元の狭間オメガ:シグマ編2',
    },
  },
  4203: {
    type: Type.raid,
    code: 4203,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 시그마편 3',
      en: 'Sigmascape - V3.0',
      jp: '次元の狭間オメガ:シグマ編3',
    },
  },
  4204: {
    type: Type.raid,
    code: 4204,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 시그마편 4',
      en: 'Sigmascape - V4.0',
      jp: '次元の狭間オメガ:シグマ編4',
    },
  },
  // extreme 4.2
  4210: {
    type: Type.extreme,
    code: 4210,
    partyNumber: 8,
    title: {
      kr: '극 백호 토벌전',
      en: 'The Jade Stoa (Extreme)',
      jp: '極白虎征魂戦',
    },
  },
  // alliance 4.3
  4320: {
    type: Type.alliance,
    code: 4320,
    partyNumber: 24,
    title: {
      kr: '대등대 리도르아나',
      en: 'The Ridorana Lighthouse',
      jp: '封じられた聖塔 リドルアナ',
    },
  },
  // extreme 4.3
  4310: {
    type: Type.extreme,
    code: 4310,
    partyNumber: 8,
    title: {
      kr: '극 츠쿠요미 토벌전',
      en: "The Minstrel's Ballad: Tsukuyomi's Pain",
      jp: '極ツクヨミ討滅戦',
    },
  },
  4311: {
    type: Type.extreme,
    code: 4311,
    partyNumber: 4,
    title: {
      kr: '극 리오레우스 수렵전',
      en: 'The Great Hunt (Extreme)',
      jp: '極リオレウス狩猟戦',
    },
  },
  // ultimate 4.3
  4330: {
    type: Type.ultimate,
    code: 4330,
    partyNumber: 8,
    title: {
      kr: '절 알테마 웨폰 파괴작전',
      en: "The Weapon's Refrain (Ultimate)",
      jp: '絶アルテマウェポン破壊作戦',
    },
  },
  // raid 4.4
  4400: {
    type: Type.raid,
    code: 4400,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 알파편',
      en: 'Alphascape',
      jp: '次元の狭間オメガ:アルファ編',
    },
  },
  4401: {
    type: Type.raid,
    code: 4401,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 알파편 1',
      en: 'Alphascape - V1.0',
      jp: '次元の狭間オメガ:アルファ編1',
    },
  },
  4402: {
    type: Type.raid,
    code: 4402,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 알파편 2',
      en: 'Alphascape - V2.0',
      jp: '次元の狭間オメガ:アルファ編2',
    },
  },
  4403: {
    type: Type.raid,
    code: 4403,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 알파편 3',
      en: 'Alphascape - V3.0',
      jp: '次元の狭間オメガ:アルファ編3',
    },
  },
  4404: {
    type: Type.raid,
    code: 4404,
    partyNumber: 8,
    title: {
      kr: '차원의 틈 오메가: 알파편 4',
      en: 'Alphascape - V4.0',
      jp: '次元の狭間オメガ:アルファ編4',
    },
  },
  // extreme 4.4
  4410: {
    type: Type.extreme,
    code: 4410,
    partyNumber: 8,
    title: {
      kr: '극 주작 토벌전',
      en: "Hells' Kier (Extreme)",
      jp: '極朱雀征魂戦',
    },
  },
  // extreme 4.5
  4510: {
    type: Type.extreme,
    code: 4510,
    partyNumber: 8,
    title: {
      kr: '극 청룡 토벌전',
      en: 'The Wreath of Snakes (Extreme)',
      jp: '極青龍征魂戦',
    },
  },
  // alliance 4.5
  4520: {
    type: Type.alliance,
    code: 4520,
    partyNumber: 24,
    title: {
      kr: '오본느 수도원',
      en: 'The Orbonne Monastery',
      jp: '楽欲の僧院 オーボンヌ',
    },
  },
  // version 5.0

  // raid 5.0
  5000: {
    type: Type.raid,
    code: 5000,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 각성편',
      en: "Eden's Gate",
      jp: '希望の園エデン:覚醒編',
    },
  },
  5001: {
    type: Type.raid,
    code: 5001,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 각성편 1',
      en: "Eden's Gate: Resurrection",
      jp: '希望の園エデン:覚醒編1',
    },
  },
  5002: {
    type: Type.raid,
    code: 5002,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 각성편 2',
      en: "Eden's Gate: Descent",
      jp: '希望の園エデン:覚醒編2',
    },
  },
  5003: {
    type: Type.raid,
    code: 5003,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 각성편 3',
      en: "Eden's Gate: Inundation",
      jp: '希望の園エデン:覚醒編3',
    },
  },
  5004: {
    type: Type.raid,
    code: 5004,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 각성편 4',
      en: "Eden's Gate: Sepulture",
      jp: '希望の園エデン:覚醒編4',
    },
  },
  // extreme 5.0
  5010: {
    type: Type.extreme,
    code: 5010,
    partyNumber: 8,
    title: {
      kr: '극 티타니아 토벌전',
      en: 'The Dancing Plague (Extreme)',
      jp: '極ティターニア討滅戦',
    },
  },
  5011: {
    type: Type.extreme,
    code: 5011,
    partyNumber: 8,
    title: {
      kr: '극 이노센스 토벌전',
      en: 'The Crown of the Immaculate (Extreme)',
      jp: '極イノセンス討滅戦',
    },
  },
  // alliance 5.1
  5120: {
    type: Type.alliance,
    code: 5120,
    partyNumber: 24,
    title: {
      kr: '복제된 공장 폐허',
      en: 'The Copied Factory',
      jp: '複製サレタ工場廃墟',
    },
  },
  // extreme 5.1
  5110: {
    type: Type.extreme,
    code: 5110,
    partyNumber: 8,
    title: {
      kr: '극 하데스 토벌전',
      en: "The Minstrel's Ballad: Hades's Elegy",
      jp: '極ハーデス討滅戦',
    },
  },
  // ultimate 5.1
  5130: {
    type: Type.ultimate,
    code: 5130,
    partyNumber: 8,
    title: {
      kr: '절 알렉산더 토벌전',
      en: 'The Epic of Alexander (Ultimate)',
      jp: '絶アレキサンダー討滅戦',
    },
  },
  // raid 5.2
  5200: {
    type: Type.raid,
    code: 5200,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 공명편',
      en: "Eden's Verse",
      jp: '希望の園エデン:共鳴編',
    },
  },
  5201: {
    type: Type.raid,
    code: 5201,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 공명편 1',
      en: "Eden's Verse: Fulmination",
      jp: '希望の園エデン:共鳴編1',
    },
  },
  5202: {
    type: Type.raid,
    code: 5202,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 공명편 2',
      en: "Eden's Verse: Furor",
      jp: '希望の園エデン:共鳴編2',
    },
  },
  5203: {
    type: Type.raid,
    code: 5203,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 공명편 3',
      en: "Eden's Verse: Iconoclasm",
      jp: '希望の園エデン:共鳴編3',
    },
  },
  5204: {
    type: Type.raid,
    code: 5204,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 공명편 4',
      en: "Eden's Verse: Refulgence",
      jp: '希望の園エデン:共鳴編4',
    },
  },
  // extreme 5.2
  5210: {
    type: Type.extreme,
    code: 5210,
    partyNumber: 8,
    title: {
      kr: '극 루비 웨폰 토벌전',
      en: 'Cinder Drift (Extreme)',
      jp: '極ルビーウェポン破壊作戦',
    },
  },
  5211: {
    type: Type.extreme,
    code: 5211,
    partyNumber: 8,
    title: {
      kr: '극 보즈야 추억전',
      en: 'Memoria Misera (Extreme)',
      jp: '極シタデル・ボズヤ追憶戦',
    },
  },
  // alliance 5.3
  5320: {
    type: Type.alliance,
    code: 5320,
    partyNumber: 24,
    title: {
      kr: '인형들의 군사 기지',
      en: "The Puppets' Bunker",
      jp: '人形タチノ軍事基地',
    },
  },
  // extreme 5.3
  5310: {
    type: Type.extreme,
    code: 5310,
    partyNumber: 8,
    title: {
      kr: '극 빛의 전사 토벌전',
      en: 'The Seat of Sacrifice (Extreme)',
      jp: '極ウォーリア・オブ・ライト討滅戦',
    },
  },
  5311: {
    type: Type.extreme,
    code: 5311,
    partyNumber: 8,
    title: {
      kr: '환 시바 토벌전',
      en: 'The Akh Afah Amphitheatre (Unreal)',
      jp: '幻シヴァ討滅戦',
    },
  },
  // raid 5.4
  5400: {
    type: Type.raid,
    code: 5200,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 재생편',
      en: "Eden's Promise",
      jp: '希望の園エデン:再生編',
    },
  },
  5401: {
    type: Type.raid,
    code: 5401,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 재생편 1',
      en: "Eden's Promise: Umbra",
      jp: '希望の園エデン:再生編1',
    },
  },
  5402: {
    type: Type.raid,
    code: 5402,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 재생편 2',
      en: "Eden's Promise: Litany",
      jp: '希望の園エデン:再生編2',
    },
  },
  5403: {
    type: Type.raid,
    code: 5403,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 재생편 3',
      en: "Eden's Promise: Anamorphosis",
      jp: '希望の園エデン:再生編3',
    },
  },
  5404: {
    type: Type.raid,
    code: 5404,
    partyNumber: 8,
    title: {
      kr: '희망의 낙원 에덴 : 재생편 4',
      en: "Eden's Promise: Eternity",
      jp: '希望の園エデン:再生編4',
    },
  },
  // extreme 5.4
  5410: {
    type: Type.extreme,
    code: 5410,
    partyNumber: 8,
    title: {
      kr: '극 에메랄드 웨폰 토벌전',
      en: 'Castrum Marinum (Extreme)',
      jp: '極エメラルドウェポン破壊作戦',
    },
  },
  5411: {
    type: Type.extreme,
    code: 5411,
    partyNumber: 8,
    title: {
      kr: '환 타이탄 토벌전',
      en: 'The Navel (Unreal)',
      jp: '幻タイタン討伐戦',
    },
  },
  // extreme 5.5
  5510: {
    type: Type.extreme,
    code: 5510,
    partyNumber: 8,
    title: {
      kr: '극 다이아몬드 웨폰 토벌전',
      en: 'The Cloud Deck (Extreme)',
      jp: '極ダイヤウェポン捕獲作戦',
    },
  },
  5511: {
    type: Type.extreme,
    code: 5511,
    partyNumber: 8,
    title: {
      kr: '환 리바이어선 토벌전',
      en: 'The Whorleater (Unreal)',
      jp: '幻リヴァイアサン討滅戦',
    },
  },
  // alliance 5.5
  5520: {
    type: Type.alliance,
    code: 5520,
    partyNumber: 24,
    title: {
      kr: "희망의 포대: '탑'",
      en: "The Tower at Paradigm's Breach",
      jp: '希望ノ砲台:「塔」',
    },
  },
  // version 6.0

  // raid 6.0
  6000: {
    type: Type.raid,
    code: 6000,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 변옥편',
      en: 'Asphodelos',
      jp: '万魔殿パンデモニウム:辺獄編',
    },
  },
  6001: {
    type: Type.raid,
    code: 6001,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 변옥편 1',
      en: 'Asphodelos: The First Circle',
      jp: '万魔殿パンデモニウム:辺獄編1',
    },
  },
  6002: {
    type: Type.raid,
    code: 6002,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 변옥편 2',
      en: 'Asphodelos: The Second Circle',
      jp: '万魔殿パンデモニウム:辺獄編2',
    },
  },
  6003: {
    type: Type.raid,
    code: 6003,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 변옥편 3',
      en: 'Asphodelos: The Third Circle',
      jp: '万魔殿パンデモニウム:辺獄編3',
    },
  },
  6004: {
    type: Type.raid,
    code: 6004,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 변옥편 4',
      en: 'Asphodelos: The Fourth Circle',
      jp: '万魔殿パンデモニウム:辺獄編4',
    },
  },
  // extreme 6.0
  6010: {
    type: Type.extreme,
    code: 6010,
    partyNumber: 8,
    title: {
      kr: '극 조디악 토벌전',
      en: "The Minstrel's Ballad: Zodiark's Fall",
      jp: '極ゾディアーク討滅戦',
    },
  },
  6011: {
    type: Type.extreme,
    code: 6011,
    partyNumber: 8,
    title: {
      kr: '극 하이델린 토벌전',
      en: "The Minstrel's Ballad: Hydaelyn's Call",
      jp: '極ハイデリン討滅戦',
    },
  },
  // alliance 6.1
  6120: {
    type: Type.alliance,
    code: 6120,
    partyNumber: 24,
    title: {
      kr: '찬란한 신역 아글라이아',
      en: 'Aglaia',
      jp: '輝ける神域 アグライア',
    },
  },
  // extreme 6.1
  6110: {
    type: Type.extreme,
    code: 6110,
    partyNumber: 8,
    title: {
      kr: '극 종언을 노래하는 자 토벌전',
      en: "The Minstrel's Ballad: Endsinger's Aria",
      jp: '極終焉の戦い',
    },
  },
  // ultimate 6.1
  6130: {
    type: Type.ultimate,
    code: 6130,
    partyNumber: 8,
    title: {
      kr: '절 용시전쟁',
      en: "Dragonsong's Reprise (Ultimate)",
      jp: '絶竜詩戦争',
    },
  },
  // raid 6.2
  6200: {
    type: Type.raid,
    code: 6200,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 연옥편',
      en: 'Abyssos',
      jp: '万魔殿パンデモニウム:煉獄編',
    },
  },
  6201: {
    type: Type.raid,
    code: 6201,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 연옥편 1',
      en: 'Abyssos: The Fifth Circle',
      jp: '万魔殿パンデモニウム:煉獄編1',
    },
  },
  6202: {
    type: Type.raid,
    code: 6202,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 연옥편 2',
      en: 'Abyssos: The Sixth Circle',
      jp: '万魔殿パンデモニウム:煉獄編2',
    },
  },
  6203: {
    type: Type.raid,
    code: 6203,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 연옥편 3',
      en: 'Abyssos: The Seventh Circle',
      jp: '万魔殿パンデモニウム:煉獄編3',
    },
  },
  6204: {
    type: Type.raid,
    code: 6204,
    partyNumber: 8,
    title: {
      kr: '마의 전당 판데모니움 : 연옥편 4',
      en: 'Abyssos: The Eighth Circle',
      jp: '万魔殿パンデモニウム:煉獄編4',
    },
  },
  // extreme 6.2
  6210: {
    type: Type.extreme,
    code: 6210,
    partyNumber: 8,
    title: {
      kr: '극 발바리시아 토벌전',
      en: "Storm's Crown (Extreme)",
      jp: 'バルバリシア討滅戦',
    },
  },
  6211: {
    type: Type.extreme,
    code: 6211,
    partyNumber: 8,
    title: {
      kr: '환 세피로트 토벌전',
      en: 'Containment Bay S1T7 (Unreal)',
      jp: '幻魔神セフィロト討滅戦',
    },
  },
  // alliance 6.3
  6320: {
    type: Type.alliance,
    code: 6320,
    partyNumber: 8,
    title: {
      kr: '6.3 얼라이언스 레이드 (미정)',
      en: 'Euphrosyne',
      jp: '喜びの神域 エウプロシュネ',
    },
  },
  // extreme 6.3
  6310: {
    type: Type.extreme,
    code: 6310,
    partyNumber: 8,
    title: {
      kr: '??? 토벌전',
      en: '??? (extreme)',
      jp: '極 ???',
    },
  },
  6311: {
    type: Type.extreme,
    code: 6311,
    partyNumber: 8,
    title: {
      kr: '환 여신 소피아 토벌전',
      en: 'Containment Bay P1T6 (Unreal)',
      jp: '幻女神ソフィア討滅戦',
    },
  },
  // ultimate 6.3
  6330: {
    type: Type.ultimate,
    code: 6330,
    partyNumber: 8,
    title: {
      kr: '절 오메가 검증전',
      en: 'The Omega Protocol (Ultimate)',
      jp: '絶オメガ検証戦',
    },
  },
  // raid 6.4
  // extreme 6.4
  // extreme 6.5
  // alliance 6.5
};
