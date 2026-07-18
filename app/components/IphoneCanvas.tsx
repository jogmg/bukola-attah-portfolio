"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import IphoneModel from "./IphoneModel";

interface IPhoneCanvasProps {
  phoneRef: React.RefObject<THREE.Group | null>;
  screens: string[];
  currentScreenIdx: number;
}

export default function IphoneCanvas({
  phoneRef,
  screens,
  currentScreenIdx,
}: IPhoneCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 4],
        fov: 20,
      }}
    >
      <Suspense fallback={null}>
        <IphoneModel
          modelRef={phoneRef}
          screens={screens}
          currentScreenIdx={currentScreenIdx}
        />
        <Environment preset="night" />
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
      </Suspense>
    </Canvas>
  );
}
