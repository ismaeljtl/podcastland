export default function debounce<T extends Function>(cb: T, wait = 500) {
    let h: any;
    let callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return <T>(<any>callable);
}

// USAGE
// let f = debounce((a: string, b: number, c?: number) => console.log(a.length + b + c || 0));
// f("hi", 1, 1);
// f("world", 1);