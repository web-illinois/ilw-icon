import { FontAssetType, OtherAssetType, generateFonts } from "fantasticon";
import * as cheerio from "cheerio";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import { Readable } from "stream";
import { finished } from "stream/promises";

/**
 * Template for where to download icon SVGs from.
 *
 * @param {string} style 'solid' or 'line'
 * @param {string} name Icon's machine name
 * @returns {string} Link to the SVG to download
 */
const iconDownloadLink = (style, name) => `https://cdn.brand.illinois.edu/icons/${style}/white/${name}.svg`;

/**
 * Get the list of icons.
 *
 * It's using the brand icons page's icon names datalist, but it could be any source.
 *
 * @returns {Promise<string[]>}
 */
async function getIconList() {
    const res = await fetch("https://cdn.brand.illinois.edu/icons.html");
    const $ = cheerio.load(await res.text());

    return Object.values($("#icon-names option"))
        .map((it) => it?.attribs?.value)
        .filter((it) => !!it);
}

getIconList().then(async (icons) => {
    if (process.env.DOWNLOAD_ICONS) {
        await downloadIcons(icons, "icons");
        await generate();
    }

    let iconHtml = icons
        .flatMap((it) => [it, `${it}-line`])
        .map((it) => {
            return `
        <div class="preview">
            <span class="inner" tabindex="0">
                <i class="ilw-icon ilw-icon-${it}"></i>
            </span>
            <span class='label'>${it}</span>
        </div>`;
        });

    let template = await readFile("src/templates/ilw-icon.template.html", "utf-8");
    template = template.replace("<!--ICONS-->", iconHtml.join("\n"));
    await writeFile("src/ilw-icon.html", template);
});

async function generate() {
    await generateFonts({
        name: "ilw-icon",
        fontTypes: [FontAssetType.WOFF2, FontAssetType.WOFF],
        inputDir: "icons",
        outputDir: "src/fonts",
        assetTypes: [OtherAssetType.CSS],
        prefix: "ilw-icon",
        descent: 40,
        round: 0,
        formatOptions: {
            svg: {
                centerHorizontally: true,
                centerVertically: true,
            },
        },
        selector: "span",
        templates: {
            css: "src/templates/css.hbs",
        },
        pathOptions: {
            [OtherAssetType.CSS]: "src/ilw-icon.styles.css",
        },
    });
}

/**
 *
 * @param {string[]} names
 * @param {string} outdir
 * @returns {Promise<void>}
 */
async function downloadIcons(names, outdir) {
    await mkdir(outdir, { recursive: true });

    for (let name of names) {
        for (let style of ["solid", "line"]) {
            let path = join(outdir, name + (style === "solid" ? "" : `-${style}`) + ".svg");
            let stream = createWriteStream(path, { flags: "w" });
            let res = await fetch(iconDownloadLink(style, name));
            await finished(Readable.fromWeb(res.body).pipe(stream));
        }
    }
}
