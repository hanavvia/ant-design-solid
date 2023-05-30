import { rollup } from 'rollup'
import type { Plugin } from 'rollup'
import { ANTD_OUTPUT, PKG_ANT } from '../paths'
import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { target } from '../build-info'
import { writeBundles, formatBundleFilename, withTaskName } from '../utils'
import { parallel } from 'gulp'

const banner = `/*! Ant Design Solid v1.0.0 */\n`

const buildFullEntry = async (minify: boolean) => {
    
    const plugins: Plugin[] = [
        commonjs(),
        nodeResolve({
            extensions: ['.mjs', '.js', '.json', '.ts'],
        }),
        esbuild({
            exclude: [],
            sourceMap: minify,
            target,
            define: {
                'process.env.NODE_ENV': JSON.stringify('production'),
            },
            treeShaking: true,
            legalComments: 'eof',
        }),
    ]

    if (minify) {
        plugins.push(
            minifyPlugin({
                target,
                sourceMap: true,
            })
        )
    }

    const bundle = await rollup({
        input: resolve(PKG_ANT, 'index.ts'),
        plugins,
        external: ["solid-js"],
        treeshake: true,
    })

    await writeBundles(bundle, [
        {
            format: 'umd',
            file: resolve(
                ANTD_OUTPUT,
                'dist',
                formatBundleFilename('index.full', minify, 'js')
            ),
            exports: 'named',
            name: 'AntDesignSolid',
            sourcemap: minify,
            banner,
        },
        {
            format: 'esm',
            file: resolve(
                ANTD_OUTPUT,
                'dist',
                formatBundleFilename('index.full', minify, 'mjs')
            ),
            sourcemap: minify,
            banner,
        },
    ])
}

const buildFullLocale = (minify: boolean) => {
    // TODO locale
}

export const buildFull = (minify: boolean) => async () =>
  Promise.all([buildFullEntry(minify), buildFullLocale(minify)])

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
)