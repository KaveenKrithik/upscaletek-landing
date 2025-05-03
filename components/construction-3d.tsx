"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Environment, Float, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { type Mesh, type Group, MathUtils, Color } from "three"
import { motion } from "framer-motion"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"

// Interactive gear component
function InteractiveGear({ position, scale, rotation, color, speed = 0.5 }: any) {
  const gearRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame(({ clock }) => {
    if (gearRef.current) {
      // Rotate based on speed and whether it's clicked
      gearRef.current.rotation.z = clock.getElapsedTime() * speed * (clicked ? 2 : 1)

      // Scale based on hover state
      gearRef.current.scale.x = MathUtils.lerp(gearRef.current.scale.x, scale * (hovered ? 1.1 : 1), 0.1)
      gearRef.current.scale.y = gearRef.current.scale.x
      gearRef.current.scale.z = gearRef.current.scale.x
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={gearRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          color={hovered ? "#a78bfa" : color}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? color : "black"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />

        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={i}
            position={[Math.cos((i / 12) * Math.PI * 2) * 1.3, 0, Math.sin((i / 12) * Math.PI * 2) * 1.3]}
            rotation={[Math.PI / 2, 0, (i / 12) * Math.PI * 2]}
          >
            <boxGeometry args={[0.3, 0.5, 0.2]} />
            <meshStandardMaterial
              color={hovered ? "#a78bfa" : color}
              metalness={0.8}
              roughness={0.2}
              emissive={hovered ? color : "black"}
              emissiveIntensity={hovered ? 0.5 : 0}
            />
          </mesh>
        ))}
      </mesh>
    </group>
  )
}

// Floating particles
function Particles() {
  const particlesRef = useRef<Group>(null)
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    position: [MathUtils.randFloatSpread(15), MathUtils.randFloatSpread(15), MathUtils.randFloatSpread(10)] as [
      number,
      number,
      number,
    ],
    scale: MathUtils.randFloat(0.1, 0.5),
    speed: MathUtils.randFloat(0.1, 0.5),
    offset: MathUtils.randFloat(0, Math.PI * 2),
    color: new Color().setHSL(MathUtils.randFloat(0.5, 0.7), 1, 0.5),
  }))

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i]
        particle.position.y = data.position[1] + Math.sin(clock.getElapsedTime() * data.speed + data.offset) * 2
        particle.position.x = data.position[0] + Math.cos(clock.getElapsedTime() * data.speed * 0.5 + data.offset) * 1
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((data, i) => (
        <mesh key={i} position={data.position} scale={data.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

// Main construction scene
function ConstructionScene() {
  const { camera } = useThree()
  const groupRef = useRef<Group>(null)
  const textRef = useRef<Mesh>(null)

  // Camera animation
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2 + 0.5
    }

    // Subtle camera movement
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.8
    camera.position.y = Math.cos(clock.getElapsedTime() * 0.2) * 0.8
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      {/* Main text */}
      <Text
        ref={textRef}
        position={[0, 0.5, 0]}
        fontSize={1.5}
        color="#ffffff"
        font="/fonts/Geist_Bold.json"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
        material-toneMapped={false}
      >
        PAGE UNDER
      </Text>

      <Text
        position={[0, -0.7, 0]}
        fontSize={2}
        color="#8b5cf6"
        font="/fonts/Geist_Bold.json"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        material-toneMapped={false}
      >
        CONSTRUCTION
      </Text>

      {/* Interactive gears */}
      <InteractiveGear position={[-4, 1, -2]} scale={1} rotation={[Math.PI / 2, 0, 0]} color="#6d28d9" speed={0.5} />

      <InteractiveGear position={[4, 1, -2]} scale={1.4} rotation={[Math.PI / 2, 0, 0]} color="#8b5cf6" speed={-0.3} />

      <InteractiveGear position={[0, -3, -1]} scale={0.8} rotation={[Math.PI / 2, 0, 0]} color="#a78bfa" speed={0.7} />

      {/* Floating particles */}
      <Particles />
    </group>
  )
}

export function Construction3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-full"
    >
      <Canvas dpr={[1, 2]} className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Float
          speed={2} // Animation speed
          rotationIntensity={0.3} // XYZ rotation intensity
          floatIntensity={0.5} // Up/down float intensity
        >
          <ConstructionScene />
        </Float>

        <Environment preset="night" />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
          <Vignette darkness={0.7} offset={0.1} />
        </EffectComposer>

        {/* Add orbit controls for interactivity */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />
      </Canvas>
    </motion.div>
  )
}
