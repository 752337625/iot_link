import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static override styles = css`
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
    .fabric-context-menu-item {
      margin: 5px;
      padding-left: 5px;
      border-radius: 4px;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #f0f0f0;
      }
    }
    .fabric-context-menu-item-border {
      width: 100%;
      height: 1px;
      background-color: #ccc;
      border-bottom: 1px dotted #ccc;
      border-style: dashed;
    }
    .fabric-context-menu-item-icon {
      margin-right: 5px;
    }
    .fabric-context-menu-item-icon svg {
      width: 18px;
      height: 18px;
    }
    .fabric-context-menu-item-label {
      flex: 1;
    }
  `;

  @property()
  name = 'Somebody';

  override render() {
    return html`
      <div id="fabric-context-menu" oncontextmenu="return false;"></div>
    `;
  }
}
