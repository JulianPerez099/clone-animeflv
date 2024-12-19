import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BJar_6T2.mjs';
import { manifest } from './manifest_B0aKS9FX.mjs';

const serverIslandMap = new Map([
	['CardConfig', () => import('./chunks/CardConfig_BzxcK-pi.mjs')],
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/anime/_id_.astro.mjs');
const _page2 = () => import('./pages/ver/_anime_episode_.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/anime/[id].astro", _page1],
    ["src/pages/ver/[anime_episode].astro", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5b0aaa10-af7d-4e22-8b77-c679d7988d11",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
