import { PinataSDK } from "pinata"

export const pinata = new PinataSDK({
    // @ts-ignore
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  // @ts-ignore
  pinataGateway: `${import.meta.env.VITE_GATEWAY_URL}`
})