import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as renderTransition, d as createAstro } from './astro/server_DfKyIOd9.mjs';
import 'kleur/colors';
import 'clsx';
import { getAnimeInfo } from 'animeflv-api';
/* empty css                         */

const $$Astro = createAstro();
const $$CardConfig = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardConfig;
  const { id, title, cover, chapter } = Astro2.props;
  if (!id) {
    throw new Error("ID no proporcionado en los par\xE1metros.");
  }
  const anime = await getAnimeInfo(id);
  if (!anime) {
    throw new Error(`Anime con ID ${id} no encontrado`);
  }
  const status = anime.status || "Desconocido";
  return renderTemplate`${maybeRenderHead()}<div> <div class="flex flex-col rounded-xl shadow-lg overflow-hidden"> <a${addAttribute(`/ver/${id}-${chapter}`, "href")} class="relative"${addAttribute(renderTransition($$result, "abcvoatq", "", `img-${id}`), "data-astro-transition-scope")}> <img${addAttribute(cover, "src")}${addAttribute(`Portada del Anime ${title}`, "alt")} class="w-full h-auto drop-shadow-2xl"> <div class="absolute md:top-2 md:left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-2xl left-2 top-2"> ${renderTemplate`<div> ${status === "En emision" ? renderTemplate`<span>Episodio. ${chapter}</span>` : renderTemplate`<span>
Episodio. ${chapter} | ${status} </span>`} </div>`} </div> <h2 class="text-white md:text-sm text-lg px-2 py-1 bg-black bg-opacity-65 truncate font-bold w-full top-2 border-none"> <span>${title}</span> </h2> </a> </div> </div>`;
}, "C:/Users/JulianPerez/Desktop/clone-animeflv/src/layouts/CardConfig.astro", "self");

const $$file = "C:/Users/JulianPerez/Desktop/clone-animeflv/src/layouts/CardConfig.astro";
const $$url = undefined;

export { $$CardConfig as default, $$file as file, $$url as url };
