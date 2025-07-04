좋은 아이디어예요! 단순하면서도 상호작용이 분명하고, 웹으로 만들기에 적합한 MVP 게임입니다. 아래는 이 게임을 위한 초보자용 PRD입니다.

---

## 📝 Product Requirements Document (PRD)

### 1. 📌 Project Overview

**게임 이름(예시):** "초대장 미션"

**목표:**
플레이어가 키보드 방향키로 캐릭터를 움직여, NPC에게 초대장을 전달하고, 모두에게 초대장을 전달하면 파티 화면으로 전환되는 간단한 웹 게임. 마지막에 다짐 문구를 입력받고 결과 화면에 출력.

**배포:** GitHub Pages

---

### 2. 🧩 Core Functionalities

1. **플레이어 캐릭터 이동**

   * 방향키(← ↑ ↓ →)로 이동
   * 화면 범위 내에서만 움직일 수 있음
   * NPC와 충돌했는지 확인

2. **NPC 캐릭터 배치**

   * 고정 위치에 캐릭터 배치: 부모님, 친구, 선생님, 동기 등
   * 각각 1번만 초대 가능

3. **초대장 전달**

   * NPC 근처에서 `Enter` 키 누르면 초대장 전달
   * 초대 성공 시: 캐릭터에 체크 아이콘 또는 색상 변화
   * 축하 메시지 표시

4. **파티 화면 전환**

   * 모든 NPC에게 초대장 전달 시 자동 전환
   * 파티 배경 이미지 + 효과음
   * 다짐 입력창(텍스트박스)

5. **결과 출력**

   * “당신은 롯데캐피탈의 일원이 되었습니다!” 문구
   * 사용자가 입력한 다짐 함께 표시

---

### 3. 📄 Doc (개발 가이드 요약)

* **플레이어 이동 로직:** 방향키 이벤트 → 위치 변경 → 충돌 체크
* **충돌 체크:** 간단한 bounding box로 NPC와 플레이어의 거리 비교
* **상호작용 키 처리:** `Enter` 키 → 충돌된 NPC 상태 변경
* **상태 관리:** 각 NPC의 초대 여부 저장
* **파티 조건 체크:** 모든 NPC가 초대 완료 상태면 → 다음 화면 렌더링
* **텍스트 입력:** `input` 필드에 다짐 입력 → 버튼 누르면 결과 화면 전환

---

### 4. 🗂️ File Structure (초기 구성)

```
invite-mission/
├── index.html
├── style.css
├── main.js
├── assets/
│   ├── player.png
│   ├── npc_parent.png
│   ├── npc_friend.png
│   ├── npc_teacher.png
│   ├── npc_colleague.png
│   ├── party_bg.png
│   └── party_music.mp3
└── README.md
```

---

### 5. ➕ Additional Requirements

* **화면 비율:** 16:9 기준
* **모바일 대응:** PC 우선, 모바일은 고려하지 않아도 됨
* **그래픽:** 간단한 PNG 캐릭터 이미지 (직접 그리거나 무료 리소스 활용)
* **배포:** GitHub Pages로 공개

---

필요하시면 샘플 코드나 이미지 리소스 추천도 도와드릴게요. 어떤 게 먼저 필요하신가요? 😊
