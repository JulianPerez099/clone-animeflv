/* empty css                                   */
import { c as createComponent, r as renderTemplate, e as renderComponent, d as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_DfKyIOd9.mjs';
import 'kleur/colors';
import { getAnimeInfo } from 'animeflv-api';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import { $ as $$Layout, a as $$Navbar, b as $$Footer } from '../../chunks/Layout_BFft6KAk.mjs';
export { renderers } from '../../renderers.mjs';

const VideoPlayer = ({ videoUrl }) => {
  const [videoSrc, setVideoSrc] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log("URL del video:", videoUrl);
    if (videoUrl?.selected) {
      setVideoSrc(videoUrl.selected);
    }
  }, [videoUrl]);
  const handleIframeError = () => {
    setError("Hubo un problema cargando el video.");
  };
  return /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-lg shadow-lg items-center justify-center", children: error ? /* @__PURE__ */ jsx("p", { children: error }) : videoSrc ? /* @__PURE__ */ jsx(
    "iframe",
    {
      "server:defer": true,
      src: videoSrc,
      width: "100%",
      height: "500px",
      allowFullScreen: true,
      onError: handleIframeError
    }
  ) : /* @__PURE__ */ jsxs(
    "button",
    {
      disabled: true,
      type: "button",
      class: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg \r\n        text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex \r\n        items-center",
      children: [
        /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", role: "status", class: "inline w-4 h-4 me-3 text-white animate-spin", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsx("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "#E5E7EB" }),
          /* @__PURE__ */ jsx("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentColor" })
        ] }),
        "Cargando..."
      ]
    }
  ) });
};

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

const getVideo = async (animeEpisodeId, preferredType = "SW") => {
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

const $$Astro = createAstro();
const prerender = false;
const $$animeEpisode = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$animeEpisode;
  const { anime_episode } = Astro2.params;
  if (!anime_episode) {
    throw new Error("ID y episodio no proporcionados.");
  }
  const lastDashIndex = anime_episode.lastIndexOf("-");
  const animeId = anime_episode.substring(0, lastDashIndex);
  const episodeId = anime_episode.substring(lastDashIndex + 1);
  let videoUrl, anime;
  try {
    videoUrl = await getVideo(`${animeId}-${episodeId}`);
    anime = await getAnimeInfo(animeId);
  } catch (error) {
    console.error("Error cargando datos:", error);
    throw new Error("No se pudieron cargar los datos necesarios.");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${anime?.title} - AnimeFLV` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<div class="flex flex-col md:flex-row justify-center gap-4 items-center md:mx-[10%]
  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> <div class="w-full"> <!-- Ancho exacto del 50% --> <h5 class="ml-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> ${anime?.title} <span class="block text-lg font-normal text-gray-500 dark:text-gray-500">Episodio ${episodeId}</span> </h5> ${renderComponent($$result2, "VideoPlayer", VideoPlayer, { "videoUrl": videoUrl, "client:visible": true, "server:defer": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/JulianPerez/Desktop/clone-animeflv/src/components/VideoPlayer", "client:component-export": "default" }, { "fallback": ($$result3) => renderTemplate`<button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex
        items-center"> <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path> <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path> </svg>
Cargando reproductor...
</button>` })} </div> </div> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/JulianPerez/Desktop/clone-animeflv/src/pages/ver/[anime_episode].astro", void 0);

const $$file = "C:/Users/JulianPerez/Desktop/clone-animeflv/src/pages/ver/[anime_episode].astro";
const $$url = "/ver/[anime_episode]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$animeEpisode,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
