/* empty css                                   */
import { c as createComponent, r as renderTemplate, e as renderComponent, d as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_DfKyIOd9.mjs';
import 'kleur/colors';
import { $ as $$Layout, a as $$Navbar, b as $$Footer } from '../../chunks/Layout_BFft6KAk.mjs';
import { getAnimeInfo, getOnAir } from 'animeflv-api';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
async function getStaticPaths() {
  const animes = await getOnAir();
  if (!animes || animes.length === 0) {
    console.warn("No se encontraron animes en emisi\xF3n.");
    return [];
  }
  return animes.map((anime) => ({
    params: { id: anime.id }
    // Usar el `id` directamente de `getOnAir`
  }));
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    throw new Error("ID no proporcionado en los par\xE1metros.");
  }
  const anime = await getAnimeInfo(id);
  if (!anime) {
    throw new Error(`Anime con ID ${id} no encontrado`);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${anime.title} - AnimeFLV` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<section> <div class="flex flex-col md:flex-row justify-between gap-4 items-start mx-2 py-2"> <div class="flex bg-white rounded-lg shadow dark:bg-gray-800 flex-col md:flex-row"> <!-- Contenedor de imagen y estado --> <div class="relative w-full md:w-48 flex-shrink-0 flex flex-col justify-start items-start"> <img${addAttribute(anime.cover, "src")}${addAttribute(`Portada de ${anime.title}`, "alt")} class="object-contain w-full h-72 md:w-48 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-t-none"> <span class="w-full bg-green-500 text-white text-center py-1 rounded-b-lg md:rounded-bl-lg md:rounded-br-none
            hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 text-base font-semibold
            shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 mt-2"> ${anime.status} </span> </div> <!-- Contenedor de contenido --> <form class="flex-auto p-6 overflow-y-auto"> <div class="flex flex-wrap"> <h1 class="flex-auto text-xl font-semibold text-white"> ${anime.title} </h1> <div class="text-xl font-semibold text-white border-[#01bcf2] bg-[#01bcf2] flex flex-col items-center"> <span class="text-gray-600">Popularidad</span> <span>${anime.rating} / 5</span> </div> <div class="flex flex-col w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300"> ${anime.alternative_titles.map((title) => renderTemplate`<span>${title}</span>`)} </div> </div> <div class="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300"> <div class="flex flex-col space-x-2"> <label class="text-start"> ${anime.genres.map((genre) => renderTemplate`<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"> ${genre} </span>`)} </label> <label class="text-start pt-5"> ${renderTemplate`<span class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2"> ${anime.synopsis} </span>`} </label> </div> </div> <div class="flex flex-col gap-2 mb-4 text-sm font-medium max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-orange-500 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-500"> <span class="text-white text-lg">Lista de episodios</span> ${anime.episodes.map((episode) => renderTemplate`<a${addAttribute(`/ver/${id}-${episode.number}`, "href")} class="py-2 px-4 bg-[#01bcf2] hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-start text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"> <span>${anime.title}</span> <span class="flex flex-col">Episodio: ${episode.number}</span> </a>`)} </div> </form> </div> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/JulianPerez/Desktop/clone-animeflv/src/pages/anime/[id].astro", void 0);

const $$file = "C:/Users/JulianPerez/Desktop/clone-animeflv/src/pages/anime/[id].astro";
const $$url = "/anime/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
