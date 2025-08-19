let count = 0;

// 카운터 로직
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
(function initButtonRecursive() {
  const buttonRecursive = document.querySelector("#button_recursive");

  // 동기 재귀
  function syncRecursive(n, index = 0) {
    console.log("syncRecursive");
    if (index < n) syncRecursive(n, index + 1);
    else return;
  }

  buttonRecursive.addEventListener("click", () => syncRecursive(3000));
})();

// 버튼 - 무거운 반복 작업 테스트
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
  buttonLoof.addEventListener("click", () => syncLoof(3000));
})();
