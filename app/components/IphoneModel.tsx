"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";

interface IPhoneModelProps {
  modelRef: React.RefObject<THREE.Group | null>;
  screens: string[];
  currentScreenIdx: number;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IphoneModel({
  modelRef,
  screens,
  currentScreenIdx,
}: IPhoneModelProps) {
  const { scene } = useGLTF("/models/12_pro_black.glb");

  const textures = useTexture(screens);

  textures.forEach((texture) => {
    texture.flipY = false;

    if (texture.image) {
      const img = texture.image as HTMLImageElement;
      // 1. Define aspect ratios
      const screenAspect = 1170 / 2532; // iPhone 12 Pro screen ratio (width / height)
      const imageAspect = img.width / img.height;

      // 2. Adjust scale and offset to prevent stretching (object-fit: cover)
      if (imageAspect > screenAspect) {
        // The image is wider than the screen (crop the sides)
        texture.repeat.set(screenAspect / imageAspect, 1);
        texture.offset.set((1 - texture.repeat.x) / 2, 0);
      } else {
        // The image is taller than the screen (crop the top/bottom)
        texture.repeat.set(1, imageAspect / screenAspect);
        texture.offset.set(0, (1 - texture.repeat.y) / 2);
      }
    }
  });

  const screenMesh = useMemo<THREE.Mesh | null>(() => {
    let mesh: THREE.Mesh | null = null;

    scene.traverse((child) => {
      if (child.name === "Screen") {
        mesh = child as THREE.Mesh;
      }

      // Hide the apple logo mesh
      if (child.name === "Apple_Logo008") {
        child.visible = false;
      }
    });

    return mesh;
  }, [scene]);

  useEffect(() => {
    if (!screenMesh) return;

    const material = screenMesh.material as THREE.MeshStandardMaterial;
    material.map = null;
    material.color.setHex(0x000000);
    material.emissiveMap = textures[currentScreenIdx];
    material.emissive.setHex(0xffffff);
    material.emissiveIntensity = 1;
    material.needsUpdate = true;
  }, [textures, currentScreenIdx, screenMesh]);

  useEffect(() => {
    if (!modelRef.current) return;

    const anim = gsap.fromTo(
      modelRef.current.rotation,
      { y: Math.PI * 2, x: Math.PI * 0.02 },
      {
        y: Math.PI * 3,
        x: Math.PI * 0.05,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#before-after-section",
          start: "top 60%",
          end: "center center",
          scrub: 1,
        },
      },
    );

    const anim2 = gsap.to(modelRef.current.rotation, {
      y: Math.PI * 5,
      x: Math.PI * 0.05,
      ease: "power1.inOut",
      immediateRender: false, // CRITICAL: Forces GSAP to calculate start values ONLY when this triggers
      scrollTrigger: {
        trigger: "#strategy-section",
        start: "top 60%",
        end: "center center",
        scrub: 1,
      },
    });

    return () => {
      anim.kill();
      anim2.kill();
    };
  }, [modelRef]);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);

    const center = box.getCenter(new THREE.Vector3());

    scene.position.sub(center);
  }, [scene]);

  return (
    <group ref={modelRef} scale={1.5} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/12_pro_black.glb");
useTexture.preload("/images/bukola.webp");
