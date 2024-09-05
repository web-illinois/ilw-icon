import { LitElement, html } from 'lit';
import { nothing } from 'lit';
import styles from './ilw-icon.styles';
class Icon extends LitElement {

    static get properties() {
        return {
            icon: { type: String, attribute: true },
            weight: { type: String, attribute: true },
            alt: { type: String, attribute: true },
            size: { type: String, attribute: true }
        };
    }

    static get styles() {
        return styles;
    }

    constructor() {
        super();
        this.icon = '';
        this.type = 'solid';
        this.alt = '';
        this.size = '48px';
    }

    get sizeStyle() {
        return this.size == '' ? '' : `width: ${this.size}; height: ${this.size};`;
    }

    get maskStyle() {
        return `-webkit-mask: url(https://cdn.brand.illinois.edu/icons/${this.type}/blue/${this.icon}.svg) no-repeat center; mask: url(https://cdn.brand.illinois.edu/icons/${this.type}/blue/${this.icon}.svg) no-repeat center;`;
    }

    get color() {
        return this.focus ? (this.theme == 'white' ? 'blue' : 'white') : this.theme;
    }

    get label() {
        return this.isHidden ? '' : (this.alt == '' ? `${this.icon} icon` : this.alt);
    }

    get isHidden() {
        return this.getAttribute('aria-hidden');
    }

    render() {
        if (this.icon == '' || this.type == '' || this.size == '') {
            return html``;
        }
        return html`<div style="${this.sizeStyle} ${this.maskStyle}" role="img" aria-label="${this.label}" aria-hidden="${this.isHidden ? "true" : nothing}"></div>`;
    }
}

customElements.define('ilw-icon', Icon);