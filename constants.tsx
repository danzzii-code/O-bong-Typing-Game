import React from 'react';
import type { PracticeMode } from './types';
// Fix: Added imports for illustrations used in TUTORIAL_STEPS.
import { ClipboardCopyIcon, LanguageIcon, BookOpenIcon, MouseClickIllustration, KeyboardIllustration, IDPasswordIllustration, EmailIllustration, ThumbsUpIcon } from './components/Icons';

export const PRACTICE_MODES: PracticeMode[] = [
  {
    id: 'position',
    label: '자리 연습',
    icon: <ClipboardCopyIcon />,
    description: '키보드 글자 자리를 익혀요.',
  },
  {
    id: 'word',
    label: '단어 연습',
    icon: <BookOpenIcon />,
    description: '쉬운 단어를 따라쳐요.',
  },
  {
    id: 'sentence',
    label: '문장 연습',
    icon: <LanguageIcon />,
    description: '재미있는 문장을 따라쳐요.',
  },
];

export const FINGER_MAP: { [key: string]: { finger: string, color: string } } = {
    // Left hand
    'q': { finger: '왼손 새끼', color: 'bg-red-300' }, 'ㅂ': { finger: '왼손 새끼', color: 'bg-red-300' },'ㅃ': { finger: '왼손 새끼', color: 'bg-red-300' },
    'a': { finger: '왼손 새끼', color: 'bg-red-300' }, 'ㅁ': { finger: '왼손 새끼', color: 'bg-red-300' },
    'z': { finger: '왼손 새끼', color: 'bg-red-300' }, 'ㅋ': { finger: '왼손 새끼', color: 'bg-red-300' },
    'w': { finger: '왼손 약지', color: 'bg-orange-300' }, 'ㅈ': { finger: '왼손 약지', color: 'bg-orange-300' }, 'ㅉ': { finger: '왼손 약지', color: 'bg-orange-300' },
    's': { finger: '왼손 약지', color: 'bg-orange-300' }, 'ㄴ': { finger: '왼손 약지', color: 'bg-orange-300' },
    'x': { finger: '왼손 약지', color: 'bg-orange-300' }, 'ㅌ': { finger: '왼손 약지', color: 'bg-orange-300' },
    'e': { finger: '왼손 중지', color: 'bg-yellow-300' }, 'ㄷ': { finger: '왼손 중지', color: 'bg-yellow-300' }, 'ㄸ': { finger: '왼손 중지', color: 'bg-yellow-300' },
    'd': { finger: '왼손 중지', color: 'bg-yellow-300' }, 'ㅇ': { finger: '왼손 중지', color: 'bg-yellow-300' },
    'c': { finger: '왼손 중지', color: 'bg-yellow-300' }, 'ㅊ': { finger: '왼손 중지', color: 'bg-yellow-300' },
    'r': { finger: '왼손 검지', color: 'bg-green-300' }, 'ㄱ': { finger: '왼손 검지', color: 'bg-green-300' }, 'ㄲ': { finger: '왼손 검지', color: 'bg-green-300' },
    'f': { finger: '왼손 검지', color: 'bg-green-300' }, 'ㄹ': { finger: '왼손 검지', color: 'bg-green-300' },
    'v': { finger: '왼손 검지', color: 'bg-green-300' }, 'ㅍ': { finger: '왼손 검지', color: 'bg-green-300' },
    't': { finger: '왼손 검지', color: 'bg-green-300' }, 'ㅅ': { finger: '왼손 검지', color: 'bg-green-300' }, 'ㅆ': { finger: '왼손 검지', color: 'bg-green-300' },
    'g': { finger: '왼손 검지', color: 'bg-green-300' }, 'ㅎ': { finger: '왼손 검지', color: 'bg-green-300' },
    'b': { finger: '왼손 검지', color: 'bg-green-300' }, 'ㅠ': { finger: '왼손 검지', color: 'bg-green-300' },
    // Right hand
    'y': { finger: '오른손 검지', color: 'bg-blue-300' }, 'ㅛ': { finger: '오른손 검지', color: 'bg-blue-300' },
    'h': { finger: '오른손 검지', color: 'bg-blue-300' }, 'ㅗ': { finger: '오른손 검지', color: 'bg-blue-300' },
    'n': { finger: '오른손 검지', color: 'bg-blue-300' }, 'ㅜ': { finger: '오른손 검지', color: 'bg-blue-300' },
    'u': { finger: '오른손 검지', color: 'bg-blue-300' }, 'ㅕ': { finger: '오른손 검지', color: 'bg-blue-300' },
    'j': { finger: '오른손 검지', color: 'bg-blue-300' }, 'ㅓ': { finger: '오른손 검지', color: 'bg-blue-300' },
    'm': { finger: '오른손 검지', color: 'bg-blue-300' }, 'ㅡ': { finger: '오른손 검지', color: 'bg-blue-300' },
    'i': { finger: '오른손 중지', color: 'bg-indigo-300' }, 'ㅑ': { finger: '오른손 중지', color: 'bg-indigo-300' },
    'k': { finger: '오른손 중지', color: 'bg-indigo-300' }, 'ㅏ': { finger: '오른손 중지', color: 'bg-indigo-300' },
    ',': { finger: '오른손 중지', color: 'bg-indigo-300' },
    'o': { finger: '오른손 약지', color: 'bg-purple-300' }, 'ㅐ': { finger: '오른손 약지', color: 'bg-purple-300' }, 'ㅒ': { finger: '오른손 약지', color: 'bg-purple-300' },
    'l': { finger: '오른손 약지', color: 'bg-purple-300' }, 'ㅣ': { finger: '오른손 약지', color: 'bg-purple-300' },
    '.': { finger: '오른손 약지', color: 'bg-purple-300' },
    'p': { finger: '오른손 새끼', color: 'bg-pink-300' }, 'ㅔ': { finger: '오른손 새끼', color: 'bg-pink-300' }, 'ㅖ': { finger: '오른손 새끼', color: 'bg-pink-300' },
    ';': { finger: '오른손 새끼', color: 'bg-pink-300' },
    '/': { finger: '오른손 새끼', color: 'bg-pink-300' },
    '[': { finger: '오른손 새끼', color: 'bg-pink-300' },
    '\'': { finger: '오른손 새끼', color: 'bg-pink-300' },
    ']': { finger: '오른손 새끼', color: 'bg-pink-300' },
};

