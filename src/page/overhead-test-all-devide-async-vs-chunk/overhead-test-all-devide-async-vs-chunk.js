//@ts-check

(() => {
  const loofCount = 10000;

  // 무거운 더미 작업
  function heavyWork(num) {
    let sum = 0;
    for (let i = 0; i < 100; i++) {
      sum += Math.sqrt(num * i);
    }
    return sum;
  }

  /**
   * 비동기 작업의 성능 측정 함수
   * @param {Function} work 성능 측정을 실행할 작업.
   * @param {benchmarkTimeOnEnd} onEnd 작업 완료 후 호출될 콜백 함수. 인자로 경과 시간과 작업 결과를 받음.
   *
   */
  async function benchmarkTime(work, onEnd) {
    console.log("성능 측정 시작");

    const startTime = performance.now();
    const result = await work();
    const endTime = performance.now();
    onEnd(endTime - startTime, result);
  }

  /**
   * benchmarkTime 함수의 작업 완료 후 호출되는 콜백
   * @callback benchmarkTimeOnEnd
   * @param {number} time 경과 시간(ms)
   * @param {unknown} result 작업 결과
   *
   */

  /**
   * @function
   */
  const getCheckboxLoofType = ((callback) => {
    /**
     * @type {HTMLFormElement |null}}
     */
    const checkboxLoofType = document.querySelector(
      "#checkbox_box_toggle_loof_type"
    );

    return () => checkboxLoofType?.elements?.["loof_type"]?.value;
  })();

  // 카운터 로직
  // trigger - 버튼 클릭
  // action - 카운트 증가, 콘솔 출력
  // render - 카운트 증가 값 출력
  (function initButtonCountAdd() {
    let count = 0;

    /**
     * @type {HTMLButtonElement | null}
     */
    const buttonCountAdd = document.querySelector("#button_count_add");
    /**
     * @type {HTMLDivElement | null}
     */
    const countConsole = document.querySelector("#count_console");

    if (buttonCountAdd === null || countConsole === null) return;

    countConsole.innerText = String(count);

    buttonCountAdd.addEventListener("click", () => {
      console.log("click");

      countConsole.innerText = String(++count);
    });
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
          // heavyWork(index2);
          console.log(
            "perfTestRecursive - UnitDevide",
            index2,
            count2,
            heavyWork(index2)
          );
          // return requestAnimationFrame(() => {
          //   if (index < count) perfTestRecursive(count, index + 1);
          //   else return;
          // });
          return setTimeout(() => {
            if (index2 < count2) doWork(count2, index2 + 1);
            else return resolve(null);
          }, 0);
        }

        doWork(count1, index1);
      });
    }

    // 비동기 단위 분할 - 반복 - requestAnimationFrame
    function perfTestLoof(count) {
      return new Promise((resolve) => {
        let index = 0;
        while (index <= count) {
          ((index2, count2) => {
            /**
             *
             * @deprecated  이걸로 하면, 한 프레임 내에 모든 rAF 예약이 이뤄지며, 다음 프레임에 렌더링 지연이 발생함.
             *  */
            // requestAnimationFrame(() => {
            //   console.log(
            //     "perfTestLoof - UnitDevide",
            //     index2,
            //     count2,
            //     heavyWork(index2)
            //   );
            //   // heavyWork(index2);
            //   if (index2 + 1 >= count2) resolve(null);
            // });

            setTimeout(() => {
              console.log(
                "perfTestLoof - UnitDevide",
                index2,
                count2,
                heavyWork(index2)
              );
              if (index2 >= count2) resolve(null);
            }, 0);
          })(index, count);

          index++;
        }
      });
    }

    buttonPerfTest.addEventListener("click", () => {
      const loofType = getCheckboxLoofType();
      if (loofType === undefined || loofType === "") {
        return alert("반복 작업 타입을 선택해주세요.");
      }

      switch (loofType) {
        case "recursive":
          benchmarkTime(
            () => perfTestRecursive(loofCount),
            (time) =>
              console.log(
                `perfTestRecursive - UnitDevide - 작업 완료. 경과 시간: ${time}ms`
              )
          );
          break;
        case "loof":
          benchmarkTime(
            () => perfTestLoof(loofCount),
            (time) =>
              console.log(
                `perfTestLoof - UnitDevide - 작업 완료. 경과 시간: ${time}ms`
              )
          );
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
    // 비동기 청크 분할 - 청크 크기 수동 지정
    function perfTestRecursive(n, chunkSize = 1000) {
      return new Promise((resolve) => {
        let index = 0;
        function nextChunk() {
          const end = Math.min(index + chunkSize, n);
          for (let i = index; i < end; i++) {
            console.log("perfTestRecursive - SizeBasedChunk", i, heavyWork(i));
          }
          index = end;
          if (index < n) {
            setTimeout(nextChunk, 0);
          } else resolve(null);
        }
        nextChunk();
      });
    }

    // 사이즈 기반 청크 분할 - 반복 - setTimeout
    function perfTestLoof(count, chunkSize = 1000) {
      return new Promise((resolve) => {
        const totalChunks = Math.ceil(count / chunkSize);

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
          ((startIndex) => {
            setTimeout(() => {
              const endIndex = Math.min(startIndex + chunkSize, count);
              for (let i = startIndex; i < endIndex; i++) {
                console.log(
                  "erfTestLoof - SizeBasedAsyncChunk",
                  i,
                  heavyWork(i)
                );
              }

              // 마지막 청크면 resolve 호출
              if (chunkIndex === totalChunks - 1) {
                resolve(null);
              }
            }, 0);
          })(chunkIndex * chunkSize);
        }
      });
    }

    buttonPerfTest.addEventListener("click", () => {
      const loofType = getCheckboxLoofType();
      if (loofType === undefined || loofType === "") {
        return alert("반복 작업 타입을 선택해주세요.");
      }
      switch (loofType) {
        case "recursive":
          benchmarkTime(
            () => perfTestRecursive(loofCount),
            (time) =>
              console.log(
                `perfTestRecursive - SizeBasedAsyncChunk - 작업 완료. 경과 시간: ${time}ms`
              )
          );
          break;
        case "loof":
          benchmarkTime(
            () => perfTestLoof(loofCount),
            (time) =>
              console.log(
                `perfTestLoof - SizeBasedAsyncChunk - 작업 완료. 경과 시간: ${time}ms`
              )
          );
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

    // 시간 기반 청크 분할 - 재귀 - setTimeout
    function perfTestRecursive(count, budgetTimeMs = 16) {
      return new Promise((resolve) => {
        let index = 0;
        function nextChunk() {
          const start = performance.now();
          while (index < count && performance.now() - start < budgetTimeMs) {
            console.log(
              "perfTestRecursive - timeBasedChunk",
              index,
              count,
              heavyWork(index)
            );
            index++;
          }
          if (index < count) {
            setTimeout(nextChunk); // 프레임마다 이어서 처리
          } else resolve(null);
        }

        nextChunk();
      });
    }

    // 반복문 기반 시간 단위 청크 분할 (재귀 X, 반복문으로 예약)
    // 반복문 기반 시간 청크 분할 (선예약, 지연 0ms, 재귀 없음)
    function perfTestLoof(count, budgetTimeMs = 16) {
      return new Promise((resolve) => {
        if (count <= 0) return resolve(null);

        let index = 0; // 전역 진행 인덱스(모든 콜백이 공유)
        let done = false; // resolve 한 번만

        // 최악의 경우(슬롯당 1개 처리)에도 끝나도록 count개 만큼 선예약
        for (let w = 0; w < count; w++) {
          setTimeout(() => {
            if (done) return;

            const start = performance.now();
            while (index < count && performance.now() - start < budgetTimeMs) {
              // 필요한 작업 수행
              console.log(
                "perfTestLoof - timeBudget",
                index,
                count,
                heavyWork(index)
              );
              // heavyWork(index);
              index++;
            }

            if (index >= count && !done) {
              done = true;
              resolve(null);
            }
          }, 0); // 추가 지연 없이 전부 0ms로 몰아 예약
        }
      });
    }

    buttonPerfTest.addEventListener("click", () => {
      const loofType = getCheckboxLoofType();
      if (loofType === undefined || loofType === "") {
        return alert("반복 작업 타입을 선택해주세요.");
      }
      switch (loofType) {
        case "recursive":
          benchmarkTime(
            () => perfTestRecursive(loofCount),
            (time) =>
              console.log(
                `perfTestRecursive - timeBasedAsyncChunk - 작업 완료. 경과 시간: ${time}ms`
              )
          );
          break;
        case "loof":
          alert(
            "loof는 시간 기반 청크 분할을 지원하지 않습니다." +
              "(사유: 실시간 경과를 기준으로 자동으로 청크를 끊는 시간 단위 분할은 반복문으로는 구현이 불가능)"
          );

          break;
      }
    });
  })();
})();
