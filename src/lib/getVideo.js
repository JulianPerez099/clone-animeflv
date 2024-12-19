import puppeteer from "puppeteer";
import fs from "fs/promises";

let cache = {};

// Cargar el cache desde un archivo al iniciar
(async () => {
    try {
        cache = JSON.parse(await fs.readFile("./cache.json", "utf8"));
    } catch (error) {
        console.log("No se encontró un archivo de cache, iniciando vacío.");
        cache = {};
    }
})();

export const getVideo = async (animeEpisodeId, preferredType = "SW") => {
    // Verificar si ya está en el cache
    if (cache[animeEpisodeId]) {
        console.log(`Usando cache para: ${animeEpisodeId}`);
        return cache[animeEpisodeId];
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    try {
        console.log(`Navegando a AnimeFLV para: ${animeEpisodeId}`);
        await page.goto(`https://www3.animeflv.net/ver/${animeEpisodeId}`, {
            waitUntil: "domcontentloaded",
        });

        // Esperar a que los iframes estén completamente disponibles
        await page.waitForSelector(".CapiTcn .tab-pane iframe", { timeout: 15000 });

        // Extraer los iframes
        const videoUrls = await page.evaluate(() => {
            const iframes = document.querySelectorAll(".CapiTcn .tab-pane iframe");
            const urls = [];

            iframes.forEach((iframe) => {
                const src = iframe.src;

                // Incluir dominios de interés
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

        console.log("URLs encontradas:", videoUrls);

        if (videoUrls.length === 0) {
            throw new Error("No se encontraron URLs de video.");
        }

        // Seleccionar la URL preferida o devolver todas las opciones
        const selectedVideoUrl =
            videoUrls.find((url) => url.type === preferredType)?.url || videoUrls[0]?.url;

        // Guardar en cache todas las URLs disponibles
        cache[animeEpisodeId] = { urls: videoUrls, selected: selectedVideoUrl };
        await fs.writeFile("./cache.json", JSON.stringify(cache, null, 2));

        return { urls: videoUrls, selected: selectedVideoUrl };
    } catch (error) {
        console.error("Error en getVideo:", error);
        throw error;
    } finally {
        await browser.close();
    }
};
