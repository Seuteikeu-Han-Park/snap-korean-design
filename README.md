# LifeVocab — Design System & Gallery 🎨

LifeVocab의 **디자인 시스템 + 화면 목업**을 HTML로 관리하는 폴더. 기획 문서에서 정한 브랜딩과 화면 구조를 바로 확인하고 조정하는 용도다.

- 🎨 디자인 시스템: `#/system`
- 📱 화면: `#/capture` · `#/log` · `#/result` · `#/review`

## 핵심 구조 — 토큰 한 곳, 일괄 적용

```
tokens.css        ← 값(색·타이포·간격)을 정의하는 유일한 곳  ★ 단일 소스
   │  (var()로만 참조)
   ├─ components.css   ← 버튼·칩·카드·폰 프레임 등 컴포넌트 (하드코딩 값 0)
   └─ shell.css        ← 사이트 레이아웃(사이드바 내비)
        │
        ▼  소비
design-system.html   ← 토큰·컴포넌트 라이브 스타일 가이드
screens/*.html       ← 촬영 / 로그 / 결과 / 복습 (컴포넌트 클래스만 사용)
```

**`tokens.css`의 변수 하나만 바꾸면** 디자인 시스템 페이지와 모든 화면에 동시에 반영됩니다.
예: `--color-primary` 를 바꾸면 버튼·칩·마이크·폰 강조색이 전부 따라옵니다.
같은 토큰을 Flutter `AppColors/AppSpacing/AppTypography/AppMotion`에 맞추면 디자인↔코드 드리프트가 사라집니다.

### 토큰 인벤토리

| 그룹 | 토큰 |
| --- | --- |
| Color · 브랜드 | `--color-primary` / `-dark` / `-soft`, `--color-accent` / `-soft` |
| Color · 표면/텍스트 | `--color-bg`, `--color-surface` / `-alt`, `--color-on-surface` / `-muted`, `--color-on-primary`, `--color-border` |
| Color · 상태 | `--color-success/warning/danger/info` (+ 각 `-soft`) |
| Color · 상호작용 | `--color-focus`, `--color-disabled`, `--color-on-disabled`, `--color-scrim` |
| Gradient | `--gradient-primary` (CTA), `--gradient-accent`, `--gradient-photo`, `--gradient-bg` |
| Spacing | `--space-2xs … --space-3xl` (4px 배수) |
| Radius | `--radius-sm/md/lg/pill/circle` |
| Border | `--border-width`, `--border-width-strong` |
| Sizing | `--tap-target` (44px, 접근성), `--nav-width` |
| Typography | `--text-display/h1/h2/body/label/caption`, `--weight-*`, `--leading-tight/snug/normal`, `--tracking-wide`, `--font` / `--font-mono` |
| Elevation | `--shadow-soft/card/overlay` (레이어드), `--shadow-press` |
| Motion | `--duration-fast/base/slow`, `--ease-standard/out`, `--transition-base` |
| Z-index | `--z-base/nav/scrim/modal/toast` |

### 컴포넌트 인벤토리

`.statusbar` (폰 시계·배터리) · `.appbar` / `.appbar__step` · `.steps` (단계 인디케이터) ·
`.btn` (`--ghost/accent/danger/sm`, `.is-loading`, `:disabled`, 그라데이션+lift/press) · `.icon-btn` ·
`.camera` / `.dial` / `.dial__slot` / `.shutter` (회전식 촬영 모드 다이얼) · `.viewfinder` ·
`.steps` · `.progress` · `.chip` (`--noun/conj/selectable`) · `.badge` (`--success/warning/danger/info`) ·
`.card` (`--hint/accent/danger`) · `.expression` · `.photo` (`.photo__tag` 비네팅 사진 카드) · `.field` (`--error`) · `.switch` ·
`.list` / `.list-item` · `.empty` · `.skeleton` · `.mic` (`.is-recording`) · `.spinner` · `.divider` ·
`.scrim` / `.sheet` / `.dialog` / `.toast` · 텍스트/간격 헬퍼(`.display/.headline/.subhead/.body/.muted/.caption/.link`, `.stack-*`, `.row`).

**접근성**: 키보드 `:focus-visible` 링, 최소 터치 영역 44px, `prefers-reduced-motion` 자동 대응, `.sr-only` 헬퍼,
다이얼은 `role="radiogroup"` + 화살표 키 지원.

### 아이콘 & 이모지

- **UI 아이콘 = [Lucide](https://lucide.dev)** — `<i data-lucide="camera"></i>` 형태로 작성, `currentColor`/`1em`로 토큰 색·크기를 따른다.
- **보조 이모지 = [Twemoji](https://github.com/jdecked/twemoji)(트위터 이모지)** — 본문에 이모지 문자(💡 📘)를 그대로 쓰면 자동으로 SVG로 치환.
- 두 가지 모두 `assets/glyphs.js`가 CDN에서 로드·렌더한다. 동적으로 DOM을 추가했다면 `window.renderGlyphs()` 호출.
- 회전 다이얼 동작은 `assets/dial.js`(촬영 화면 전용).

## 파일

```
index.html              ← 셸: 좌측 사이드바 내비 + 콘텐츠(해시 라우팅 #/system, #/capture …)
design-system.html      ← 디자인 시스템 페이지 (값은 tokens.css에서 실시간 표시)
assets/
  tokens.css            ← ★ 디자인 토큰 (단일 소스)
  components.css         ← 컴포넌트 (토큰만 사용)
  shell.css             ← 사이트 레이아웃
  glyphs.js             ← Lucide 아이콘 + Twemoji 이모지 로더
  dial.js               ← 회전식 촬영 모드 다이얼 동작
screens/
  capture.html · log.html · result.html · review.html
.github/workflows/pages.yml   ← main push 시 자동 배포
```

## 디자인 변경하기 (일괄 적용)

1. **색/글자/간격을 바꾼다** → `assets/tokens.css`의 해당 변수만 수정. (다른 파일 손대지 않음)
2. **새 컴포넌트를 추가한다** → `assets/components.css`에 클래스 추가 (값은 `var(--token)`만).
3. **새 화면을 추가한다** → `screens/<name>.html` (`components.css` 링크 + 컴포넌트 클래스),
   `index.html`의 `routes`와 사이드바에 항목 추가.
4. main에 push → Pages 자동 갱신.

## 로컬 미리보기

```bash
cd design && python3 -m http.server 8000
# http://localhost:8000
```

## 디자인 원칙

- 앱 이름: `LifeVocab`
- 메인 컬러: `#D7C5F7`
- 레퍼런스는 참고만 하고, 배치와 컴포넌트 조합은 독자적으로 설계
- 핵심 흐름: `찍는다 → 바로 안다 → 저장한다 → 다시 본다`
- 큰 글씨, 넓은 여백, 카드 중심 구조, 빠른 학습 액션을 우선
