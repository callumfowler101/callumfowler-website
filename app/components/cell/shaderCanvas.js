import { useEffect, useRef } from 'react'
import { aboutShaders } from './shaders'

const compile = (gl, type, src) => {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s))
  }
  return s
}

export default function ShaderCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cvs = canvasRef.current
    const gl = cvs.getContext('webgl')

    const program = gl.createProgram()
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, aboutShaders.vert))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, aboutShaders.frag))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program))
    }
    gl.useProgram(program)

    // One oversized triangle that covers the whole clip space (-1..1)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )
    const loc = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uResolution')
    const uTime = gl.getUniformLocation(program, 'uTime')

    let raf
    const render = (t) => {
      // keep the drawing buffer matched to the displayed size
      const dpr = window.devicePixelRatio || 1
      const w = Math.floor(cvs.clientWidth * dpr)
      const h = Math.floor(cvs.clientHeight * dpr)
      if (cvs.width !== w || cvs.height !== h) {
        cvs.width = w
        cvs.height = h
      }
      gl.viewport(0, 0, w, h)

      gl.uniform2f(uRes, w, h)
      gl.uniform1f(uTime, t * 0.001)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none', // clicks pass through to the content underneath
        zIndex: 1,
      }}
    />
  )
}
