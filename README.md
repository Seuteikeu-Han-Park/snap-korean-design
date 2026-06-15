# Snap Korean — Design Gallery 🎨

[Snap Korean](https://github.com/Seuteikeu-Han-Park/snap-korean) 앱 디자인을 **HTML 목업**으로 만들어 GitHub Pages로 공유하는 레포. (Figma 대체)

**라이브**: https://seuteikeu-han-park.github.io/snap-korean-design/

## 왜 HTML + Pages인가

- **단일 토큰 소스**: `assets/tokens.css`의 색·타이포·간격이 Flutter `AppColors/AppSpacing/AppTypography`와 같은 값 → 디자인↔코드 드리프트 감소
- **버전 관리·PR 리뷰**: 디자인 변경이 diff로 남고 PR에서 리뷰
- **공유 URL 1개**: 계정·권한 없이 누구나, 모바일에서도 바로 확인

## 구조

```
index.html              ← 갤러리 (폰 프레임에 화면 iframe 임베드)
assets/
  tokens.css            ← 디자인 토큰 (단일 소스)
  gallery.css           ← 갤러리 + 폰 프레임 + UI 프리미티브
screens/
  capture.html          ← 1 · 촬영
  expression.html       ← 2 · 내 표현 (히어로)
  pronunciation.html    ← 3 · 발음 연습
.github/workflows/pages.yml   ← main push 시 자동 배포
```

## 로컬 미리보기

```bash
cd snap-korean-design && python3 -m http.server 8000
# http://localhost:8000
```

## 화면 추가

1. `screens/<name>.html` 작성 — `<link rel="stylesheet" href="../assets/gallery.css">` 후 `.screen` 마크업.
2. `index.html` 갤러리에 `.gallery__item` 카드 추가 (iframe src).
3. main에 push → Pages 자동 갱신.

## 디자인 원칙 (Lisa 페르소나)

테크 비친화 학습자 기준 — 큰 글씨(본문 17+), 따뜻한 톤, 화면당 단일 CTA, Success-First.
코어 메시지: **명사가 아니라 활용형 표현(문장)**. 자세한 건 앱 레포 `AGENTS.md`.
