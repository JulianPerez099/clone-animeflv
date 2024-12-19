/* empty css                                */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderComponent, a as addAttribute, d as createAstro } from '../chunks/astro/server_DfKyIOd9.mjs';
import 'kleur/colors';
import { getLatest, getOnAir } from 'animeflv-api';
import $$CardConfig from '../chunks/CardConfig_BzxcK-pi.mjs';
import 'clsx';
import { a as $$Navbar, b as $$Footer, $ as $$Layout } from '../chunks/Layout_BFft6KAk.mjs';
export { renderers } from '../renderers.mjs';

const $$Animes = createComponent(async ($$result, $$props, $$slots) => {
  const animes = await getLatest();
  const formattedAnimes = animes.map((anime) => ({
    ...anime,
    id: anime.url.split("/").pop()?.replace(/-\d+$/, "")
    // Eliminar "-número" al final del ID
  }));
  return renderTemplate`${maybeRenderHead()}<div id="Inicio"> <h1 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 p-4">
Últimos episodios
</h1> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"> ${// Usar "formattedAnimes" para renderizar los datos
  formattedAnimes.map((anime) => renderTemplate`<ul> <li class="bg-white rounded-lg shadow-lg overflow-hidden">  ${renderComponent($$result, "CardConfig", $$CardConfig, { "server:defer": true, "id": anime.id, "title": anime.title, "cover": anime.cover, "chapter": anime.chapter, "server:component-directive": "defer", "server:component-path": "C:/Users/JulianPerez/Desktop/clone-animeflv/src/layouts/CardConfig.astro", "server:component-export": "default" }, { "fallback": ($$result2) => renderTemplate`<button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex
        items-center"> <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path> <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path> </svg>
Cargando &Uacute;ltimos Animes...
</button>` })} </li> </ul>`)} </div> <!-- <h1 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 p-4">
    Últimos animes agregados
  </h1> --> </div>`;
}, "C:/Users/JulianPerez/Desktop/clone-animeflv/src/components/Animes.astro", void 0);

const $$Astro = createAstro();
const $$AnimeList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AnimeList;
  const { id, title, type } = Astro2.props;
  if (!id) {
    throw new Error("ID no proporcionado en los par\xE1metros.");
  }
  const anime = await getOnAir();
  if (!anime) {
    throw new Error(`Anime con ID ${id} no encontrado`);
  }
  function cleanTitle(title2) {
    return title2.replace(/\b(Anime|OVA|Película)\b/gi, "").trim();
  }
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center justify-between w-full"> <!-- Título del anime --> <a${addAttribute(`/anime/${id}`, "href")} class="flex items-center space-x-2 w-full"> <div class="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0"></div> <h2 id="title-anime" class="text-sm font-medium text-gray-800 max-w-44 truncate"> ${cleanTitle(title)} </h2> </a> <!-- Etiqueta del tipo --> <span${addAttribute(`text-sm font-semibold px-2 py-1 rounded-full ${type === "Anime" ? "bg-[#01bcf3] text-white border-[#01bcf3]" : "bg-[#ff7e00] text-white border-[#ff7e00]"}`, "class")}> ${type.toUpperCase()} </span> </div>`;
}, "C:/Users/JulianPerez/Desktop/clone-animeflv/src/layouts/AnimeList.astro", void 0);

const $$AnimesEmision = createComponent(async ($$result, $$props, $$slots) => {
  const animes = await getOnAir();
  return renderTemplate`${maybeRenderHead()}<section id="INICIO"> <div class="bg-white p-4 rounded-lg shadow-lg w-full"> <h1 class="text-lg font-bold text-gray-800 border-b pb-2 mb-4 flex items-center">
ANIMES EN EMISIÓN
<span class="ml-auto"> <img src="/src/assets/playbutton.svg" alt="Play Button" class="w-8 h-8"> </span> </h1> <ul class="space-y-2"> ${animes.map((anime) => renderTemplate`<li class="flex items-center justify-between border-b pb-2 last:border-b-0"> ${renderComponent($$result, "AnimeList", $$AnimeList, { "id": anime.id, "title": anime.title, "cover": anime.cover, "chapter": anime.chapter, "type": anime.type }, { "fallback": ($$result2) => renderTemplate`<button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex
        items-center"> <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path> <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path> </svg>
Cargando Lista de Animes...
</button>` })} </li>`)} </ul> </div> </section>`;
}, "C:/Users/JulianPerez/Desktop/clone-animeflv/src/components/AnimesEmision.astro", void 0);

const $$Anuncio = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-gray-800 text-white p-4 rounded-lg shadow-lg relative w-full h-auto"> <img src="https://www3.animeflv.net/assets/animeflv/img/bgb.jpg" class="absolute top-0 left-0 right-0 w-full h-full object-cover rounded-lg"> <div class="absolute bottom-0 left-0 right-0 h-1 bg-[#01bcf3]"></div> <h1 class="relative text-2xl font-bold text-center"> <strong>AnimeFLV</strong> <span class="font-bold text-gray-300">
tu fuente de anime online gratis en HD</span> </h1> </div>`;
}, "C:/Users/JulianPerez/Desktop/clone-animeflv/src/components/Anuncio.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AnimeFLV - Ver Anime Online HD" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<div class="md:ml-20 md:mr-20 ml-4 mr-4 mt-8 items-center content-center flex flex-col gap-4"> ${renderComponent($$result2, "Anuncio", $$Anuncio, {})} </div>  <div class="flex flex-col md:flex-row gap-4 md:ml-20 md:mr-20 ml-4 mr-4 mt-6"> <!-- ANIMES EN EMISIÓN --> <div class="w-full md:w-1/4 hidden md:block"> ${renderComponent($$result2, "AnimesEmision", $$AnimesEmision, {})} </div> <!-- ÚLTIMOS EPISODIOS --> <div class="w-full md:w-3/4"> ${renderComponent($$result2, "Animes", $$Animes, {})} </div> </div>  ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/JulianPerez/Desktop/clone-animeflv/src/pages/index.astro", void 0);

const $$file = "C:/Users/JulianPerez/Desktop/clone-animeflv/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
