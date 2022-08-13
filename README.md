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



## 📚 참고
- [vue-3-authentication-jwt](https://www.bezkoder.com/vue-3-authentication-jwt/?__cf_chl_tk=lushZhPF_eDZhle6YDnS01unt7Lx65qD7Hksmz84YHM-1660026009-0-gaNycGzNCNE)
