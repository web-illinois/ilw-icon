# ilw-icon

Links: **[ilw-icon in Builder](https://builder3.toolkit.illinois.edu/component/ilw-icon/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

This is a wrapper class to pull the icons from https://cdn.brand.illinois.edu/icons.html. It requires the icon name, and will default to blue solid. 

Attributes include:
* `icon`: the icon name. If there is no `icon`, it will display nothing. If there is an icon name that does not have a corresponding icon in the design list, it will throw a 404 error. 
* `type`: the icon type: consists of *solid*, *line*, and *duo*. Defaults to solid. 
* `theme`: the color: consists of *blue*, *orange*, and *white*. Defaults to blue. 
* `alt`: the alternate text used for the image. Defaults to the icon name plus the word 'icon', used for accessible technology. 
* `size`: the width of the icon, defaults to 48px. 
* `focus`: a Boolean value that changes the color to a focused color. 

There should be no child tags or text. 

## Code Examples

```html
<ilw-icon icon="twitter" aria-hidden="true"></ilw-icon>

<ilw-icon icon="admissions" type="line" theme="orange" alt="Access admissions records"></ilw-icon>
```

## Accessibility Notes and Use

If you are using an icon with text, then you can use the `aria-hidden` attribute on the `ilw-icon`, and it will propogate that value to the icon below and remove the label. If you are not using an icon with text, then the icon is conveying information and should not be hidden. 

If you are using an icon that requires a focus state, you can set the `focus` boolean attribute via javascript to change the color. It will change the color to white, unless the color is already white, in which case it will change to blue. This should be done by the item triggering the CSS change via javascript. 

## External References

* https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24
* https://lit.dev/docs/api/templates/#nothing