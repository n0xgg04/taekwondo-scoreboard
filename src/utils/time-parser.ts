export function parseToMin(second: number): string {
    let min = Math.floor(second / 60).toString()
    let sec = (second % 60).toString()

    while (min.length < 2) min = "0" + min
    while (sec.length < 2) sec = "0" + sec

    return `${min}:${sec}`
}
