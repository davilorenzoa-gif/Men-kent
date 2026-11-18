#!/usr/bin/env python3
"""Gera ../js/bola3d.js (Three.js + HDRI studio embutidos). Uso: npm i && python3 build.py"""
import pathlib, subprocess
aqui = pathlib.Path(__file__).parent
subprocess.run(['npx', 'esbuild', 'bola3d.js', '--bundle', '--minify', '--format=esm',
                '--loader:.exr=dataurl', '--outfile=../js/bola3d.js', '--log-level=warning'], cwd=aqui, check=True)
print('js/bola3d.js', round((aqui / '../js/bola3d.js').stat().st_size / 1024), 'KB')
