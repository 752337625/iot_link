import { contextMenuSvgData } from './context_menu_svg.data';

export function createContextMenuHtml(menu: any[]) {
  let html = '';
  menu.forEach((item: any, index: number) => {
    // 将函数存储在全局对象中
    window[`contextMenuAction${index}`] = item.clickFn;
    html += `<div class="fabric-context-menu-item"  style="color: #000;!important" onclick="window.contextMenuAction${index}()">
              <span class="fabric-context-menu-item-icon">
                ${contextMenuSvgData[item.type]}
              </span>
              <span class="fabric-context-menu-item-label">${item.label}</span>
            </div>
              ${
                item.children
                  ? `<div  style="margin:0 5px 5px 5px;display: flex;align-items: center;justify-content: space-between;">${createContextMenuChildrenHtml(item.children, index)}</div>`
                  : ''
              }
            ${item.border ? `<div class="fabric-context-menu-item-border"></div>` : ''}
            `;
  });
  return html;
}
export function createContextMenuChildrenHtml(menu: any[], key: number) {
  let html = '';
  menu.forEach((item: any, index: number) => {
    window[`contextMenuActionChildren${key}${index}`] = item.clickFn;
    html += `<div class="fabric-context-menu-item" style="justify-content: center;margin: 0px;padding: 0px;flex:1"
    onclick="window.contextMenuActionChildren${key}${index}()">
              <span class="fabric-context-menu-item-icon" style="margin: 0px;" title="${item.label}">
                ${contextMenuSvgData[item.type]}
              </span>
            </div>
           `;
  });
  return html;
}
export const contextMenuHtml = `
<style>
  #fabric-context-menu {
    position: absolute;
    display: none;
    background-color: white;
    z-index: 1000;
    width: 160px;
    font-size: 14px;
    border-radius: 5px;
    box-shadow: 0 0 10px 8px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease-in-out;
  }
    .fabric-context-menu-item{
      margin: 5px;
      padding-left: 5px;
      border-radius: 4px;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      display: flex;
      align-items: center;
      &:hover{
        background-color: #f0f0f0;
      }

    }
      .fabric-context-menu-item-border{
        width: 100%;
        height: 1px;
        background-color: #ccc;
        border-bottom: 1px dotted #ccc;
        border-style: dashed;
     }
    .fabric-context-menu-item-icon{
        margin-right: 5px;

    }
    .fabric-context-menu-item-icon  svg{
          width: 18px;
          height: 18px;
    }
    .fabric-context-menu-item-label{
        flex: 1;
    }

</style>
<div id="fabric-context-menu" oncontextmenu="return false;"></div>
`;
