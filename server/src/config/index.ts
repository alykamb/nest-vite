import { ConfigModuleOptions, registerAs } from '@nestjs/config'

const jwtKeys = registerAs('jwt', () => {
    return {
        publicKey: process.env.JWT_PUBLIC_KEY,
        privateKey: process.env.JWT_PRIVATE_KEY,
    }
})

export const configModuleOptions: ConfigModuleOptions = {
    isGlobal: true,
    load: [jwtKeys],
}
