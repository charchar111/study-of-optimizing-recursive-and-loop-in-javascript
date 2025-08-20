let count = 0;
const loofCount = 10000;

const checkboxToggleAsyncOptimization = document.querySelector(
  "#checkbox_box_toggle_async_optimization"
);

function getCheckboxToggleAsyncOptimization() {
  return checkboxToggleAsyncOptimization?.elements?.["task_type"]?.value;
}

// 카운터 로직
// trigger - 버튼 클릭
// action - 카운트 증가, 콘솔 출력
// render - 카운트 증가 값 출력
(function initButtonCountAdd() {
  const buttonCountAdd = document.querySelector("#button_count_add");
  const countConsole = document.querySelector("#count_console");

  countConsole.innerText = count;

  buttonCountAdd.addEventListener("click", () => {
    console.log("click");

    countConsole.innerText = ++count;
  });
})();

// 버튼 - 무거운 재귀 작업 테스트
// trigger - 버튼 클릭
// action - 동기적으로 재귀 함수 호출, 매 호출마다 콘솔 출력
(function initButtonRecursive() {
  // 버튼 - 무거운 재귀 작업 테스트
  const buttonRecursive = document.querySelector("#button_recursive");

  // 동기 재귀
  function syncRecursive(n, index = 0) {
    console.log("syncRecursive");
    if (index < n) syncRecursive(n, index + 1);
    else return;
  }

  // 비동기 청크 분할 - 청크 크기 자동 지정(시간 기반)
  /**
   * @param {number} n - 반복 횟수
   * @param {number} [budgetTimeMs] - 청크당 예산 시간
   * (기dasdg
   *
   */
  function asyncRecursiveChunkByTime(n, budgetTimeMs = 16) {
    let index = 0;
    function nextChunk() {
      const start = performance.now();
      while (index < n && performance.now() - start < budgetTimeMs) {
        console.log("asyncRecursiveChunkByTime");
        index++;
      }
      if (index < n) {
        requestAnimationFrame(nextChunk); // 프레임마다 이어서 처리
      }
    }

    nextChunk();
  }

  // 비동기 청크 분할 - 청크 크기 수동 지정
  function asyncRecursiveChunkByCount(n, chunkSize = 1000) {
    let index = 0;
    function nextChunk() {
      const end = Math.min(index + chunkSize, n);
      for (let i = index; i < end; i++) {
        console.log("asyncRecursiveChunkByCount");
      }
      index = end;
      if (index < n) {
        setTimeout(nextChunk, 0);
      }
    }
    nextChunk();
  }

  buttonRecursive.addEventListener("click", () => {
    const taskType = getCheckboxToggleAsyncOptimization();
    taskType === "" || taskType == undefined
      ? syncRecursive(loofCount)
      : taskType === "time-sliced"
      ? asyncRecursiveChunkByTime(loofCount)
      : taskType === "count-based"
      ? asyncRecursiveChunkByCount(loofCount)
      : null;
  });
})();

// 버튼 - 무거운 반복 작업 테스트
// trigger - 버튼 클릭
// action - 동기적으로 반복문 실행, 매 반복마다 콘솔 출력
(function initButtonLoof() {
  const buttonLoof = document.querySelector("#button_loof");

  // 동기 반복
  function syncLoof(n) {
    let i = 0;

    while (true) {
      console.log("syncLoof");

      if (i < n) i++;
      else break;
    }
  }

  // 비동기 재귀 - microtaskqueue - Promise
  function asyncLoofChunkByTime(n) {
    let i = 0;

    while (true) {
      Promise.resolve().then(() => {
        console.log("asyncLoofChunkByTime");
      });

      if (i < n) i++;
      else break;
    }
  }

  // 비동기 반복  - macroTaskqueue - setTimeOut
  function asyncLoofChunkByCount(n) {
    let i = 0;

    while (true) {
      if (i < n) {
        setTimeout(() => {
          console.log("asyncLoofChunkByCount");
        });
        i++;
      } else break;
    }
  }
  buttonLoof.addEventListener("click", () => {
    const taskType = getCheckboxToggleAsyncOptimization();
    taskType === "" || taskType == undefined
      ? syncLoof(loofCount)
      : taskType === "time-sliced"
      ? asyncLoofChunkByTime(loofCount)
      : taskType === "count-based"
      ? asyncLoofChunkByCount(loofCount)
      : null;
  });
})();
