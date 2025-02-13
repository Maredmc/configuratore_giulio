"use client"

import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

interface ModelControlsProps {
  size: string
}

export default function ModelControls({ size }: ModelControlsProps) {
  const { camera } = useThree()

  useEffect(() => {
    // Adatta la posizione della camera in base alle dimensioni del letto
    const [length, width] = size.split("x").map(Number)
    const maxDimension = Math.max(length, width)
    const cameraDistance = (maxDimension / 100) * 3 // 3 unità per ogni 100cm

    camera.position.set(cameraDistance, cameraDistance * 0.75, cameraDistance)
    camera.lookAt(0, 0, 0)
  }, [camera, size])

  return null
}

