export const getVideo = async (animeEpisodeId, preferredType = "SW") => {
    // Verifica si ya está en el caché de KV Storage
    const cacheData = await CACHE.get(animeEpisodeId, { type: "json" });
    if (cacheData) {
        console.log(`Usando cache para: ${animeEpisodeId}`);
        return cacheData;
    }

    // Llama a un servicio externo que maneje el scraping
    const response = await fetch(`https://api-animeflv-d21ff4f5f-julian-david-perezs-projects.vercel.app/api/get-video?id=${animeEpisodeId}&type=SW`);
    if (!response.ok) {
        throw new Error(`Error al obtener datos para: ${animeEpisodeId}`);
    }

    const data = await response.json();

    // Guarda el resultado en KV Storage
    await CACHE.put(animeEpisodeId, JSON.stringify(data), { expirationTtl: 86400 }); // Expira en 1 día

    return data;
};
