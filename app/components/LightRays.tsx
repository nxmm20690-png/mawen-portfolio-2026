"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

type LightRaysProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
};

const vertex = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uSpread;
uniform float uLength;
uniform float uNoise;
uniform float uDistortion;
uniform vec2 uAnchor;
uniform vec2 uDir;
uniform float uMouseInfluence;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec2 pixel = vUv * uResolution;
  vec2 dir = normalize(uDir + (uMouse - 0.5) * uMouseInfluence);
  vec2 rel = pixel - uAnchor;
  float along = dot(rel, dir);
  float side = length(rel - dir * along);
  float spread = max(uSpread * uResolution.y, 1.0);
  float ray = smoothstep(spread, 0.0, side);
  float reach = smoothstep(uResolution.y * uLength, 0.0, along);
  float bands = sin(side * 0.035 + along * 0.018 - uTime * uSpeed * 1.8);
  float grain = noise(pixel * 0.008 + uTime * 0.16);
  float wave = sin((pixel.x + pixel.y) * 0.01 + uTime * 1.2) * uDistortion;
  float intensity = ray * reach * (0.45 + 0.55 * bands) + grain * uNoise + wave;
  intensity = clamp(intensity, 0.0, 1.0);
  gl_FragColor = vec4(uColor, intensity * 0.95);
}
`;

function hexToRgb(hex: string) {
  const value = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return value
    ? [parseInt(value[1], 16) / 255, parseInt(value[2], 16) / 255, parseInt(value[3], 16) / 255]
    : [1, 1, 1];
}

function getAnchorAndDir(origin: RaysOrigin, width: number, height: number) {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * height], dir: [0.35, 1] };
    case "top-right":
      return { anchor: [width, -outside * height], dir: [-0.35, 1] };
    case "left":
      return { anchor: [-outside * width, height * 0.5], dir: [1, 0] };
    case "right":
      return { anchor: [width * (1 + outside), height * 0.5], dir: [-1, 0] };
    case "bottom-center":
      return { anchor: [width * 0.5, height * (1 + outside)], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [width, height * (1 + outside)], dir: [-0.2, -1] };
    case "bottom-left":
      return { anchor: [0, height * (1 + outside)], dir: [0.2, -1] };
    default:
      return { anchor: [width * 0.5, -outside * height], dir: [0, 1] };
  }
}

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#f2eee7",
  raysSpeed = 0.8,
  lightSpread = 0.55,
  rayLength = 1.22,
  followMouse = true,
  mouseInfluence = 0.16,
  noiseAmount = 0.06,
  distortion = 0.025,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const uniforms = {
      uResolution: { value: [1, 1] },
      uTime: { value: 0 },
      uMouse: { value: [0.5, 0.5] },
      uColor: { value: hexToRgb(raysColor) },
      uSpeed: { value: raysSpeed },
      uSpread: { value: lightSpread },
      uLength: { value: rayLength },
      uNoise: { value: noiseAmount },
      uDistortion: { value: distortion },
      uAnchor: { value: [0, 0] },
      uDir: { value: [0, 1] },
      uMouseInfluence: { value: followMouse ? mouseInfluence : 0 },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex, fragment, uniforms, transparent: true, depthTest: false });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height);
      uniforms.uResolution.value = [width, height];
      const { anchor, dir } = getAnchorAndDir(raysOrigin, width, height);
      uniforms.uAnchor.value = anchor;
      uniforms.uDir.value = dir;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.uMouse.value = [
        (event.clientX - rect.left) / Math.max(rect.width, 1),
        1 - (event.clientY - rect.top) / Math.max(rect.height, 1),
      ];
    };

    let frame = 0;
    const render = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [distortion, followMouse, lightSpread, mouseInfluence, noiseAmount, rayLength, raysColor, raysOrigin, raysSpeed]);

  return <div className={`light-rays ${className}`} ref={containerRef} />;
}
