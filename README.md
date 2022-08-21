# Vue3를 활용한 jwt 로그인 구현

## 📌 library
```angular2html
npm install vue-router@4
npm install vuex@4
npm install vee-validate@4 yup
npm install axios
npm install bootstrap@4 jquery popper.js
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome@prerelease
```

## 📌 vee-validate, yup 라이브러리를 사용해 유효성 검사
src/components/LoginView.vue
- Form, Field 컴포넌트 사용

## 📌 vuex-persistedstate 라이브러리 사용해 새로고침 후에도 vuex 데이터 보관
- localStorage에 보관 후 다시 세팅
- store/index.ts 에 plugin 세팅

## 📌 gravatar 라이브러리 사용해 사용자 별 프로필 이미지 생성

## 📌 bearer token 구성 함수 작성
- [X] FE에서 bearer token 다루는 법 공부
    - axios Header 구성 함수 작성


## 📌 칸반 기능 구현 - vue draggable 라이브러리 사용
- [X] 조회, 수정(상태간 드래그 이동),추가, 삭제 기능 완료
- [ ] 같은 그룹 내, todo 간 order by 처리하기

## 📌 Todo 생성, 삭제 로직 구현
- [X] teleport 사용해 모달 기능 구현
- [X] vue-m-message 라이브러리 사용해, 메세지 박스 적용
- [ ] vee-validate Field 컴포넌트 autofocus 문제 해결하기

## 📚 참고
- [vue-3-authentication-jwt](https://www.bezkoder.com/vue-3-authentication-jwt/?__cf_chl_tk=lushZhPF_eDZhle6YDnS01unt7Lx65qD7Hksmz84YHM-1660026009-0-gaNycGzNCNE)
- [[2022.06.17] Vue teleport(텔레포트)](https://velog.io/@reasonz/2022.06.17-Vue-teleport%ED%85%94%EB%A0%88%ED%8F%AC%ED%8A%B8)
