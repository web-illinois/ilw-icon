import { LitElement, html } from 'lit';
import { nothing } from 'lit';
class Icon extends LitElement {

    static get properties() {
        return {
            icon: { type: String, attribute: true },
            weight: { type: String, attribute: true },
            theme: { type: String, attribute: true },
            alt: { type: String, attribute: true },
            size: { type: String, attribute: true },
            focus: { type: Boolean, attribute: true }
        };
    }

    constructor() {
        super();
        this.icon = '';
        this.type = 'solid';
        this.theme = 'blue';
        this.alt = '';
        this.size = '48px';
        this.focus = false;
    }

    get widthStyle() {
        return this.size == '' ? '' : 'width: ' + this.size + ';';
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
        if (this.icon == '' || this.weight == '' || this.theme == '') {
            return html``;
        }
        return html`<img style="${this.widthStyle}" src="https://cdn.brand.illinois.edu/icons/${this.type}/${this.color}/${this.icon}.svg" aria-label="${this.label}" aria-hidden="${this.isHidden ? "true" : nothing }">`;
    }
}

customElements.define('ilw-icon', Icon);