const aboutShaders = {
  vert: `
		attribute vec2 aPosition;
		void main() {
			gl_Position = vec4(aPosition, 0.0, 1.0);
		}
	`,
  frag: `
		precision mediump float;

		uniform vec2 uResolution;
		uniform float uTime;

		void main() {
			vec2 uv = gl_FragCoord.xy / uResolution;   // 0..1 across the canvas
			vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0.0, 2.0, 4.0));
			gl_FragColor = vec4(col, 1.0);
		}
	`,
}

export { aboutShaders }
