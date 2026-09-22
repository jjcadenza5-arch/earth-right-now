import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const app=await readFile(new URL("../src/app.js",import.meta.url),"utf8");
const view=await readFile(new URL("../src/place-memory-view.js",import.meta.url),"utf8");
for(const needle of ["favoritePlaceResults","v.favoritePlaces.map(placeMemoryCard)","favoritePlace(x.id)","isFavoritePlace(p.id)"])assert.ok(app.includes(needle),`My Earth place-favorite wiring missing: ${needle}`);
for(const needle of ["Remove favorite place","Save favorite place","onFavorite?.(place)"])assert.ok(view.includes(needle),`Place favorite control missing: ${needle}`);
console.log("ERN My Earth place-favorite wiring checks passed");
