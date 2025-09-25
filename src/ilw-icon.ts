import {html, LitElement, nothing, unsafeCSS} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {styleMap} from "lit/directives/style-map.js";
import {customElement, property} from "lit/decorators.js";
// @ts-ignore
import styles from "./ilw-icon.styles.css?inline";
import "./ilw-icon.css";


@customElement('ilw-icon')
export default class Icon extends LitElement {

    @property()
    icon: string = "";
    @property()
    type: string = "solid"; // solid or line
    @property()
    size: string = "";
    @property()
    alt: string = "";

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
    }

    render() {
        if (!this.icon) {
            return html``;
        }
        let classes: Record<string, boolean> = {
            "ilw-icon": true,
        };
        if (this.type === "line") {
            classes[`ilw-icon-${this.icon}-line`] = true;
        } else {
            classes[`ilw-icon-${this.icon}`] = true;
        }
        let styles: Record<string, string> = {};
        if (this.size) {
            styles["font-size"] = this.size;
        }

        return html`<span
                class=${classMap(classes)}
                style=${styleMap(styles)}
                aria-hidden=${this.alt ? nothing : "true"}
                aria-label=${this.alt ? this.alt : nothing}
                role=${this.alt ? "img" : nothing}
        ></span>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-icon": Icon;
    }
}
