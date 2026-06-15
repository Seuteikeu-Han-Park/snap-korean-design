# Snap Korean — Design System & Gallery 🎨

[Snap Korean](https://github.com/Seuteikeu-Han-Park/snap-korean) 앱의 **디자인 시스템 + 화면 목업**을 HTML로 만들어 GitHub Pages로 공유하는 레포. (Figma 대체)

**라이브**: https://seuteikeu-han-park.github.io/snap-korean-design/

- 🎨 디자인 시스템: https://seuteikeu-han-park.github.io/snap-korean-design/#/system
- 📱 화면: `#/capture` · `#/expression` · `#/pronunciation`

## 핵심 구조 — 토큰 한 곳, 일괄 적용

```
tokens.css        ← 값(색·타이포·간격)을 정의하는 유일한 곳  ★ 단일 소스
   │  (var()로만 참조)
   ├─ components.css   ← 버튼·칩·카드·폰 프레임 등 컴포넌트 (하드코딩 값 0)
   └─ shell.css        ← 사이트 레이아웃(사이드바 내비)
        │
        ▼  소비
design-system.html   ← 토큰·컴포넌트 라이브 스타일 가이드
screens/*.html       ← 촬영 / 내 표현 / 발음 (컴포넌트 클래스만 사용)
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
| Spacing | `--space-2xs … --space-3xl` (4px 배수) |
| Radius | `--radius-sm/md/lg/pill/circle` |
| Border | `--border-width`, `--border-width-strong` |
| Sizing | `--tap-target` (44px, 접근성), `--nav-width` |
| Typography | `--text-display/h1/h2/body/label/caption`, `--weight-*`, `--leading-tight/snug/normal`, `--tracking-wide`, `--font` / `--font-mono` |
| Elevation | `--shadow-soft/card/overlay` |
| Motion | `--duration-fast/base/slow`, `--ease-standard/out`, `--transition-base` |
| Z-index | `--z-base/nav/scrim/modal/toast` |

### 컴포넌트 인벤토리

`.btn` (`--ghost/accent/danger/sm`, `.is-loading`, `:disabled`) · `.icon-btn` · `.appbar` ·
`.steps` · `.progress` · `.chip` (`--noun/conj/selectable`) · `.badge` (`--success/warning/danger/info`) ·
`.card` (`--hint/accent/danger`) · `.expression` · `.photo` · `.field` (`--error`) · `.switch` ·
`.list` / `.list-item` · `.empty` · `.skeleton` · `.mic` (`.is-recording`) · `.spinner` · `.divider` ·
`.scrim` / `.sheet` / `.dialog` / `.toast` · 텍스트/간격 헬퍼(`.display/.headline/.subhead/.body/.muted/.caption/.link`, `.stack-*`, `.row`).

**접근성**: 키보드 `:focus-visible` 링, 최소 터치 영역 44px, `prefers-reduced-motion` 자동 대응, `.sr-only` 헬퍼.

## 파일

```
index.html              ← 셸: 좌측 사이드바 내비 + 콘텐츠(해시 라우팅 #/system, #/capture …)
design-system.html      ← 디자인 시스템 페이지 (값은 tokens.css에서 실시간 표시)
assets/
  tokens.css            ← ★ 디자인 토큰 (단일 소스)
  components.css         ← 컴포넌트 (토큰만 사용)
  shell.css             ← 사이트 레이아웃
screens/
  capture.html · expression.html · pronunciation.html
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
cd snap-korean-design && python3 -m http.server 8000
# http://localhost:8000
```

## 디자인 원칙 (Lisa 페르소나)

테크 비친화 학습자 기준 — 큰 글씨(본문 17+), 따뜻한 톤, 화면당 단일 CTA, Success-First.
코어 메시지: **명사가 아니라 활용형 표현(문장)**. 자세한 건 앱 레포 `AGENTS.md`.
