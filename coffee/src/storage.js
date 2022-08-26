export const storage = localStorage;

export const getItem = (key, defaultValue) => {
  try {
    const value = storage.getItem(key);
    // key에 해당하는 값이 있다면 파싱, 없으면 디폴트값을 리턴한다
    return value ? JSON.parse(value) : defaultValue;
  } catch {
    // 에러가 생길시에도 디폴트값 리턴!
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch {
    // ignore
  }
};
