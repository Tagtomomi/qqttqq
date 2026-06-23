# 페이지 구조 안내

어디를 고치면 되는지 빠르게 찾기 위한 파일입니다.

---

## URL → 파일

| 주소 | 하는 일 | 수정할 파일 |
|------|---------|-------------|
| `/` | 상품 목록으로 이동 | `app/page.tsx` |
| `/products` | 상품 목록 | `app/products/page.tsx` |
| `/products/new` | 상품 추가 | `app/products/new/page.tsx` |
| `/products/[id]` | 상품 상세 | `app/products/[id]/page.tsx` |
| `/products/[id]/edit` | 상품 수정 | `app/products/[id]/edit/page.tsx` |

---

## 공통 레이아웃

| 수정 내용 | 파일 |
|-----------|------|
| 상단 "옷 관리자" 헤더, 전체 배경/폰트 | `app/layout.tsx` |
| 전역 CSS | `app/globals.css` |

---

## 목록 페이지 (`/products`)

| 수정 내용 | 파일 |
|-----------|------|
| 페이지 제목, "상품 추가" 버튼 | `app/products/page.tsx` |
| 검색·필터 UI | `components/ProductList.tsx` |
| 목록 테이블 + 상단 헤더 열 | `components/ProductTable.tsx` |
| 목록 한 줄(썸네일, 제목, 가격, 체크박스, 수정 아이콘) | `components/ProductCard.tsx` |
| 열 간격(grid) 설정 | `components/CheckBox.tsx` → `PRODUCT_LIST_GRID` |

---

## 상품 추가 / 수정 폼

| 수정 내용 | 파일 |
|-----------|------|
| 폼 전체 UI (이름, 가격, 상태, 메모 등) | `components/ProductForm.tsx` |
| 이미지 파일 업로드 UI | `components/ImageUpload.tsx` |
| 저장 처리 (서버 액션) | `app/products/actions.ts` |

---

## 상품 상세 페이지

| 수정 내용 | 파일 |
|-----------|------|
| 상세 화면 전체 | `app/products/[id]/page.tsx` |

---

## 이미지

| 수정 내용 | 파일 |
|-----------|------|
| 이미지 표시 (목록/상세 공통) | `components/ProductImage.tsx` |
| 파일 업로드 API | `app/api/upload/route.ts` |
| 업로드 함수 (나중에 Supabase로 교체) | `lib/images.ts` |
| 업로드된 파일 저장 위치 | `public/uploads/` |

---

## 데이터 / 비즈니스 로직

| 수정 내용 | 파일 |
|-----------|------|
| 상품 데이터, CRUD (나중에 DB로 교체) | `lib/products.ts` |
| 마진 계산, 가격/퍼센트 포맷 | `lib/calculations.ts` |
| 상품 타입 정의 | `types/product.ts` |

---

## UI 컴포넌트

| 수정 내용 | 파일 |
|-----------|------|
| 체크박스 1개 (상페, 판매상태) | `components/CheckBox.tsx` |
| 상태 선택 체크박스 그룹 (폼/상세용) | `components/StatusCheckbox.tsx` |

---

## 자주 하는 수정 예시

- **목록 열 추가/순서 변경** → `ProductTable.tsx` + `ProductCard.tsx` + `CheckBox.tsx`
- **가격 아래 마진 글씨** → `ProductCard.tsx`
- **수정 버튼 아이콘** → `ProductCard.tsx` → `EditIcon`
- **mock 상품 데이터** → `lib/products.ts`
- **새 필드 추가** → `types/product.ts` → `lib/products.ts` → `ProductForm.tsx` → 목록/상세 컴포넌트

---

## 폴더 한눈에

```
app/                  → 페이지 (URL)
  products/           → 상품 관련 페이지
  api/upload/         → 이미지 업로드 API
components/           → 화면 UI 조각
lib/                  → 데이터·계산·업로드 로직
types/                → TypeScript 타입
public/uploads/       → 업로드된 이미지 파일
```
