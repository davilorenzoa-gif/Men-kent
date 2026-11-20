import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  LineSegments,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three'

export type Obstacle = { cx: number; cy: number; a: number; b: number }

type Props = {
  /** Car silhouette as an ellipse, in CSS px relative to the canvas. Read every frame. */
  getObstacle: () => Obstacle | null
  /** 0..1, fades the smoke in after the intro. */
  intensity: { current: number }
  /** Extra flow speed (scroll velocity), 0 = still air. */
  boost: { current: number }
  className?: string
}

/**
 * Wind-tunnel smoke lines over the hero photo.
 * Each particle follows a potential-flow field around the car (an ellipse) and around the pointer
 * (a small cylinder), leaving a short additive trail. Depth (z) gives a parallax layer on mouse move.
 */
export function WindTunnel({ getObstacle, intensity, boost, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const small = window.matchMedia('(max-width: 767px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return // No WebGL: the photo stands on its own.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)

    const N = reduced ? 140 : small ? 320 : 820
    const T = small ? 16 : 26
    const RAKES = small ? 22 : 38
    const SEG = T - 1

    const scene = new Scene()
    const camera = new OrthographicCamera(0, 1, 0, 1, -10, 10)

    const pos = new Float32Array(N * SEG * 2 * 3)
    const alpha = new Float32Array(N * SEG * 2)
    const color = new Float32Array(N * SEG * 2 * 3)
    const geo = new BufferGeometry()
    const posAttr = new BufferAttribute(pos, 3).setUsage(DynamicDrawUsage)
    const alphaAttr = new BufferAttribute(alpha, 1).setUsage(DynamicDrawUsage)
    geo.setAttribute('position', posAttr)
    geo.setAttribute('alpha', alphaAttr)
    geo.setAttribute('color', new BufferAttribute(color, 3))

    const mat = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute float alpha;
        attribute vec3 color;
        varying float vA;
        varying vec3 vC;
        void main() {
          vA = alpha;
          vC = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        varying vec3 vC;
        void main() { gl_FragColor = vec4(vC * vA, vA); }`,
    })
    const lines = new LineSegments(geo, mat)
    lines.frustumCulled = false
    scene.add(lines)

    // Particle state
    const px = new Float32Array(N)
    const py = new Float32Array(N)
    const pz = new Float32Array(N)
    const seed = new Float32Array(N)
    const trail = new Float32Array(N * T * 2)
    let W = 1
    let H = 1
    let colorDirty = true

    const spawn = (i: number, anywhere: boolean) => {
      const o = getObstacle()
      const cy = o ? o.cy : H * 0.55
      const spread = o ? o.b * 1.75 : H * 0.4
      // Most particles ride a smoke rake: evenly spaced emitters, so particles on the same
      // rake trace one continuous streamline, as in a real tunnel. A few wander freely.
      let y: number
      if (i % 5 !== 0) {
        const k = i % RAKES
        y = cy - spread + ((k + 0.5) / RAKES) * spread * 2 + (Math.random() - 0.5) * 1.2
      } else {
        y = Math.random() * H
      }
      const x = anywhere ? Math.random() * W : -20 - Math.random() * W * 0.25
      px[i] = x
      py[i] = Math.min(H + 10, Math.max(-10, y))
      pz[i] = Math.random() * 2 - 1
      seed[i] = Math.random() * 1000
      for (let k = 0; k < T; k++) {
        trail[(i * T + k) * 2] = px[i]
        trail[(i * T + k) * 2 + 1] = py[i]
      }
      colorDirty = true
      const red = Math.random() < 0.07
      for (let s = 0; s < SEG * 2; s++) {
        const c = (i * SEG * 2 + s) * 3
        color[c] = red ? 0.92 : 0.95
        color[c + 1] = red ? 0.12 : 0.95
        color[c + 2] = red ? 0.16 : 0.93
      }
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      W = Math.max(1, r.width)
      H = Math.max(1, r.height)
      renderer.setSize(W, H, false)
      camera.right = W
      camera.bottom = H
      camera.updateProjectionMatrix()
    }
    resize()
    for (let i = 0; i < N; i++) spawn(i, true)

    const pointer = { x: -9999, y: -9999, nx: 0, ny: 0, on: false, sx: 0, sy: 0 }
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.on = pointer.y > 0 && pointer.y < r.height
      pointer.nx = (e.clientX / window.innerWidth) * 2 - 1
      pointer.ny = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onLeave = () => {
      pointer.on = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let visible = true
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting
    })
    io.observe(canvas)

    let raf = 0
    let last = performance.now()
    let time = 0
    const PR = small ? 70 : 110 // pointer obstacle radius

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) {
        last = now
        return
      }
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      time += dt
      const fade = intensity.current
      if (fade <= 0.001) {
        renderer.clear()
        return
      }
      const o = getObstacle()
      const U = (small ? 150 : 210) * (1 + Math.min(3, boost.current))
      // Pointer parallax eased
      pointer.sx += (pointer.nx - pointer.sx) * 0.05
      pointer.sy += (pointer.ny - pointer.sy) * 0.05

      for (let i = 0; i < N; i++) {
        let x = px[i]!
        let y = py[i]!
        // 2 sub-steps keep the flow stable close to the body.
        for (let step = 0; step < 2; step++) {
          let vx = U
          let vy = 0
          if (o) {
            let u = (x - o.cx) / o.a
            let v = (y - o.cy) / o.b
            let r2 = u * u + v * v
            if (r2 < 1) {
              const k = 1.001 / Math.sqrt(r2 || 0.0001)
              u *= k
              v *= k
              x = o.cx + u * o.a
              y = o.cy + v * o.b
              r2 = 1.002
            }
            const r4 = r2 * r2
            vx = U * (1 - (u * u - v * v) / r4)
            vy = U * (o.b / o.a) * ((-2 * u * v) / r4)
            // Wake: a little turbulence once the air has passed the car
            if (u > 0.6) {
              const w = Math.min(1, (u - 0.6) * 0.8) * Math.exp(-v * v * 0.6)
              vy += Math.sin(x * 0.018 + time * 3 + seed[i]!) * U * 0.22 * w
            }
          }
          if (pointer.on) {
            let u = (x - pointer.x) / PR
            let v = (y - pointer.y) / PR
            let r2 = u * u + v * v
            if (r2 < 1) {
              const k = 1.001 / Math.sqrt(r2 || 0.0001)
              u *= k
              v *= k
              x = pointer.x + u * PR
              y = pointer.y + v * PR
              r2 = 1.002
            }
            if (r2 < 25) {
              const r4 = r2 * r2
              vx += U * (-(u * u - v * v) / r4)
              vy += U * ((-2 * u * v) / r4)
            }
          }
          vx = Math.max(vx, U * 0.12) // never stall at the stagnation point
          const depthSpeed = 0.75 + (pz[i]! + 1) * 0.2
          x += vx * depthSpeed * dt * 0.5
          y += vy * depthSpeed * dt * 0.5
        }
        px[i] = x
        py[i] = y
        if (x > W + 30 || y < -60 || y > H + 60) {
          spawn(i, false)
          continue
        }
        // shift trail
        const base = i * T * 2
        trail.copyWithin(base + 2, base, base + (T - 1) * 2)
        trail[base] = x
        trail[base + 1] = y
      }

      // Build segments
      for (let i = 0; i < N; i++) {
        const z = pz[i]!
        const ox = z * pointer.sx * 16
        const oy = z * pointer.sy * 10
        const depthA = 0.35 + (z + 1) * 0.32
        const base = i * T * 2
        for (let k = 0; k < SEG; k++) {
          const a0 = (1 - k / SEG) * depthA * fade
          const a1 = (1 - (k + 1) / SEG) * depthA * fade
          const s = (i * SEG + k) * 2
          const p = s * 3
          pos[p] = trail[base + k * 2]! + ox
          pos[p + 1] = trail[base + k * 2 + 1]! + oy
          pos[p + 2] = 0
          pos[p + 3] = trail[base + (k + 1) * 2]! + ox
          pos[p + 4] = trail[base + (k + 1) * 2 + 1]! + oy
          pos[p + 5] = 0
          // edge fade so lines never pop at the borders
          const ex = Math.min(1, Math.max(0, pos[p]! / (W * 0.12)))
          alpha[s] = a0 * 0.5 * ex
          alpha[s + 1] = a1 * 0.5 * ex
        }
      }
      posAttr.needsUpdate = true
      alphaAttr.needsUpdate = true
      if (colorDirty) {
        ;(geo.getAttribute('color') as BufferAttribute).needsUpdate = true
        colorDirty = false
      }
      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [getObstacle, intensity, boost])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
