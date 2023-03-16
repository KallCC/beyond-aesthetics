import { useEffect, useState } from "react";

export const getUser = () => {

    const userInfo = localStorage.getItem('user') !== 'undefined'
        ? localStorage.getItem('user')
        : localStorage.clear();

    return userInfo;
}

export const useDebounceValue = (value: string, time = 400) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, time)

        return () => {
            clearTimeout(timeout)
        }

    }, [time, value])

    return debounceValue
}