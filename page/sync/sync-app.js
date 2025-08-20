let count = 0;
const loofCount = 10000;

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
  const buttonRecursive = document.querySelector("#button_recursive");

  function syncRecursive(n, index = 0) {
    console.log("syncRecursive");
    if (index < n) syncRecursive(n, index + 1);
    else return;
  }

  buttonRecursive.addEventListener("click", () => syncRecursive(loofCount));
})();

// 버튼 - 무거운 반복 작업 테스트
// trigger - 버튼 클릭
// action - 동기적으로 반복문 실행, 매 반복마다 콘솔 출력
(function initButtonLoof() {
  const buttonLoof = document.querySelector("#button_loof");

  function syncLoof(n) {
    let i = 0;

    while (true) {
      console.log("syncLoof");

      if (i < n) i++;
      else break;
    }
  }
  buttonLoof.addEventListener("click", () => syncLoof(loofCount));
})();
