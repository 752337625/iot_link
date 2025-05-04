export enum ComponentActiveIndexEnum {
  FATHER_MENU = 'fatherMenu',
  GRAND_MENU = 'sonMenu',
}
export interface ComponentActiveIndexType {
  [ComponentActiveIndexEnum.FATHER_MENU]: number;
  [ComponentActiveIndexEnum.GRAND_MENU]: number;
}
export enum ChartLayoutStoreLeftEnum {
  ACTIVE_INDEX = 'activeIndex',
  COMPONENT_LIST = 'componentList',
  SHOW = 'show',
}
// Store 类型
export interface ChartLayoutStoreLeftType {
  [ChartLayoutStoreLeftEnum.SHOW]: boolean;
  [ChartLayoutStoreLeftEnum.COMPONENT_LIST]: Array<any>;
  [ChartLayoutStoreLeftEnum.ACTIVE_INDEX]: ComponentActiveIndexType;
}
