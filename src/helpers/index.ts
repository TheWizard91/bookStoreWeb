import dynamic from "next/dynamic"

const Device = dynamic (() => import ("./device.tsx"), {ssr: false});

export default Device;