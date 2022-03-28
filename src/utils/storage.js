// 封装本地存储模块

export const getItem = name => {
    const data = localStorage.getItem(name)
    try {
        //转化成js对象
        return JSON.parse(data)
    } catch (err) {
        return data
    }

}
export const setItem = (name, value) => {
    //如果value是对象，就把value转为JSON
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(name, value)
}
export const removeItem = name => {
    localStorage.removeItem(name)
}