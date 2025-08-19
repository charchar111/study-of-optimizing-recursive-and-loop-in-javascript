let count = 0;

const checkboxToggleAsyncOptimization = document.querySelector(
  "#checkbox_box_toggle_async_optimization"
);

function getCheckboxToggleAsyncOptimization() {
  return checkboxToggleAsyncOptimization?.elements?.["task_type"]?.value;
}

(function initButtonCountAdd() {
  const buttonCountAdd = document.querySelector("#button_count_add");
  const countConsole = document.querySelector("#count_console");

  countConsole.innerText = count;

  buttonCountAdd.addEventListener("click", () => {
    console.log("click");

    countConsole.innerText = ++count;
  });
})();

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
  }

  buttonRecursive.addEventListener("click", () => {
    const taskType = getCheckboxToggleAsyncOptimization();
    taskType === "" || taskType == undefined
      ? syncRecursive(3000)
      : taskType === "macro"
      ? asyncRecursiveMacro(3000)
      : taskType === "micro"
      ? asyncRecursiveMicro(3000)
      : null;
  });
})();

(function initButtonLoof() {
  // 버튼 - 무거운 반복 작업 테스트
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
  buttonLoof.addEventListener("click", () => syncLoof(3000));
})();
