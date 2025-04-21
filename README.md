# ilw-icon

Links: **[ilw-icon in Builder](https://builder3.toolkit.illinois.edu/component/ilw-icon/index.html)** |
[Illinois Web Theme](https://webtheme.illinois.edu/) |
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

Renders icons from https://cdn.brand.illinois.edu/icons.html through the use of a web font, which means it follows
text color and font size from CSS.

Attributes include:

* `icon`: the icon name. If there is no `icon`, it will display nothing. If using an icon name that does not have a
  corresponding icon in the design list, it may display an unknown character symbol.
* `type`: the icon type: consists of *solid* and *line*. Defaults to solid.
* `alt`: the alternate text used for the icon. If omitted, the icon is given the `aria-hidden` attribute, and
  is considered decorative.
* `size`: forces a specific font size on the icon. If omitted, normal CSS rules for font sizes apply.

There should be no child tags or text.

**Note** that this component does not provide the duo tone icon option, as that does not work well with font-based
icons.

## Code Examples

```html

<ilw-icon icon="twitter"></ilw-icon>

<ilw-icon icon="admissions" type="line" alt="Access admissions records"></ilw-icon>
```

## Accessibility Notes and Use

If you are using an icon with text, then you can omit the `alt` attribute on the `ilw-icon`, and it will be rendered
as a decorative element. If you are not using an icon with text, then the icon is
conveying information and should have an appropriate `alt` text.

There is a possible issue with Chrome where it caches the image and then the cached version CORS does not contain the
proper CORS information. See the hacksoft.io article below for details, but it requires a global fix on either our side
or the CDN.

If you are using the icons as navigation, consider adding the text next to the icon. What may look obvious (a diploma)
may be confusing for someone outside the University. Also ensure that your target size (what the user is clicking on) is
44 by 44 CSS pixels to meet accessibility requirements.

## External References

* https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24
* https://lit.dev/docs/api/templates/#nothing
* https://en.wikipedia.org/wiki/Mystery_meat_navigation#Iconographic_navigation
* https://github.com/tancredi/fantasticon