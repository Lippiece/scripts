type Key = "userList" | "exceptions"
declare const GM_getValue: <T>(key: Key, defaultValue?: any) => Promise<T>
