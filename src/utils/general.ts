import convert from 'color-convert'
import gsap from 'gsap'


export const darkenColor = (color: string | undefined): string => {
    if (color === undefined) return '#000000';
    const hexString = color.split('#')[1]

    const [h,s,l] = convert.hex.hsl(hexString)
    const newHex = convert.hsl.hex([h, s, l - 15])
    const newHexString = `#${newHex}`

    return newHexString
}



export const animations = {
    switchForm: (login: string, signin: string) => {
        const tl = gsap.timeline()
        tl.to('.form-container__login', { left: login })
        .to('.form-container__signin', { left: signin }, '<' )
    }
}