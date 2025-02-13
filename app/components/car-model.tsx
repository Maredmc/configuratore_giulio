import { useGLTF } from "@react-three/drei"

export default function CarModel({ color }) {
  // Nota: Questo è un placeholder. Dovresti sostituirlo con il tuo modello 3D effettivo
  const { nodes, materials } = useGLTF("/assets/3d/duck.glb")

  return (
    <mesh>
      <boxGeometry args={[1, 0.5, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

