# ilw-icon

Links: **[ilw-icon in Builder](https://builder3.toolkit.illinois.edu/component/ilw-icon/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

This is a wrapper class to pull the icons from https://cdn.brand.illinois.edu/icons.html. It requires the icon name, and will default to solid, with the color being of the surrounding text. 

Attributes include:
* `icon`: the icon name. If there is no `icon`, it will display nothing. If there is an icon name that does not have a corresponding icon in the design list, it will throw a 404 error. 
* `type`: the icon type: consists of *solid*, *line*, and *duo*. Defaults to solid. See notes below about using *duo*.
* `alt`: the alternate text used for the image. Defaults to the icon name plus the word 'icon', used for accessible technology. 
* `size`: the width and height of the icon, defaults to 48px. 

There should be no child tags or text. 

There is one CSS variable, `--ilw-icon--color`, that defaults to the current color. Use this if you need to change the color of the icon to a fixed color. 

## Code Examples

```html
<ilw-icon icon="twitter" aria-hidden="true"></ilw-icon>

<ilw-icon icon="admissions" type="line" alt="Access admissions records"></ilw-icon>
```

## Accessibility Notes and Use

If you are using an icon with text, then you can use the `aria-hidden` attribute on the `ilw-icon`, and it will propogate that value to the icon below and remove the label. If you are not using an icon with text, then the icon is conveying information and should not be hidden. 

There is a possible issue with Chrome where it caches the image and then the cached version CORS does not contain the proper CORS information. See the hacksoft.io article below for details, but it requires a global fix on either our side or the CDN. 

This uses a mask technique to handle the color, so the icons will not necessarily reflect the icon image itself. Be cautious of using the duo tone images, as the two colors will merge into the primary color.

If you are using the icons as navigation, consider adding the text next to the icon. What may look obvious (a diploma) may be confusing for someone outside the University. Also ensure that your target size (what the user is clicking on) is 44 by 44 CSS pixels to meet accessibility requirements. 

## External References

* https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24
* https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword
* https://lit.dev/docs/api/templates/#nothing
* https://www.hacksoft.io/blog/handle-images-cors-error-in-chrome
* https://developer.mozilla.org/en-US/docs/Web/CSS/mask
* https://en.wikipedia.org/wiki/Mystery_meat_navigation#Iconographic_navigation