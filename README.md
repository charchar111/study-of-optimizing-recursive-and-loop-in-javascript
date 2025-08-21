# 컨셉

자바스크립트 내에 무거운 반복문과 재귀문이 브라우저 렌더링, 이벤트 처리 작업을 블락하지 않는 방법에 대해 공부하려고 합니다.

이 프로젝트는 그 최적화 방법을 위한 실험 코드입니다.

<a href="https://charchar111.github.io/study-of-optimizing-recursive-and-loop-in-javascript/src">테스트 페이지 링크</a>

# 실행 방법

다음 명령어를 실행하여 정적 서버를 엽니다.

```bash
npm run start
```

브라우저를 열고 localhost:8080 로 접속합니다.

테스트를 위한 각 라우트로 이동 가능합니다.

라우트를 열면 각 무거운 작업을 실행할 수 있는 버튼이 있고 최적화 모드를 활성화할 수 있습니다.

무거운 작업 실행 후, 옆에 카운터 버튼을 클릭하여 브라우저 렌더링과 이벤트 반응 여부를 확인합니다.

# 각 테스트 설명

## sync

무거운 작업을 동기적으로 돌리고 반복과 재귀의 작동 차이, 브라우저 무반응 여부를 테스트

## optimize-all-devide-async

무거운 작업을 비동기로 setTimeout, promise 중 선택하여 진행 후 무반응 여부를 테스트

## optiomize-chunk

무거운 작업을 청크 분리 전략으로 테스트

## overhead-test-all-devide-async-vs-chunk

1개 단위 비동기 분할 요청과 청크 분리 전략 간에 속도 차이를 테스트

## webworker

웹 워커를 이용한 동기적 반복 작업이 브라우저 무반응을 일으키는지 테스트