export const KEYBOARD_LAYOUT = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ', '[', ']', '\\'],
    ['CapsLock', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', ';', '\'', 'Enter'],
    ['Shift', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
];

export const SHIFT_KEYBOARD_LAYOUT = [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ', '{', '}', '|'],
    ['CapsLock', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', ':', '"', 'Enter'],
    ['Shift', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '<', '>', '?', 'Shift'],
    ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
];

export const POSITION_PRACTICE_SETS: { [key: string]: string } = {
  '기본 자리': 'ㅁㄴㅇㄹㅓㅏㅣ',
  '윗줄': 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ',
  '아랫줄': 'ㅋㅌㅊㅍㅠㅜㅡ',
  '모든 글자': 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅓㅏㅣㅎㅗㅋㅌㅊㅍㅠㅜㅡ',
};

export const HANGUL_TO_ENGLISH_KEY_MAP: { [key: string]: string } = {
  // top row
  'ㅂ': 'q', 'ㅈ': 'w', 'ㄷ': 'e', 'ㄱ': 'r', 'ㅅ': 't', 'ㅛ': 'y', 'ㅕ': 'u', 'ㅑ': 'i', 'ㅐ': 'o', 'ㅔ': 'p',
  // home row
  'ㅁ': 'a', 'ㄴ': 's', 'ㅇ': 'd', 'ㄹ': 'f', 'ㅎ': 'g', 'ㅗ': 'h', 'ㅓ': 'j', 'ㅏ': 'k', 'ㅣ': 'l',
  // bottom row
  'ㅋ': 'z', 'ㅌ': 'x', 'ㅊ': 'c', 'ㅍ': 'v', 'ㅠ': 'b', 'ㅜ': 'n', 'ㅡ': 'm',
};

export const WORD_PRACTICE_SET: string[] = [
  '하늘', '바다', '구름', '나무', '햇님', '달님', '별님',
  '학교', '선생님', '친구', '엄마', '아빠', '가족', '사랑',
  '사과', '바나나', '포도', '딸기', '수박',
  '강아지', '고양이', '토끼', '호랑이', '사자',
  '연필', '지우개', '책상', '의자', '공책',
  '봄', '여름', '가을', '겨울',
  '고맙습니다', '미안합니다', '안녕하세요', '사랑해요',
];

export const SENTENCE_PRACTICE_SET: string[] = [
  // 사회 정서 학습 (SEL)
  "오늘도 좋은 하루 보내세요.",
  "친구야, 우리 함께 놀자.",
  "고맙습니다 라고 말해요.",
  "나는 정말 멋진 사람이야.",
  "서로 돕는 마음은 아름다워요.",
  "실수해도 괜찮아, 다시 하면 돼.",
  "너의 이야기를 들어줄게.",
  "함께하면 무엇이든 할 수 있어.",
  "미안해 라고 용기 내어 말해보자.",
  "나의 감정을 솔직하게 표현해요.",
  "다른 사람의 마음을 생각해요.",
  "힘들 땐 도와달라고 말해도 괜찮아.",
  // 나 전달법
  "네가 큰 소리로 말해서 나는 조금 놀랐어.",
  "함께 놀아주지 않아서 나는 속상한 마음이 들어.",
  "네가 도와주니 나는 정말 기분이 좋아.",
  "내 물건을 말없이 가져가서 나는 기분이 안 좋았어.",
  "네가 약속을 잊어서 나는 조금 서운했어.",
  "네가 웃어주니 나도 기분이 좋아져.",
  // 추가 문장
  "새로운 것을 배우는 건 즐거워.",
  "나는 매일 조금씩 성장하고 있어.",
  "친구의 좋은 점을 칭찬해주자.",
  "어려운 일이 생기면 힘을 합치자.",
  "나 자신을 믿고 용기를 내봐.",
  "모르는 것은 부끄러운 게 아니야.",
  "너는 세상에서 가장 소중한 사람이야.",
  "정직하게 말하는 용기를 갖자.",
  "꾸준히 노력하면 무엇이든 될 수 있어.",
  "작은 성공에도 함께 기뻐해주자.",
  "슬픈 마음이 들면 친구에게 말해봐.",
  "네가 내 이야기를 들어줘서 정말 고마워.",
  "조용히 말해주면 내가 더 잘 들을 수 있을 것 같아.",
  "네가 나를 응원해주니 힘이 나.",
  "설명을 해주지 않아서 나는 어떻게 할지 몰랐어.",
  "네가 먼저 사과해주니 내 마음도 풀렸어.",
];

// Fix: Added missing TUTORIAL_STEPS constant.
export const TUTORIAL_STEPS = [
  {
    title: '환영합니다!',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">컴퓨터와 친해지기!</h3>
        <p className="mb-4">
          이 튜토리얼을 통해 컴퓨터 사용의 기본을 쉽고 재미있게 배워볼 거예요.
        </p>
        <p>
          마우스 클릭, 키보드 사용법부터 이메일 주소 입력까지 차근차근 함께해요. 준비됐나요?
        </p>
        <div className="mt-8 text-green-500">
          <ThumbsUpIcon />
        </div>
      </>
    ),
    interactive: false,
  },
  {
    title: '1. 마우스 클릭 연습',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">마우스와 친구 되기</h3>
        <p className="mb-4">
          마우스는 컴퓨터에게 명령을 내리는 손과 같아요. 화면의 화살표(커서)를 움직여 원하는 것을 '클릭'할 수 있어요.
        </p>
        <p>
          아래 파란색 버튼 위로 마우스 커서를 가져가서 왼쪽 버튼을 한 번 "딸깍" 눌러보세요.
        </p>
        <div className="mt-8">
            <MouseClickIllustration />
        </div>
      </>
    ),
    interactive: true,
  },
  {
    title: '2. 키보드와 첫 만남',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">글자를 입력하는 도구, 키보드</h3>
        <p className="mb-4">
          키보드는 컴퓨터에 글자나 숫자를 입력할 때 사용해요. 수많은 버튼(키)들이 있죠?
        </p>
        <p>
          각 키에는 저마다 역할이 있답니다. 이제 가장 중요한 키 몇 가지를 배워볼까요?
        </p>
        <div className="mt-8">
          <KeyboardIllustration />
        </div>
      </>
    ),
    interactive: false,
  },
  {
    title: '3. 스페이스 바 (띄어쓰기)',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">단어 사이를 띄어줘요</h3>
        <p className="mb-4">
          키보드 가장 아래쪽에 있는 길~~~다란 키가 바로 '스페이스 바'예요.
        </p>
        <p>
          단어와 단어 사이를 띄어 쓸 때 사용해요. 아래 키보드 그림에서 빛나는 키를 눌러보세요!
        </p>
      </>
    ),
    interactive: true,
  },
  {
    title: '4. 엔터 키 (줄 바꾸기)',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">다음 줄로 넘어가기!</h3>
        <p className="mb-4">
          'Enter'라고 쓰인 키는 보통 글쓰기를 마쳤거나, 명령을 내릴 때 사용해요.
        </p>
        <p>
           줄을 바꿀 때도 사용한답니다. 아래 키보드 그림에서 빛나는 키를 눌러보세요!
        </p>
      </>
    ),
    interactive: true,
  },
  {
    title: '5. 아이디와 비밀번호',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">나를 증명하는 열쇠</h3>
        <p className="mb-4">
          인터넷 세상에서는 '아이디'와 '비밀번호'로 내가 누구인지 알려줘요.
        </p>
        <p>
          아이디는 나의 이름, 비밀번호는 나만 아는 암호와 같아요. 다른 사람에게 절대 알려주면 안 돼요!
        </p>
        <div className="mt-8">
          <IDPasswordIllustration />
        </div>
      </>
    ),
    interactive: false,
  },
  {
    title: '6. 이메일 주소의 @',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">'골뱅이'라고 불리는 기호</h3>
        <p className="mb-4">
          이메일 주소에는 항상 '@' 기호가 들어가요. 'at'이라고 읽고, '어디에 있는'이라는 뜻이에요.
        </p>
        <p>
          이 기호는 <span className="font-bold text-pink-500">Shift</span> 키를 누른 상태에서 숫자 <span className="font-bold text-pink-500">2</span>를 눌러 입력할 수 있어요.
        </p>
        <div className="mt-8">
          <EmailIllustration />
        </div>
      </>
    ),
    interactive: false,
  },
  {
    title: '7. 이메일 주소 입력 연습',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">직접 입력해봐요!</h3>
        <p className="mb-4">
          이제 배운 것을 활용해서 아래 보이는 이메일 주소를 똑같이 입력해보세요.
        </p>
        <p>
          'Shift' 키를 이용해 '@'를 입력하는 것을 잊지 마세요!
        </p>
      </>
    ),
    interactive: true,
  },
  {
    title: '8. 복사하기와 붙여넣기',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">마법 같은 복사 & 붙여넣기</h3>
        <p className="mb-4">
          '복사하기' (Ctrl + C)와 '붙여넣기' (Ctrl + V)는 컴퓨터를 정말 편리하게 만들어줘요.
        </p>
        <p>
          왼쪽 상자의 글자를 마우스로 선택하고 <span className="font-bold">Ctrl + C</span>를 눌러 복사한 뒤, 오른쪽 상자에 <span className="font-bold">Ctrl + V</span>를 눌러 붙여넣어 보세요.
        </p>
      </>
    ),
    interactive: true,
  },
  {
    title: '참 잘했어요!',
    content: (
       <>
        <h3 className="text-2xl font-bold mb-4">기본기 완전 정복!</h3>
        <p className="mb-4">
          이제 컴퓨터 사용의 가장 중요한 기본을 모두 배웠어요. 정말 대단해요!
        </p>
        <p>
          왼쪽 메뉴에서 '자리 연습', '단어 연습', '문장 연습'을 통해 타자 실력을 쑥쑥 키워보세요.
        </p>
        <div className="mt-8 text-green-500">
            <ThumbsUpIcon />
        </div>
      </>
    ),
    interactive: false,
  },
];
