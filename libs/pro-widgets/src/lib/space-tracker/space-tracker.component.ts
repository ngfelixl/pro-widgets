import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnChanges,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  Scene,
  WebGLRenderer,
  AmbientLight,
  Mesh,
  Geometry,
  Line,
  Vector3,
  OrbitControls,
  SphereGeometry,
  CircleGeometry,
  OrthographicCamera,
  MeshPhysicalMaterial,
  PointLight,
  PCFSoftShadowMap,
  Color,
  ConeGeometry,
  TorusGeometry,
  MeshLambertMaterial
} from 'three-full';
import {
  interval,
  animationFrameScheduler,
  Subscription,
  Observable
} from 'rxjs';
import { map, share, tap, scan } from 'rxjs/operators';

interface SceneAssets {
  ambientLight?: AmbientLight;
  pointLight?: PointLight;
  sphere?: Mesh;
  ticks?: Mesh[];
  floor?: Mesh;
  crosshair?: Mesh[];
}

@Component({
  selector: 'pro-space-tracker',
  templateUrl: `./space-tracker.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./space-tracker.component.scss']
})
export class SpaceTrackerComponent
  implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('canvas')
  private canvasRef: any;
  private htmlCanvas: HTMLCanvasElement;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private controls: OrbitControls;
  private camera: OrthographicCamera;
  private entities: { [id: string]: [Geometry, Line, Mesh] } = {};
  private subscriptions = new Subscription();
  private assets: SceneAssets = {};
  private defaultWidth = 400;
  private viewReady = false;
  @Input() private value: { [id: string]: number[] };
  @Input() private interpolationRate = 0.05;
  @Input() private backgroundColor = 'rgba(255, 0, 255, 0)';
  @Input() private trackerColor = 'red';
  @Input() private trackerRadius = 0.2;
  @Input() private sphereOpacity = 0.1;
  @Input() private sphereColor = '#ff0000';
  @Input() private ambientLightColor = '#ff0000';
  @Input() private ambientLightIntensity = 1;
  @Input() private pointLightColor = '#0000ff';
  @Input() private pointLightIntensity = 1;
  @Input() private tickPoints = 50;
  @Input() private numberOfTicks = 5;
  @Input() private tickColor = '#666666';
  @Input() private tickRadius = 0.01;
  @Input() private floorColor = '#ff1111';
  @Input() private floorOpacity = 0.1;
  @Input() private floorPositionZ = 0;
  @Input() private xCrosshairColor = '#222222';
  @Input() private yCrosshairColor = '#333333';
  @Input() private crosshairRadius = 0;
  @Input() private cameraX = 15;
  @Input() private cameraY = 15;
  @Input() private cameraZ = 12;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges() {
    if (!this.viewReady) {
      return;
    }

    this.checkForPropertychanges('ambientLightColor', 'addLight');
    this.checkForPropertychanges('ambientLightIntensity', 'addLight');
    this.checkForPropertychanges('pointLightColor', 'addLight');
    this.checkForPropertychanges('pointLightIntensity', 'addLight');
    this.checkForPropertychanges('sphereOpacity', 'addSphere');
    this.checkForPropertychanges('sphereColor', 'addSphere');
    this.checkForPropertychanges('numberOfTicks', 'addTicks');
    this.checkForPropertychanges('tickColor', 'addTicks');
    this.checkForPropertychanges('tickPoints', 'addTicks');
    this.checkForPropertychanges('tickRadius', 'addTicks');
    this.checkForPropertychanges('floorColor', 'addFloor');
    this.checkForPropertychanges('floorOpacity', 'addFloor');
    this.checkForPropertychanges('floorPositionZ', 'addFloor');
    this.checkForPropertychanges('xCrosshairColor', 'addCrosshair');
    this.checkForPropertychanges('yCrosshairColor', 'addCrosshair');
    this.checkForPropertychanges('crosshairRadius', 'addCrosshair');
    this.checkForPropertychanges('backgroundColor', 'updateBackgroundColor');
    this.checkForPropertychanges('trackerColor', 'updateTrackerColor');
    this.checkForPropertychanges('trackerRadius', 'updateTrackerRadius');
    this.checkForPropertychanges('cameraX', 'updateCamera');
    this.checkForPropertychanges('cameraY', 'updateCamera');
    this.checkForPropertychanges('cameraZ', 'updateCamera');
  }

  checkForPropertychanges(property: string, executeFunction: string) {
    if (this[property] !== this[`_${property}`]) {
      this[executeFunction]();
      this[`_${property}`] = this[property];
    }
  }

  ngAfterViewInit() {
    this.viewReady = true;
    this.scene = new Scene();
    this.htmlCanvas = this.canvasRef.nativeElement;

    this.initializeRenderer();
    this.prepareScene();

    const animationFrame$ = interval(0, animationFrameScheduler).pipe(
      map(() => this.value),
      share()
    );
    this.animate(animationFrame$);
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  updateBackgroundColor() {
    const isHexColor = /^#[0-9A-Fa-f]{6}$/i.test(this.backgroundColor);
    if (isHexColor) {
      const color = new Color(this.backgroundColor);
      this.renderer.setClearColor(color, 1);
    } else {
      this.renderer.setClearColor(0xffffff, 0);
    }
  }

  updateCamera() {
    this.camera.position.x = this.cameraX;
    this.camera.position.y = this.cameraZ;
    this.camera.position.z = this.cameraY;
  }

  /**
   * Initializes the WebGL renderer for the
   * three.js scene.
   */
  initializeRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.htmlCanvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(
      this.htmlCanvas.clientWidth,
      this.htmlCanvas.clientWidth,
      false
    );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  animate(animationFrame$: Observable<{ [id: string]: number[] }>) {
    const sideEffects$ = animationFrame$.pipe(
      scan(this.linearInterpolation.bind(this)),
      tap(this.removeInputEntities.bind(this)),
      tap(this.updateEntities.bind(this)),
      tap(() => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      })
    );

    this.subscriptions.add(sideEffects$.subscribe());
  }

  updateEntities(data: { [id: string]: number[] }) {
    if (!data) {
      return;
    }

    const material = new MeshPhysicalMaterial({
      color: new Color(this.trackerColor)
    });
    Object.entries(data).forEach(([id, coordinates]) => {
      coordinates = coordinates.map(o => o / 10);
      if (!this.entities[id]) {
        this.addEntity(id, coordinates, material);
      }
      this.setPosition(this.entities[id][0], this.entities[id][2], coordinates);
      this.entities[id][0].verticesNeedUpdate = true;
    });
  }

  updateTrackerRadius() {
    const material = new MeshPhysicalMaterial({ color: this.trackerColor });
    const sphere = new SphereGeometry(this.trackerRadius, 16, 16);

    Object.values(this.entities).forEach(entity => {
      this.scene.remove(entity[2]);
      entity[2] = new Mesh(sphere, material);
      this.scene.add(entity[2]);
    });
  }

  updateTrackerColor() {
    Object.values(this.entities).forEach(entity => {
      (entity[1].material as MeshPhysicalMaterial).color.set(
        new Color(this.trackerColor)
      );
      (entity[2].material as MeshPhysicalMaterial).color.set(
        new Color(this.trackerColor)
      );
    });
  }

  addEntity(id: string, coordinates: number[], material: MeshPhysicalMaterial) {
    const entity = new Geometry();
    const line = new Line(entity, material);
    entity.vertices.push(new Vector3(0));
    entity.vertices.push(new Vector3(coordinates[0], 0, coordinates[1]));
    entity.vertices.push(
      new Vector3(coordinates[0], coordinates[2], coordinates[1])
    );
    const sphere = new SphereGeometry(this.trackerRadius, 16, 16);
    const mesh = new Mesh(sphere, material);
    mesh.castShadow = true;
    this.entities[id] = [entity, line, mesh];
    this.scene.add(line);
    this.scene.add(mesh);
  }

  removeInputEntities(data: { [id: string]: number[] }) {
    if (!data || !this.entities) {
      return;
    }

    Object.keys(this.entities).forEach(id => {
      if (!data[id]) {
        this.scene.remove(this.entities[id][1]);
        this.scene.remove(this.entities[id][2]);
        delete this.entities[id];
      }
    });
  }

  setPosition(line: Geometry, sphere: Mesh, coordinates: number[]) {
    line.vertices[1].x = coordinates[0];
    line.vertices[1].z = coordinates[1];
    line.vertices[2].x = coordinates[0];
    line.vertices[2].y = coordinates[2];
    line.vertices[2].z = coordinates[1];
    sphere.position.x = coordinates[0];
    sphere.position.y = coordinates[2];
    sphere.position.z = coordinates[1];
  }

  prepareScene() {
    this.camera = this.createOrthographicCamera();
    this.camera.updateProjectionMatrix();

    this.scene.add(this.camera);

    this.addFloor();
    this.addLight();
    this.addSphere();
    this.addCrosshair();
    this.addTicks();
    this.controls = new OrbitControls(this.camera, this.htmlCanvas);
    this.controls.enableZoom = false;
  }

  addLight() {
    this.safeRemoveFromScene('ambientLight');
    this.safeRemoveFromScene('pointLight');

    this.assets.ambientLight = new AmbientLight(
      new Color(this.ambientLightColor),
      this.ambientLightIntensity
    );
    this.assets.pointLight = new PointLight(
      new Color(this.pointLightColor),
      this.pointLightIntensity
    );
    this.assets.pointLight.position.x = 0;
    this.assets.pointLight.position.y = 10;
    this.assets.pointLight.position.z = -10;

    this.scene.add(this.assets.ambientLight);
    this.scene.add(this.assets.pointLight);
  }

  addSphere() {
    this.safeRemoveFromScene('sphere');

    const sphere = new SphereGeometry(10, 32, 32);
    const material = new MeshLambertMaterial({
      color: new Color(this.sphereColor),
      refractionRatio: 0.5,
      opacity: this.sphereOpacity,
      transparent: true
    });
    // const material = new MeshPhysicalMaterial({color: new Color(this.sphereColor), opacity: this.sphereOpacity});
    material.needsUpdate = true;
    this.assets.sphere = new Mesh(sphere, material);
    this.assets.sphere.renderOrder = 4;

    this.scene.add(this.assets.sphere);
  }

  private safeRemoveFromScene(property: string) {
    if (!this.assets[property]) {
      return;
    }

    if (Array.isArray(this.assets[property])) {
      for (const element of this.assets[property]) {
        this.scene.remove(element);
      }
      this.assets[property] = [];
    } else {
      this.scene.remove(this.assets[property]);
    }
  }

  addTicks() {
    this.safeRemoveFromScene('ticks');
    if (isNaN(this.tickRadius) || this.tickRadius <= 0) {
      return;
    }
    if (isNaN(this.tickPoints) || this.tickPoints <= 0) {
      return;
    }
    if (isNaN(this.numberOfTicks) || this.numberOfTicks <= 0) {
      return;
    }

    const material = new MeshPhysicalMaterial({
      color: new Color(this.tickColor)
    });
    const floorRadius = 10;
    const tickDistance = floorRadius / this.numberOfTicks;

    this.assets.ticks = new Array(this.numberOfTicks);

    for (let i = 0; i < this.numberOfTicks; i++) {
      const radius = tickDistance * (i + 1);

      const geometry = new TorusGeometry(
        radius,
        this.tickRadius,
        8,
        this.tickPoints
      );
      geometry.rotateX(Math.PI / 2);

      const mesh = new Mesh(geometry, material);
      mesh.matrixAutoUpdate = false;

      this.assets.ticks[i] = mesh;
    }
    this.scene.add(...this.assets.ticks);
  }

  createOrthographicCamera(): OrthographicCamera {
    const width = this.htmlCanvas.clientWidth;
    const height = this.htmlCanvas.clientHeight;

    const ratio = this.defaultWidth / width;

    const camera = new OrthographicCamera(
      (-width / 36) * ratio,
      (width / 36) * ratio,
      (height / 36) * ratio,
      (-height / 36) * ratio
    );
    camera.position.set(this.cameraX, this.cameraZ, this.cameraY);
    camera.lookAt(0, 0, 0);
    return camera;
  }

  addCrosshair() {
    this.safeRemoveFromScene('crosshair');

    const radius = 10;

    if (isNaN(this.crosshairRadius) || this.crosshairRadius <= 0) {
      return;
    }

    const geometry = new ConeGeometry(+this.crosshairRadius, radius, 32);
    const materialX = new MeshPhysicalMaterial({
      color: new Color(this.xCrosshairColor)
    });
    const materialY = new MeshPhysicalMaterial({
      color: new Color(this.yCrosshairColor)
    });

    const positiveXCone = new Mesh(geometry, materialX);
    const negativeXCone = new Mesh(geometry, materialX);
    const positiveYCone = new Mesh(geometry, materialY);
    const negativeYCone = new Mesh(geometry, materialY);
    positiveXCone.rotateZ(-Math.PI / 2);
    positiveXCone.translateY(10 - radius / 2);
    positiveYCone.rotateX(Math.PI / 2);
    positiveYCone.translateY(10 - radius / 2);
    negativeXCone.rotateZ(Math.PI / 2);
    negativeXCone.translateY(10 - radius / 2);
    negativeYCone.rotateX(-Math.PI / 2);
    negativeYCone.translateY(10 - radius / 2);

    positiveXCone.updateMatrix();
    negativeXCone.updateMatrix();
    positiveYCone.updateMatrix();
    negativeYCone.updateMatrix();

    positiveXCone.matrixAutoUpdate = false;
    negativeXCone.matrixAutoUpdate = false;
    positiveYCone.matrixAutoUpdate = false;
    negativeYCone.matrixAutoUpdate = false;

    this.assets.crosshair = [
      positiveXCone,
      negativeXCone,
      positiveYCone,
      negativeYCone
    ];

    this.scene.add(...this.assets.crosshair);
  }

  addFloor() {
    this.safeRemoveFromScene('floor');

    if (isNaN(this.floorPositionZ)) {
      this.floorPositionZ = -0.1;
    }

    const geometry = new CircleGeometry(10, 32);
    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, +this.floorPositionZ, 0);

    const material = new MeshPhysicalMaterial({
      color: new Color(this.floorColor),
      opacity: this.floorOpacity,
      side: 2
    });
    material.transparent = true;

    const floor = new Mesh(geometry, material);
    floor.updateMatrix();
    floor.matrixAutoUpdate = false;
    floor.renderOrder = 3;
    floor.receiveShadow = true;

    this.assets.floor = floor;
    this.scene.add(this.assets.floor);
  }

  linearInterpolation(
    startValues: { [id: string]: number[] },
    endValues: { [id: string]: number[] }
  ) {
    if (!startValues) {
      return endValues;
    }
    if (!endValues) {
      return startValues;
    }
    const step = Object.keys(endValues).reduce((acc, id) => {
      if (!startValues[id] && endValues[id]) {
        return (acc = { ...acc, [id]: endValues[id] });
      }
      const dX = endValues[id][0] - startValues[id][0];
      const dZ = endValues[id][1] - startValues[id][1];
      const dY = endValues[id][2] - startValues[id][2];
      return (acc = {
        ...acc,
        [id]: [
          startValues[id][0] + dX * this.interpolationRate,
          startValues[id][1] + dZ * this.interpolationRate,
          startValues[id][2] + dY * this.interpolationRate
        ]
      });
    }, {});

    return step;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onWindowResize() {
    this.renderer.setSize(
      this.htmlCanvas.clientWidth,
      this.htmlCanvas.clientWidth,
      false
    );
    this.camera.updateProjectionMatrix();
  }
}
