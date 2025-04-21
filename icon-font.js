import {FontAssetType, generateFonts, OtherAssetType} from "fantasticon";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import {createWriteStream} from "node:fs";
import {join} from "node:path";
import {Readable} from "stream";
import {finished} from "stream/promises";

/**
 * Get the list of icons.
 *
 * It's using a JSON file provided by the brand CDN.
 *
 * @returns {Promise<{icon: string, url: string, alt: string}[]>}
 */
async function getIconList() {
    const res = await fetch("https://cdn.brand.illinois.edu/icons.json");
    const icons = JSON.parse(await res.text());

    return icons.flatMap(icon => {
        const white = icon.colors
            .find(it => it.name === "white")

        const solid = white.styles.find(it => it.name === "solid");
        const line = white.styles.find(it => it.name === "line");

        return [
            {
                icon: icon.name,
                url: solid.svg,
                alt: solid.alt
            },
            {
                icon: `${icon.name}-line`,
                url: line.svg,
                alt: line.alt
            }
        ]
    })
}

getIconList().then(async (icons) => {
    if (process.env.DOWNLOAD_ICONS) {
        await downloadIcons(icons, "icons");
    }

    const result = await generate();

    // Create a JSON with the icons that has the unicode hex value,
    // alt text, and sample usage as ilw-icon
    const iconMap = Object.entries(result.codepoints).map(([key, value]) => {
        const icon = icons.find(it => it.icon === key);
        return {
            icon: key,
            unicode: value.toString(16),
            alt: icon.alt,
            component: `<ilw-icon icon="${key}"></ilw-icon>`
        }
    });

    await writeFile("src/ilw-icon.json", JSON.stringify(iconMap));

    let iconHtml = icons
        .map((it) => {
            return `
        <button class="preview" data-icon="${it.icon}">
            <span class="inner">
                <ilw-icon icon="${it.icon}"></ilw-icon>
            </span>
            <span class='label'>${it.icon}</span>
        </button>`;
        });

    let template = await readFile("src/templates/ilw-icon.template.html", "utf-8");
    template = template.replace("<!--ICONS-->", iconHtml.join("\n"));
    await writeFile("src/ilw-icon.html", template);

    console.log("[\n" + icons.map(it => `"${it.icon}"`).join(",\n") + "\n]");
});

async function generate() {
    return await generateFonts({
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
 * @param {{icon: string, url: string}[]} icons
 * @param {string} outdir
 * @returns {Promise<void>}
 */
async function downloadIcons(icons, outdir) {
    await mkdir(outdir, {recursive: true});

    for (let it of icons) {
        let path = join(outdir, it.icon + ".svg");
        let stream = createWriteStream(path, {flags: "w"});
        let res = await fetch(it.url);
        await finished(Readable.fromWeb(res.body).pipe(stream));
    }
}
