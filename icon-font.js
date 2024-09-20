import { FontAssetType, OtherAssetType, generateFonts } from "fantasticon";
import * as cheerio from "cheerio";
import { mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import { Readable } from "stream";
import { finished } from "stream/promises";

getIconList().then(async (icons) => {
    await downloadIcons(icons, "icons");

    let results = await generateFonts({
        name: "ilw-icon",
        fontTypes: [FontAssetType.EOT, FontAssetType.WOFF2, FontAssetType.WOFF, FontAssetType.TTF],
        inputDir: "icons",
        outputDir: "src",
        assetTypes: [OtherAssetType.CSS, OtherAssetType.HTML],
        prefix: "ilw-icon",
    });
});

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
            let stream = createWriteStream(path, {flags: "w"});
            let res = await fetch(`https://cdn.brand.illinois.edu/icons/${style}/white/${name}.svg`);
            await finished(Readable.fromWeb(res.body).pipe(stream));
        }
    }
}

/**
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
