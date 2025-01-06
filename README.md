# harlem512.github.io

Fun website, by that one [Rusted Moss](https://www.rustedmossgame.com/) modder. [Hosts some cools stuff](https://harlem512.github.io/). Powered by [Astro](https://astro.build/), the coolest framework I've used.

# RM Interactive Map

[![name](https://harlem512.github.io/rm-map.png)](https://harlem512.github.io/rm-map.html)

An interactive map for Rusted Moss. Build with LeafletJS, a [fork](https://github.com/commenthol/gdal2tiles-leaflet) of `gdal2tiles.py`, some python scripts, and a RM mod. [Tiles are hosted here](https://github.com/Harlem512/rm-map).

# RM Modding Documentation

[Detailed information](https://harlem512.github.io/rm-docs) about how to mod Rusted Moss. Contains everything from Game Object and Event names to code deconstructions and reference mods.

## To Build

You'll need [Node.JS](https://nodejs.org/en). Then run `npm run build`, which creates the `dist` folder. Alternatively, used `npm run dev` or `npm run preview` to locally host a development or production version of the site, respectively.

## Other People's Stuff

- [GML tmLanguage syntax by Butterscotch Shenanigans](https://github.com/bscotch/stitch/blob/7dbc23c13341713a566e357f41084132d4d3593a/packages/vscode/syntaxes/gml.tmLanguage.json) (`src/data/gml.tmLanguage.json`)
- Map icons based on Rusted Moss's sprites (`public/rm-icons/*`)
- Parts of Rusted Moss's decompiled code base
