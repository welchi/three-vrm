import * as THREE from 'three';
import { VRM } from '../data/VRM';

const GLTFLoader = require('three-gltf-loader'); // tslint:disable-line:no-var-requires

export class VRMLoader {
  private manager: THREE.LoadingManager;
  private gltfLoader: any;

  constructor(manager?: THREE.LoadingManager) {
    this.manager = manager || THREE.DefaultLoadingManager;
    this.gltfLoader = new GLTFLoader(this.manager);
  }

  public load(
    url: string,
    onLoad?: (vrm: VRM) => void,
    onProgress?: (request: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): void {
    this.gltfLoader.load(
      url,
      (gltf: any) => {
        const vrm = new VRM();

        vrm.fromGLTF(gltf).then(result => {
          onLoad(result);
        });
      },
      onProgress,
      onError
    );
  }

  public setCrossOrigin(crossOrigin: string) {
    this.gltfLoader.setCrossOrigin(crossOrigin);
    return this;
  }

  public setPath(path: string) {
    this.gltfLoader.setPath(path);
    return this;
  }

  public setDRACOLoader(dracoLoader: any) {
    this.gltfLoader.setDRACOLoader(dracoLoader);
    return this;
  }
}
