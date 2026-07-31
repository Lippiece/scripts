type Key = "userList" | "exceptions" | "minimumScore"
declare const GM_getValue: <T>(key: Key, defaultValue?: any) => Promise<T>
