import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	TorusKnotGeometry,
	MeshBasicMaterial,
	ShaderMaterial,
	Mesh,
	Vector2,
	Color,
	ShaderVertex,
	ShaderFragment,
	Vector3,
	FrontSide,
	BackSide,
} from 'three'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'


const scene = new Scene()
// scene.background = new Color( 0xF7F8F3 )

const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000 )
// camera.rotation.set(Math.PI / 4, 0, Math.PI / 4)
// camera.position.set(0, -60, 0)

const renderer = new WebGLRenderer({
	alpha: true,
})
renderer.setPixelRatio( window.devicePixelRatio )
// renderer.setClearColor( 0xffffff, 0 )

let setSize = () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize( window.innerWidth, window.innerHeight )
}
window.addEventListener('resize', setSize)
setSize()

document.body.appendChild(renderer.domElement)


let obj = new Mesh(
	new TorusKnotGeometry( 10, 3, 100, 16 ),
	new ShaderMaterial({
		uniforms: {
			time: { value: 1.0 },
			resolution: { value: new Vector2() },
			worldDirection: { value: camera.getWorldDirection(new Vector3()) },
		},
		vertexShader: vertex,
		fragmentShader: fragment,
		wireframe: true,
		side: FrontSide,
	}),

	// new MeshBasicMaterial({
	//     color: 0x0ffff0,
	//     wireframe: true,
	//     fragmentShader: fragment,
	// })
)

scene.add(obj)

camera.position.z = 35


	//obj.rotation.y = Math.PI / 4


function update() {
	requestAnimationFrame(update)
	renderer.render(scene, camera)

	obj.rotation.x += 0.005
	obj.rotation.y += 0.005

	// obj.material.needsUpdate = true
	// obj.material.vertexShader = (new ShaderVertex(vertex)).compute()
	// obj.material.fragmentShader = (new ShaderFragment(fragment)).compute()
	// obj.geometry.computeFaceNormals()
	// obj.geometry.computeVertexNormals()
}
update()
