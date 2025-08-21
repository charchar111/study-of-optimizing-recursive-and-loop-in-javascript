function syncLoof(n) {
  let i = 0;

  while (true) {
    console.log("syncLoof");

    if (i < n) i++;
    else break;
  }
}

// 웹 워커에서 사용할 함수 맵
const funcMap = {
  syncLoof,
};

self.onmessage = (event) => {
  const { actionType, arg } = event.data;
  const action = funcMap[actionType];
  if (action) {
    action(...arg);
    self.postMessage({ result: "success" });
  } else {
    console.error(`Action type ${actionType} not found.`);
  }
};
