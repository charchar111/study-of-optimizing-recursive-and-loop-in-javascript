(() => {
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

  // 버튼 - 무거운 반복 작업을 웹 워커에서 테스트
  // trigger - 버튼 클릭
  // action - 동기적 반복 함수를 웹 워커에서 실행. 이후 경과 시간 출력
  (function initButtonLoof() {
    const buttonLoof = document.querySelector("#button_loof");
    const worker = new Worker("./worker.js");
    console.log("worker", worker);
    const loofCount = 100000;

    let startTime = undefined;

    worker.onmessage = (event) => {
      const endTime = performance.now();
      console.log(
        `작업 완료. 작업 시간: ${endTime - startTime}ms, 작업 결과: ${
          event.data.result
        }  `
      );
    };

    buttonLoof.addEventListener("click", () => {
      console.log("작업 시작: syncLoof");
      startTime = performance.now();
      worker.postMessage({ actionType: "syncLoof", arg: [loofCount] });
    });
  })();
})();
