import * as THREE from 'three'

class FirstPersonControls {
  constructor(camera, domElement) {
    this.camera = camera
    this.domElement = domElement || document

    this.enabled = true
    this.movementSpeed = 10.0
    this.lookSpeed = 0.005

    this.lookVertical = true
    this.autoForward = false
    this.activeLook = true

    this.heightSpeed = false
    this.heightCoef = 1.0
    this.heightMin = 0.0
    this.heightMax = 1.0

    this.constrainVertical = false
    this.verticalMin = 0
    this.verticalMax = Math.PI

    this.mouseX = 0
    this.mouseY = 0

    this.lat = 0
    this.lon = 0
    this.phi = 0
    this.theta = 0

    this.moveForward = false
    this.moveBackward = false
    this.moveLeft = false
    this.moveRight = false
    this.moveUp = false
    this.moveDown = false

    this.mouseDragOn = false

    this.viewHalfX = 0
    this.viewHalfY = 0

    // Boundaries
    this.boundaries = {
      x: { min: -27, max: 27 },
      y: { min: 0.5, max: 10 },
      z: { min: -27, max: 27 }
    }

    if (this.domElement !== document) {
      this.domElement.setAttribute('tabindex', -1)
    }

    this.handleResize()
    this.bindEvents()
  }

  bindEvents() {
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.handleResize = this.handleResize.bind(this)

    this.domElement.addEventListener('contextmenu', this.contextMenu, false)
    this.domElement.addEventListener('mousedown', this.onMouseDown, false)
    this.domElement.addEventListener('mousemove', this.onMouseMove, false)
    this.domElement.addEventListener('mouseup', this.onMouseUp, false)

    window.addEventListener('keydown', this.onKeyDown, false)
    window.addEventListener('keyup', this.onKeyUp, false)
    window.addEventListener('resize', this.handleResize, false)
  }

  handleResize() {
    if (this.domElement === document) {
      this.viewHalfX = window.innerWidth / 2
      this.viewHalfY = window.innerHeight / 2
    } else {
      this.viewHalfX = this.domElement.offsetWidth / 2
      this.viewHalfY = this.domElement.offsetHeight / 2
    }
  }

  onMouseDown(event) {
    if (this.domElement !== document) {
      this.domElement.focus()
    }

    event.preventDefault()
    event.stopPropagation()

    if (this.activeLook) {
      switch (event.button) {
        case 0:
          this.moveForward = this.autoForward ? false : true
          break
        case 2:
          this.moveBackward = true
          break
      }
    }

    this.mouseDragOn = true
  }

  onMouseUp(event) {
    event.preventDefault()
    event.stopPropagation()

    if (this.activeLook) {
      switch (event.button) {
        case 0:
          this.moveForward = this.autoForward ? true : false
          break
        case 2:
          this.moveBackward = false
          break
      }
    }

    this.mouseDragOn = false
  }

  onMouseMove(event) {
    if (this.domElement === document) {
      this.mouseX = event.pageX - this.viewHalfX
      this.mouseY = event.pageY - this.viewHalfY
    } else {
      this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX
      this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY
    }
  }

  onKeyDown(event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = true
        break

      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = true
        break

      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = true
        break

      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = true
        break

      case 'KeyR':
        this.moveUp = true
        break

      case 'KeyF':
        this.moveDown = true
        break
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = false
        break

      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = false
        break

      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = false
        break

      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = false
        break

      case 'KeyR':
        this.moveUp = false
        break

      case 'KeyF':
        this.moveDown = false
        break
    }
  }

  contextMenu(event) {
    event.preventDefault()
  }

  update(delta) {
    if (this.enabled === false) return

    if (this.heightSpeed) {
      const y = THREE.MathUtils.clamp(this.camera.position.y, this.heightMin, this.heightMax)
      const heightDelta = y - this.heightMin
      this.autoSpeedFactor = delta * (heightDelta * this.heightCoef)
    } else {
      this.autoSpeedFactor = 0.0
    }

    const actualMoveSpeed = delta * this.movementSpeed

    if (this.moveForward || (this.autoForward && !this.moveBackward)) {
      this.camera.translateZ(-(actualMoveSpeed + this.autoSpeedFactor))
    }
    if (this.moveBackward) this.camera.translateZ(actualMoveSpeed)

    if (this.moveLeft) this.camera.translateX(-actualMoveSpeed)
    if (this.moveRight) this.camera.translateX(actualMoveSpeed)

    if (this.moveUp) this.camera.translateY(actualMoveSpeed)
    if (this.moveDown) this.camera.translateY(-actualMoveSpeed)

    // Apply boundaries
    this.camera.position.x = THREE.MathUtils.clamp(
      this.camera.position.x,
      this.boundaries.x.min,
      this.boundaries.x.max
    )
    this.camera.position.y = THREE.MathUtils.clamp(
      this.camera.position.y,
      this.boundaries.y.min,
      this.boundaries.y.max
    )
    this.camera.position.z = THREE.MathUtils.clamp(
      this.camera.position.z,
      this.boundaries.z.min,
      this.boundaries.z.max
    )

    let actualLookSpeed = delta * this.lookSpeed

    if (!this.activeLook) {
      actualLookSpeed = 0
    }

    let verticalLookRatio = 1

    if (this.constrainVertical) {
      verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin)
    }

    this.lon -= this.mouseX * actualLookSpeed
    if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio

    this.lat = Math.max(-85, Math.min(85, this.lat))

    this.phi = THREE.MathUtils.degToRad(90 - this.lat)
    this.theta = THREE.MathUtils.degToRad(this.lon)

    if (this.constrainVertical) {
      this.phi = THREE.MathUtils.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax)
    }

    const targetPosition = new THREE.Vector3()
    targetPosition.x = this.camera.position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta)
    targetPosition.y = this.camera.position.y + 100 * Math.cos(this.phi)
    targetPosition.z = this.camera.position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)

    this.camera.lookAt(targetPosition)
  }

  dispose() {
    this.domElement.removeEventListener('contextmenu', this.contextMenu, false)
    this.domElement.removeEventListener('mousedown', this.onMouseDown, false)
    this.domElement.removeEventListener('mousemove', this.onMouseMove, false)
    this.domElement.removeEventListener('mouseup', this.onMouseUp, false)

    window.removeEventListener('keydown', this.onKeyDown, false)
    window.removeEventListener('keyup', this.onKeyUp, false)
    window.removeEventListener('resize', this.handleResize, false)
  }
}

export default FirstPersonControls