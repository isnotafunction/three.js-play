//to display anything in Three.js we need: scene, camera and renderer:
var scene = new THREE.Scene()
// there are a few different cameras in Three, for now we use PerspectiveCamera
// attributes: field of view (it's in degrees), aspect ratio (should always be width divided by height to avoind squishing)
//and near and far clipping plane
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

//update viewport on resize
window.addEventListener('resize', function(){
  var width = window.innerWidth
  var height = window.innerHeight
  renderer.setSize(width, height)
  //keep the aspect ratio:
  camera.aspect = width/height 
  camera.updateProjectionMatrix()
})

controls = new THREE.OrbitControls(camera, renderer.domElement)

var geometry = new THREE.BoxGeometry(1, 1, 1)//contains all the points and fills of the cube
var cubeMaterials = [
  new THREE.MeshLambertMaterial({ color:0xC399BA, side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({ color:0x9D99C3, side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({ color:0x99B5C3, side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({ color:0x99C3B6, side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({ color:0xC7D0B2, side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({ color:0xD5D27C, side: THREE.DoubleSide}),
]

// var material = new THREE.MeshBasicMaterial({color: 0x00ff00})
var material = new THREE.MeshFaceMaterial(cubeMaterials)
var cube = new THREE.Mesh(geometry, material)//takes geometry and applies material to it

scene.add(cube)//added to coordinates (0,0,0); causes both the camera and the cube
//to be inside each other so we move the camera a bit:
camera.position.z = 5

//light
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6)
scene.add(ambientLight)

var spotLight = new THREE.SpotLight(0xFFFFFF, 0.6)
spotLight.position.set( 100, 1000, 100 ) 
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

scene.add(spotLight)

var pointLight = new THREE.PointLight(0xFF0040, 1, 50)
scene.add(pointLight)


//floor
var floorGeometry = new THREE.CubeGeometry(10, 1, 10)
var floorMaterial = new THREE.MeshLambertMaterial({color: 0x99C3B6, side: THREE.DoubleSide})
var floorCube = new THREE.Mesh(floorGeometry, floorMaterial)
floorCube.position.y = -5
scene.add(floorCube)

//logic

var update = function(){
  cube.rotation.x += 0.007
  cube.rotation.y += 0.007
}

var render = function(){
  renderer.render(scene, camera)
}
//rendering the scene:
function animate(){
  // anything you want to move or change while the app is running has to go through the animate loop
  requestAnimationFrame(animate)
  render()
  update()
}

animate()