import type { Emitter } from 'mitt';

import mitt from 'mitt';

import * as mittType from './mitt.type';

export class FabricEventEmitter {
  emit!: Emitter<mittType.MittRenderEvents>['emit'];
  off!: Emitter<mittType.MittRenderEvents>['off'];
  on!: Emitter<mittType.MittRenderEvents>['on'];
  private emitter: Emitter<mittType.MittRenderEvents> = mitt();
  constructor() {
    this.on = this.emitter.on.bind(this.emitter);
    this.off = this.emitter.off.bind(this.emitter);
    this.emit = this.emitter.emit.bind(this.emitter);
  }
}
