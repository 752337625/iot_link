import type { CanvasViewbox } from 'diagram-js/lib/core/Canvas';

import Canvas from 'diagram-js/lib/core/Canvas';
import EventBus from 'diagram-js/lib/core/EventBus';
import { quantize } from 'diagram-js/lib/features/grid-snapping/GridUtil';
import { getMid } from 'diagram-js/lib/layout/LayoutUtil';
import { query as domQuery } from 'min-dom';
import {
  append as svgAppend,
  attr as svgAttr,
  clear as svgClear,
  create as svgCreate,
} from 'tiny-svg';

interface BpmnCanvas extends Canvas {
  _svg: HTMLElement;
}
const SmallGridSpacing = 10;
const GridSpacing = SmallGridSpacing * 10;
const GridLineStroke = 0.5;
const GridLineOpacity = 0.4;
const GridLineColor = '#ccc';

const LAYER_NAME = 'djs-grid-line';

const GRID_DIMENSIONS = {
  height: 100_000,
  width: 100_000,
};

export type GridLineConf = {
  gridLineColor?: string;
  gridLineOpacity?: number;
  gridLineStroke?: number;
  gridSpacing?: number;
  smallGridSpacing?: number;
};

class GridLine {
  static $inject: string[];
  private _canvas: BpmnCanvas;
  private _config: Required<GridLineConf>;
  private _gfx!: SVGElement;
  private _pattern!: SVGPatternElement;
  private _visible: boolean;

  constructor(config: GridLineConf, canvas: BpmnCanvas, eventBus: EventBus) {
    this._config = {
      gridLineColor: GridLineColor,
      gridLineOpacity: GridLineOpacity,
      gridLineStroke: GridLineStroke,
      gridSpacing: GridSpacing,
      smallGridSpacing: SmallGridSpacing,
      ...config,
    };
    this._canvas = canvas;
    this._visible = false;

    eventBus.on('diagram.init', () => {
      this._init();
      this.toggle(true);
    });

    eventBus.on('gridSnapping.toggle', (event: { active: boolean }) => {
      const active = event.active;
      this.toggle(active);
      this._centerGridAroundViewbox();
    });

    eventBus.on(
      'canvas.viewbox.changed',
      (context: { viewbox: CanvasViewbox }) => {
        const viewbox = context.viewbox;
        this._centerGridAroundViewbox(viewbox);
      },
    );
  }

  _centerGridAroundViewbox(viewbox?: CanvasViewbox | Element) {
    if (!viewbox) {
      viewbox = this._canvas.viewbox();
    }

    const mid = getMid(viewbox as Element);
    svgAttr(this._gfx, {
      x:
        -(GRID_DIMENSIONS.width / 2) +
        quantize(mid.x, this._config.gridSpacing, 'round'),
      y:
        -(GRID_DIMENSIONS.height / 2) +
        quantize(mid.y, this._config.gridSpacing, 'round'),
    });
  }

  _getParent() {
    return this._canvas.getLayer(LAYER_NAME, -2);
  }

  _init() {
    let defs = domQuery('defs', this._canvas._svg);
    if (!defs) {
      defs = svgCreate('defs');
      svgAppend(this._canvas._svg, defs);
    }

    // 小网格
    const smallGridPattern = svgCreate('pattern');
    const smallGridPatternId = `bpmn-small-grid-pattern`;
    svgAttr(smallGridPattern, {
      height: this._config.smallGridSpacing,
      id: smallGridPatternId,
      patternUnits: 'userSpaceOnUse',
      width: this._config.smallGridSpacing,
    });

    const smallGridPath = svgCreate('path');
    svgAttr(smallGridPath, {
      d: `M ${this._config.smallGridSpacing},0 L 0,0 0,${this._config.smallGridSpacing} ${this._config.smallGridSpacing},${this._config.smallGridSpacing} Z`,
      fill: 'none',
      opacity: this._config.gridLineOpacity,
      stroke: this._config.gridLineColor,
      strokeWidth: this._config.gridLineStroke,
    });
    svgAppend(smallGridPattern, smallGridPath);

    // 大网格
    this._pattern = svgCreate('pattern');
    const bigGridPattern = this._pattern;
    const bigGridPatternId = `bpmn-big-grid-pattern`;
    svgAttr(bigGridPattern, {
      height: this._config.gridSpacing,
      id: bigGridPatternId,
      patternUnits: 'userSpaceOnUse',
      width: this._config.gridSpacing,
    });

    const gridPath = svgCreate('path');
    svgAttr(gridPath, {
      d: `M ${this._config.gridSpacing},0 L 0,0 0,${this._config.gridSpacing} ${this._config.gridSpacing},${this._config.gridSpacing} Z`,
      fill: 'none',
      opacity: this._config.gridLineOpacity * 2,
      stroke: this._config.gridLineColor,
      strokeWidth: this._config.gridLineStroke * 2,
    });
    svgAppend(bigGridPattern, gridPath);

    const gridRect = svgCreate('rect');
    svgAttr(gridRect, {
      fill: `url(#${smallGridPatternId})`,
      height: this._config.gridSpacing,
      width: this._config.gridSpacing,
    });
    svgAppend(bigGridPattern, gridRect);

    // 注册 svg def
    svgAppend(defs, smallGridPattern);
    svgAppend(defs, bigGridPattern);

    // 绘制和添加网格背景
    const grid = (this._gfx = svgCreate('rect'));
    svgAttr(grid, {
      fill: `url(#${bigGridPatternId})`,
      height: GRID_DIMENSIONS.height,
      width: GRID_DIMENSIONS.width,
      x: -(GRID_DIMENSIONS.width / 2),
      y: -(GRID_DIMENSIONS.height / 2),
    });
  }

  isVisible() {
    return this._visible;
  }

  toggle(visible?: boolean) {
    if (visible === undefined) {
      visible = !this._visible;
    }

    if (visible === this._visible) {
      return;
    }

    const parent = this._getParent();

    if (visible) {
      svgAppend(parent, this._gfx);
    } else {
      svgClear(parent);
    }

    this._visible = visible;
  }
}

GridLine.$inject = ['config.gridLine', 'canvas', 'eventBus'];

export default GridLine;
