var vertexShaderText = [
  "precision mediump float;",
  "",
  "attribute vec3 vertPosition;",
  "attribute vec3 vertColor;",
  "varying vec3 fragColor;",
  "uniform mat4 mWorld;",
  "uniform mat4 mView;",
  "uniform mat4 mProj;",
  "",
  "void main()",
  "{",
  "  fragColor = vertColor;",
  "  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);",
  "}",
].join("\n");

var fragmentShaderText = [
  "precision mediump float;",
  "",
  "varying vec3 fragColor;",
  "void main()",
  "{",
  "gl_FragColor = vec4(fragColor, 1.0);",
  "}",
].join("\n");

window.onload = function () {
  // Importing the canvas
  var canvas = document.getElementById("canvas");

  // Importing WebGL for different browsers
  var gl =
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl") ||
    canvas.getContext("moz-webgl") ||
    canvas.getContext("webkit-3d");

  if (gl) {
    // Setting the viewport
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_COLOR_BIT);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    //Shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);

    const cube = {
      top: {
        UpperLeft: {
          position: {
            x: -1.0,
            y: 1.0,
            z: -1.0,
          },
          color: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
          },
        },
        UpperRight: {
          position: {
            x: -1.0,
            y: 1.0,
            z: 1.0,
          },
          color: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
          },
        },
        LowerLeft: {
          position: {
            x: 1.0,
            y: 1.0,
            z: 1.0,
          },
          color: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
          },
        },
        LowerRight: {
          position: {
            x: 1.0,
            y: 1.0,
            z: -1.0,
          },
          color: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
          },
        },
        indices: [0, 1, 2, 0, 2, 3],
      },
      left: {
        UpperLeft: {
          position: {
            x: -1.0,
            y: 1.0,
            z: 1.0,
          },
          color: {
            r: 0.75,
            g: 0.75,
            b: 0.75,
          },
        },
        UpperRight: {
          position: {
            x: -1.0,
            y: -1.0,
            z: 1.0,
          },
          color: {
            r: 0.75,
            g: 0.75,
            b: 0.75,
          },
        },
        LowerLeft: {
          position: {
            x: -1.0,
            y: -1.0,
            z: -1.0,
          },
          color: {
            r: 0.75,
            g: 0.75,
            b: 0.75,
          },
        },
        LowerRight: {
          position: {
            x: -1.0,
            y: 1.0,
            z: -1.0,
          },
          color: {
            r: 0.75,
            g: 0.75,
            b: 0.75,
          },
        },
        indices: [5, 4, 6, 6, 4, 7],
      },
      right: {
        UpperLeft: {
          position: {
            x: 1.0,
            y: 1.0,
            z: 1.0,
          },
          color: {
            r: 0.25,
            g: 0.25,
            b: 0.75,
          },
        },
        UpperRight: {
          position: {
            x: 1.0,
            y: -1.0,
            z: 1.0,
          },
          color: {
            r: 0.25,
            g: 0.25,
            b: 0.75,
          },
        },
        LowerLeft: {
          position: {
            x: 1.0,
            y: -1.0,
            z: -1.0,
          },
          color: {
            r: 0.25,
            g: 0.25,
            b: 0.75,
          },
        },
        LowerRight: {
          position: {
            x: 1.0,
            y: 1.0,
            z: -1.0,
          },
          color: {
            r: 0.25,
            g: 0.25,
            b: 0.75,
          },
        },
        indices: [8, 9, 10, 8, 10, 11],
      },
      front: {
        UpperLeft: {
          position: {
            x: 1.0,
            y: 1.0,
            z: 1.0,
          },
          color: {
            r: 1.0,
            g: 0.0,
            b: 0.15,
          },
        },
        UpperRight: {
          position: {
            x: 1.0,
            y: -1.0,
            z: 1.0,
          },
          color: {
            r: 1.0,
            g: 0.0,
            b: 0.15,
          },
        },
        LowerLeft: {
          position: {
            x: -1.0,
            y: -1.0,
            z: 1.0,
          },
          color: {
            r: 1.0,
            g: 0.0,
            b: 0.15,
          },
        },
        LowerRight: {
          position: {
            x: -1.0,
            y: 1.0,
            z: 1.0,
          },
          color: {
            r: 1.0,
            g: 0.0,
            b: 0.15,
          },
        },
        indices: [13, 12, 14, 15, 14, 12],
      },
      back: {
        UpperLeft: {
          position: {
            x: 1.0,
            y: 1.0,
            z: -1.0,
          },
          color: {
            r: 1.0,
            g: 0.0,
            b: 0.0,
          },
        },
        UpperRight: {
          position: {
            x: 1.0,
            y: -1.0,
            z: -1.0,
          },
          color: {
            r: 1.0,
            g: 0.0,
            b: 0.0,
          },
        },
        LowerLeft: {
          position: {
            x: -1.0,
            y: -1.0,
            z: -1.0,
          },
          color: {
            r: 1.0,
            g: 0.0,
            b: 0.0,
          },
        },
        LowerRight: {
          position: {
            x: -1.0,
            y: 1.0,
            z: -1.0,
          },
          color: {
            r: 1.0,
            g: 0.0,
            b: 0.0,
          },
        },
        indices: [16, 17, 18, 16, 18, 19],
      },
      bottom: {
        UpperLeft: {
          position: {
            x: -1.0,
            y: -1.0,
            z: -1.0,
          },
          color: {
            r: 0.5,
            g: 0.5,
            b: 1.0,
          },
        },
        UpperRight: {
          position: {
            x: -1.0,
            y: -1.0,
            z: 1.0,
          },
          color: {
            r: 0.5,
            g: 0.5,
            b: 1.0,
          },
        },
        LowerLeft: {
          position: {
            x: 1.0,
            y: -1.0,
            z: 1.0,
          },
          color: {
            r: 0.5,
            g: 0.5,
            b: 1.0,
          },
        },
        LowerRight: {
          position: {
            x: 1.0,
            y: -1.0,
            z: -1.0,
          },
          color: {
            r: 0.5,
            g: 0.5,
            b: 1.0,
          },
        },
        indices: [21, 20, 22, 22, 20, 23],
      },
    };

    const faces = [
      cube.top,
      cube.left,
      cube.right,
      cube.front,
      cube.back,
      cube.bottom,
    ];

    const buildBoxVerticies = (facesArray) => {
      const verticies = [];
      for (const [key, face] of Object.entries(facesArray)) {
        for (const [key, vertex] of Object.entries(face)) {
          key !== "indices" &&
            verticies.push(
              vertex.position.x,
              vertex.position.y,
              vertex.position.z,
              vertex.color.r,
              vertex.color.g,
              vertex.color.b
            );
        }
      }

      return verticies;
    };

    const buildBoxIndicies = (facesArray) => {
      const indicies = [];
      for (const [key, face] of Object.entries(facesArray)) {
        for (const [key, index] of Object.entries(face)) {
          key === "indices" && indicies.push(...index);
        }
      }
      return indicies;
    };

    var boxVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(buildBoxVerticies(faces)),
      gl.STATIC_DRAW
    );

    var boxIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(buildBoxIndicies(faces)),
      gl.STATIC_DRAW
    );

    var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    var colorAttribLocation = gl.getAttribLocation(program, "vertColor");

    gl.vertexAttribPointer(
      positionAttribLocation,
      3,
      gl.FLOAT,
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.vertexAttribPointer(
      colorAttribLocation,
      3,
      gl.FLOAT,
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
    var matViewUniformLocation = gl.getUniformLocation(program, "mView");
    var matProjUniformLocation = gl.getUniformLocation(program, "mProj");

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);

    mat4.identity(worldMatrix);
    // We set the coordinates the camera is looking at
    mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(
      projMatrix,
      glMatrix.toRadian(45),
      canvas.width / canvas.height,
      0.1,
      1000.0
    );

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    // Render and cube rotation

    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);

    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);

    var angle = 0;

    var loop = function () {
      angle = (performance.now() / 1000 / 6) * 2 * Math.PI;
      mat4.rotate(yRotationMatrix, identityMatrix, angle, [1, 1, 0]);
      mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
      mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
      gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

      gl.clearColor(0, 0, 0, 1.0);
      gl.clear(gl.DEPTH_BUFFER_BIT);

      gl.drawElements(
        gl.TRIANGLES,
        buildBoxIndicies(faces).length,
        gl.UNSIGNED_SHORT,
        0
      );

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  } else {
    console.error("WebGL not supported");
  }
};
