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
  let count = 0;

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

  // 비동기 재귀 - microtaskqueue - queueMicrotask
  // function asyncRecursive(n, index = 0) {
  //   console.log("asyncRecursive");
  //   queueMicrotask(() => {
  //     if (index < n) asyncRecursive(n, index + 1);
  //     else return;
  //   });
  // }
  // 비동기 재귀 - microtaskqueue - Promise
  function asyncRecursiveMicro(n, index = 0) {
    console.log("asyncRecursiveMicro");
    return Promise.resolve().then(() => {
      if (index < n) asyncRecursiveMicro(n, index + 1);
      else return;
    });
  }
  // 비동기 재귀 - macroTaskqueue - setTimeOut
  function asyncRecursiveMacro(n, index = 0) {
    console.log("asyncRecursiveMacro");
    return setTimeout(() => {
      if (index < n) asyncRecursiveMacro(n, index + 1);
      else return;
    }, 0);
    // return requestAnimationFrame(() => {
    //   if (index < n) asyncRecursiveMacro(n, index + 1);
    //   else return;
    // });
  }

  buttonRecursive.addEventListener("click", () => {
    const taskType = getCheckboxToggleAsyncOptimization();
    taskType === "" || taskType == undefined
      ? syncRecursive(loofCount)
      : taskType === "macro"
      ? asyncRecursiveMacro(loofCount)
      : taskType === "micro"
      ? asyncRecursiveMicro(loofCount)
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
  function asyncLoofMicro(n) {
    let i = 0;

    while (true) {
      Promise.resolve().then(() => {
        console.log("asyncLoofMicro");
      });

      if (i < n) i++;
      else break;
    }
  }

  // 비동기 반복  - macroTaskqueue - setTimeOut
  function asyncLoofMacro(n) {
    let i = 0;

    while (true) {
      if (i < n) {
        setTimeout(() => {
          console.log("asyncLoofMacro");
        });
        i++;
      } else break;
    }
  }
  buttonLoof.addEventListener("click", () => {
    const taskType = getCheckboxToggleAsyncOptimization();
    taskType === "" || taskType == undefined
      ? syncLoof(loofCount)
      : taskType === "macro"
      ? asyncLoofMacro(loofCount)
      : taskType === "micro"
      ? asyncLoofMicro(loofCount)
      : null;
  });
})();
