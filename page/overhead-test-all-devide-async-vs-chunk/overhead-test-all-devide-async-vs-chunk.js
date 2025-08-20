//@ts-check

(() => {
  const loofCount = 1000;

  // 무거운 연산
  function heavyWork(count) {
    let sum = 0;
    for (let i = 0; i < 1000; i++) {
      sum += Math.sqrt(count * i);
    }
    return sum;
  }

  // 성능 측정 함수
  const benchmarkTime = async (work, onEnd) => {
    console.log("성능 측정 시작");

    const startTime = performance.now();
    await work();
    const endTime = performance.now();
    onEnd(endTime - startTime);
  };

  const getCheckboxLoofType = ((callback) => {
    /**
     * @type {HTMLFormElement |null}}
     */
    const checkboxLoofType = document.querySelector(
      "#checkbox_box_toggle_loof_type"
    );

    return () => checkboxLoofType?.elements?.["loof_type"]?.value;
  })();

  /**
   * 성능 측정(1개 단위 비동기 분할 성능 측정) 버튼 초기화 및 이벤트 리스너 설정
   * @listens click 버튼 클릭
   * @description 임의의 작업을 비동기 단위 분할로 10000번 반복. 작업 완료 후 콘솔에 작업 경과 시간을 출력
   * 비동기 분할은 requestAnimationFrame과 setTimeout 모두 테스트 필요
   */
  (function initButtonPerfomanceTestAsyncUnitDevide() {
    const buttonPerfTest = document.querySelector(
      "#button__perfomance_test_async_unit_devide"
    );

    if (buttonPerfTest === null) return;

    // 비동기 단위 분할 - 재귀 - requestAnimationFrame
    function perfTestRecursive(count1) {
      return new Promise((resolve) => {
        let index1 = 0;
        function doWork(count2, index2 = 0) {
          heavyWork(index2);
          // console.log(
          //   "perfTestRecursive - UnitDevide",
          //   index2,
          //   count2,
          //   heavyWork(index2)
          // );
          return requestAnimationFrame(() => {
            if (index2 < count2) doWork(count2, index2 + 1);
            else return resolve(null);
          });
        }

        doWork(count1, index1);
      });
    }

    // 비동기 단위 분할 - 반복 - requestAnimationFrame
    function perfTestLoof(count) {
      let index = 0;
      while (index < count) {
        requestAnimationFrame(() => {
          console.log("perfTestLoof - UnitDevide");
        });
        index++;
      }
    }

    buttonPerfTest.addEventListener("click", () => {
      const loofType = getCheckboxLoofType();
      if (loofType === undefined || loofType === "") {
        return alert("반복 작업 타입을 선택해주세요.");
      }

      switch (loofType) {
        case "recursive":
          // perfTestRecursive(loofCount);
          benchmarkTime(
            () => perfTestRecursive(loofCount),
            (time) =>
              console.log(
                `perfTestRecursive - UnitDevide - 작업 완료. 경과 시간: ${time}ms`
              )
          );
          break;
        case "loof":
          perfTestLoof(loofCount);
          break;
      }
    });
  })();

  /**
   * 성능 측정(고정 크기 기반 청크 전략) 버튼 초기화 및 이벤트 리스너 설정
   * @listens click 버튼 클릭
   * @description 임의의 작업을 사이즈 기반 청크 비동기로 10000번 반복. 작업 완료 후 콘솔에 작업 경과 시간을 출력
   */
  (function initButtonPerfomanceTestSizeBasedAsyncChunk() {
    const buttonPerfTest = document.querySelector(
      "#button__perfomance_test_size_based_chunk"
    );

    if (buttonPerfTest === null) return;

    // 사이즈 기반 청크 분할 - 재귀 - requestAnimationFrame
    function perfTestRecursive(count, index = 0) {
      console.log("perfTestRecursive - SizeBasedChunk");

      // return requestAnimationFrame(() => {
      //   if (index < count) perfTestRecursive(count, index + 1);
      //   else return;
      // });
      return setTimeout(() => {
        if (index < count) perfTestRecursive(count, index + 1);
        else return;
      }, 0);
    }

    // 사이즈 기반 청크 분할 - 반복 - requestAnimationFrame
    function perfTestLoof(count) {
      let index = 0;
      while (index < count) {
        requestAnimationFrame(() => {
          console.log("perfTestLoof - SizeBasedChunk");
        });
        index++;
      }
    }

    buttonPerfTest.addEventListener("click", () => {
      const loofType = getCheckboxLoofType();
      if (loofType === undefined || loofType === "") {
        return alert("반복 작업 타입을 선택해주세요.");
      }
      switch (loofType) {
        case "recursive":
          perfTestRecursive(loofCount);
          break;
        case "loof":
          perfTestLoof(loofCount);
          break;
      }
    });
  })();

  /**
   * 성능 측정(시간 기반 청크 전략) 버튼 초기화 및 이벤트 리스너 설정
   * @listens click 버튼 클릭
   * @description 임의의 작업을 시간 기반 청크 비동기로 10000번 반복. 작업 완료 후 콘솔에 작업 경과 시간을 출력
   */
  (function initButtonPerfomanceTestTimeBasedAsyncChunk() {
    const buttonPerfTest = document.querySelector(
      "#button__perfomance_test_time_based_chunk"
    );

    if (buttonPerfTest === null) return;

    // 사이즈 기반 청크 분할 - 재귀 - requestAnimationFrame
    function perfTestRecursive(count, index = 0) {
      console.log("perfTestRecursive - TimeBasedChunk");

      return requestAnimationFrame(() => {
        if (index < count) perfTestRecursive(count, index + 1);
        else return;
      });
    }

    // 사이즈 기반 청크 분할 - 반복 - requestAnimationFrame
    function perfTestLoof(count) {
      let index = 0;
      while (index < count) {
        requestAnimationFrame(() => {
          console.log("perfTestLoof - TimeBasedChunk");
        });
        index++;
      }
    }

    buttonPerfTest.addEventListener("click", () => {
      const loofType = getCheckboxLoofType();
      if (loofType === undefined || loofType === "") {
        return alert("반복 작업 타입을 선택해주세요.");
      }
      switch (loofType) {
        case "recursive":
          perfTestRecursive(loofCount);
          break;
        case "loof":
          perfTestLoof(loofCount);
          break;
      }
    });
  })();
})();
