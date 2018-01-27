import * as THREE from "three";

class FirstPersonControls {
  constructor(object, domElement) {
    this.object = object;
    this.target = new THREE.Vector3(0, 0, 0);

    this.domElement = domElement !== undefined ? domElement : document;

    this.enabled = true;

    this.movementSpeed = 10.0;
    this.lookSpeed = 100.0;

    this.lookVertical = false;
    this.autoForward = false;

    this.activeLook = true;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0.0;
    this.heightMax = 1.0;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.autoSpeedFactor = 0.0;

    this.rotationX = 0;
    this.rotationY = 0;

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.viewHalfX = 0;
    this.viewHalfY = 0;

    this.border = {
      x: {
        p: 27,
        n: -27
      },
      y: {
        p: 10,
        n: 0.5
      },
      z: {
        p: 27,
        n: -27
      }
    };
    if (this.domElement !== document) {
      this.domElement.setAttribute("tabindex", -1);
    }

    this.handleResize = function() {
      if (this.domElement === document) {
        this.viewHalfX = window.innerWidth / 2;
        this.viewHalfY = window.innerHeight / 2;
      } else {
        this.viewHalfX = this.domElement.offsetWidth / 2;
        this.viewHalfY = this.domElement.offsetHeight / 2;
      }
    };

    this.onKeyDown = function(event) {
      //event.preventDefault();
      switch (event.keyCode) {
        case 38: /*up*/
        case 87:
          /*W*/ this.moveForward = true;
          break;

        case 37: /*left*/
        case 65:
          /*A*/ this.rotationX = -1;
          break;

        case 40: /*down*/
        case 83:
          /*S*/ this.moveBackward = true;
          break;

        case 39: /*right*/
        case 68:
          /*D*/ this.rotationX = 1;
          break;

        case 82:
          /*R*/ this.moveUp = true;
          break;
        case 70:
          /*F*/ this.moveDown = true;
          break;
      }
    };

    this.onKeyUp = function(event) {
      switch (event.keyCode) {
        case 38: /*up*/
        case 87:
          /*W*/ this.moveForward = false;
          break;

        case 37: /*left*/
        case 65:
          /*A*/ this.rotationX = 0;
          break;

        case 40: /*down*/
        case 83:
          /*S*/ this.moveBackward = false;
          break;

        case 39: /*right*/
        case 68:
          /*D*/ this.rotationX = 0;
          break;

        case 82:
          /*R*/ this.moveUp = false;
          break;
        case 70:
          /*F*/ this.moveDown = false;
          break;
      }
    };

    this.checkBorders = () => {
      const checkSpecificBorder = (pos, border) => {
        if (pos >= border.p) {
          return border.p;
        }
        if (pos <= border.n) {
          return border.n;
        }
        return pos;
      };
      this.object.position.x = checkSpecificBorder(this.object.position.x, this.border.x);
      this.object.position.y = checkSpecificBorder(this.object.position.y, this.border.y);
      this.object.position.z = checkSpecificBorder(this.object.position.z, this.border.z);
    };

    this.update = function(delta) {
      if (this.enabled === false) return;
      /*
      if (this.heightSpeed) {
        var y = THREE.Math.clamp(this.object.position.y, this.heightMin, this.heightMax);
        var heightDelta = y - this.heightMin;

        this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
      } else {
        this.autoSpeedFactor = 0.0;
      }
*/
      var actualMoveSpeed = delta * this.movementSpeed;

      if (this.moveForward || (this.autoForward && !this.moveBackward)) {
        this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
      }
      if (this.moveBackward) this.object.translateZ(actualMoveSpeed);
      if (this.moveUp) this.object.translateY(actualMoveSpeed);
      if (this.moveDown) this.object.translateY(-actualMoveSpeed);

      this.checkBorders();

      var actualLookSpeed = delta * this.lookSpeed;

      if (!this.activeLook) {
        actualLookSpeed = 0;
      }

      var verticalLookRatio = 1;

      if (this.constrainVertical) {
        verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
      }

      this.lon += this.rotationX * actualLookSpeed;

      if (this.lookVertical) this.lat -= this.rotationY * actualLookSpeed * verticalLookRatio;

      this.lat = Math.max(-85, Math.min(85, this.lat));
      this.phi = THREE.Math.degToRad(90 - this.lat);

      this.theta = THREE.Math.degToRad(this.lon);

      if (this.constrainVertical) {
        this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);
      }

      var targetPosition = this.target,
        position = this.object.position;
      targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
      targetPosition.y = position.y + 100 * Math.cos(this.phi);
      targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
      this.object.lookAt(targetPosition);
    };

    function contextmenu(event) {
      event.preventDefault();
    }

    this.dispose = function() {
      this.domElement.removeEventListener("contextmenu", contextmenu, false);

      window.removeEventListener("keydown", _onKeyDown, false);
      window.removeEventListener("keyup", _onKeyUp, false);
    };

    var _onKeyDown = bind(this, this.onKeyDown);
    var _onKeyUp = bind(this, this.onKeyUp);

    this.domElement.addEventListener("contextmenu", contextmenu, false);

    window.addEventListener("keydown", _onKeyDown, false);
    window.addEventListener("keyup", _onKeyUp, false);

    function bind(scope, fn) {
      return function() {
        fn.apply(scope, arguments);
      };
    }

    this.handleResize();
  }
}

export default FirstPersonControls;
