interface options {
    count: number,
    units: string
}

declare module 'lorem-ipsum' {
    export default function loremIpsum(options: options): string
}