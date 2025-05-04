import { css, html, LitElement } from 'lit';

export class SimpleGreeting extends LitElement {
  static properties = {
    name: { type: String },
  };

  static styles = css`
    p {
      color: blue;
    }
  `;

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
customElements.define('simple-greeting', SimpleGreeting);
