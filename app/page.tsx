"use client"

import { Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Environment } from "@react-three/drei"
import BedModel from "./components/bed-model"
import ConfigPanel from "./components/config-panel"
import Header from "./components/header"
import PriceBar from "./components/price-bar"
import ModelControls from "./components/model-controls"

// Prezzi base e aggiunte
const PRICES = {
  base: 599,
  sizes: {
    "190x80": 0,
    "190x120": 100,
    "160x80": 50,
  },
  colors: {
    natural: 0,
    white: 50,
  },
  railings: {
    none: 0,
    top: 100,
    full: 200,
    ends: 150,
  },
  evolutiveKit: {
    none: 0,
    small: 80,
    large: 120,
  },
}

export default function Configurator() {
  const [bedSize, setBedSize] = useState("190x80")
  const [bedColor, setBedColor] = useState("natural")
  const [railings, setRailings] = useState("none")
  const [evolutiveKit, setEvolutiveKit] = useState("none")
  const [totalPrice, setTotalPrice] = useState(PRICES.base)

  useEffect(() => {
    const price =
      PRICES.base +
      PRICES.sizes[bedSize] +
      PRICES.colors[bedColor] +
      PRICES.railings[railings] +
      PRICES.evolutiveKit[evolutiveKit]
    setTotalPrice(price)
  }, [bedSize, bedColor, railings, evolutiveKit])

  const [length, width] = bedSize.split("x").map(Number)

  const renderCanvas = () => (
    <Canvas camera={{ position: [3, 2.25, 3], fov: 50 }}>
      <Suspense fallback={null}>
        <BedModel size={bedSize} color={bedColor} railings={railings} evolutiveKit={evolutiveKit} />
        <ModelControls size={bedSize} />
        <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="md:hidden h-[35vh] sticky top-0 z-10 bg-white">
        {renderCanvas()}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white" />
      </div>

      <main className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:block md:w-[60%] relative">{renderCanvas()}</div>

        <ConfigPanel
          size={bedSize}
          onSizeChange={setBedSize}
          color={bedColor}
          onColorChange={setBedColor}
          railings={railings}
          onRailingsChange={setRailings}
          evolutiveKit={evolutiveKit}
          onEvolutiveKitChange={setEvolutiveKit}
          dimensions={{ length, width }}
          className="md:w-[40%] flex-1"
        />
      </main>

      <PriceBar price={totalPrice} />
    </div>
  )
}

