import puppeteer from "puppeteer";

export default async function handler(req, res) {
    const { id, type = "SW" } = req.query;

    if (!id) {
        return res.status(400).json({ error: "El parámetro 'id' es obligatorio." });
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        await page.goto(`https://www3.animeflv.net/ver/${id}`, {
            waitUntil: "domcontentloaded",
        });

        await page.waitForSelector(".CapiTcn .tab-pane iframe", { timeout: 15000 });

        const videoUrls = await page.evaluate(() => {
            const iframes = document.querySelectorAll(".CapiTcn .tab-pane iframe");
            const urls = [];
            iframes.forEach((iframe) => {
                const src = iframe.src;
                if (src.includes("streamwish.to")) {
                    urls.push({ type: "SW", url: src });
                } else if (src.includes("embedsito.com")) {
                    urls.push({ type: "Embedsito", url: src });
                } else if (src.includes("mega")) {
                    urls.push({ type: "Mega", url: src });
                }
            });
            return urls;
        });

        if (videoUrls.length === 0) {
            return res.status(404).json({ error: "No se encontraron URLs de video." });
        }

        const selectedVideoUrl =
            videoUrls.find((url) => url.type === type)?.url || videoUrls[0]?.url;

        res.status(200).json({ urls: videoUrls, selected: selectedVideoUrl });
    } catch (error) {
        console.error("Error en getVideo:", error);
        res.status(500).json({ error: "Error al obtener el video." });
    } finally {
        if (browser) await browser.close();
    }
}
