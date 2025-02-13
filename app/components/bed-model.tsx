"use client"

import { useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface BedModelProps {
  size: string
  color: string
  railings: string
  evolutiveKit: string
}

export default function BedModel({ size, color, railings, evolutiveKit }: BedModelProps) {
  const groupRef = useRef()
  const [modelUrl, setModelUrl] = useState(`/models/bed_${size}.gltf`)

  // Carica il modello base
  const { scene: baseScene } = useGLTF(modelUrl)

  // Carica i modelli aggiuntivi
  const { scene: railingsScene } = useGLTF("/models/railings.gltf")
  const { scene: smallLegsScene } = useGLTF("/models/small_legs.gltf")
  const { scene: largeLegsScene } = useGLTF("/models/large_legs.gltf")

  useEffect(() => {
    // Cambia il modello base in base alle dimensioni
    setModelUrl(`/models/bed_${size}.gltf`)
  }, [size])

  useEffect(() => {
    // Applica il colore al modello base e ai componenti aggiuntivi
    const applyColor = (scene) => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: color === "natural" ? "#D2B48C" : "#FFFFFF",
          })
        }
      })
    }

    applyColor(baseScene)
    applyColor(railingsScene)
    applyColor(smallLegsScene)
    applyColor(largeLegsScene)
  }, [baseScene, railingsScene, smallLegsScene, largeLegsScene, color])

  useEffect(() => {
    if (groupRef.current) {
      // Rimuovi tutti i modelli aggiuntivi esistenti
      groupRef.current.children = [baseScene]

      // Aggiungi le sponde se necessario
      if (railings !== "none") {
        const railingsModel = railingsScene.clone()

        switch (railings) {
          case "top":
            railingsModel.getObjectByName("top_railings").visible = true
            railingsModel.getObjectByName("side_railings").visible = false
            railingsModel.getObjectByName("end_railings").visible = false
            break
          case "full":
            railingsModel.getObjectByName("top_railings").visible = true
            railingsModel.getObjectByName("side_railings").visible = true
            railingsModel.getObjectByName("end_railings").visible = true
            break
          case "ends":
            railingsModel.getObjectByName("top_railings").visible = false
            railingsModel.getObjectByName("side_railings").visible = false
            railingsModel.getObjectByName("end_railings").visible = true
            break
        }

        groupRef.current.add(railingsModel)
      }

      // Aggiungi il kit evolutivo se necessario
      if (evolutiveKit === "small") {
        const smallLegsModel = smallLegsScene.clone()
        smallLegsModel.position.set(0, -0.11, 0) // Posiziona i piedini 11cm sotto il letto
        groupRef.current.add(smallLegsModel)
      } else if (evolutiveKit === "large") {
        const largeLegsModel = largeLegsScene.clone()
        largeLegsModel.position.set(0, -0.23, 0) // Posiziona i piedOni 23cm sotto il letto
        groupRef.current.add(largeLegsModel)
      }

      // Adatta la scala del gruppo in base alle dimensioni
      const [length, width] = size.split("x").map(Number)
      const scale = {
        "190x80": [1.9, 1, 0.8],
        "190x120": [1.9, 1, 1.2],
        "160x80": [1.6, 1, 0.8],
      }[size] || [1, 1, 1]
      groupRef.current.scale.set(...scale)
    }
  }, [baseScene, railingsScene, smallLegsScene, largeLegsScene, size, railings, evolutiveKit])

  return <group ref={groupRef} />
}

// Precarica i modelli
useGLTF.preload([
  "/models/senza_sponde_a_terra.gltf",
  "/models/senza_sponde_a_terra.gltf",
  "/models/senza_sponde_a_terra.gltf",
  "/models/senza_sponde_a_terra.gltf",
  "/models/senza_sponde_a_terra.gltf",
  "/models/senza_sponde_a_terra.gltf",
])

