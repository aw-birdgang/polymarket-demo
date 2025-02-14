async function deepResolvePromises(input) {
  // 1. 입력이 Promise인 경우, 해당 Promise가 resolve될 때까지 대기하고 반환
  if (input instanceof Promise) {
    return await input;
  }

  // 2. 입력이 배열인 경우, 배열 내의 모든 요소에 대해 재귀적으로 deepResolvePromises를 호출하여 Promise가 있는 모든 요소를 resolve
  if (Array.isArray(input)) {
    const resolvedArray = await Promise.all(input.map(deepResolvePromises));
    return resolvedArray;
  }

  // 3. 입력이 Date 객체인 경우, 이를 그대로 반환 (비동기 처리 필요 없음)
  if (input instanceof Date) {
    return input;
  }

  // 4. 입력이 객체일 경우, 객체의 모든 프로퍼티에 대해 재귀적으로 deepResolvePromises를 호출하여 Promise가 있는 프로퍼티를 resolve
  if (typeof input === 'object' && input !== null) {
    const keys = Object.keys(input); // 객체의 모든 키 가져오기
    const resolvedObject = {}; // resolve된 값을 저장할 새로운 객체

    // 각 키에 대해 재귀적으로 deepResolvePromises 호출 후, resolvedObject에 저장
    for (const key of keys) {
      const resolvedValue = await deepResolvePromises(input[key]);
      resolvedObject[key] = resolvedValue;
    }

    return resolvedObject; // 모든 프로퍼티의 Promise가 resolve된 객체 반환
  }

  // 5. 입력이 Promise, 배열, 객체가 아닌 경우, 그대로 반환 (기본 타입 등)
  return input;
}

export default deepResolvePromises;
