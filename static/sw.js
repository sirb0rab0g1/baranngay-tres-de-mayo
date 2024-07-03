importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/02be809.js",
    "revision": "6a6b620142a3a16fb40ca16c74d1cc45"
  },
  {
    "url": "/_nuxt/130953d.js",
    "revision": "c974d4478f11e83d97dbfe0ac3a16284"
  },
  {
    "url": "/_nuxt/15b1f39.js",
    "revision": "51ebcc715e906db5fc8b5b053dda4698"
  },
  {
    "url": "/_nuxt/1cd650b.js",
    "revision": "cb9de240eb0940c1ca22eefc29b8d8eb"
  },
  {
    "url": "/_nuxt/1ea5c11.js",
    "revision": "51c3fb04a9e0f71900453f52dae22991"
  },
  {
    "url": "/_nuxt/20028b8.js",
    "revision": "78664aac18c6cbfd003d89f3f2fe3ba0"
  },
  {
    "url": "/_nuxt/20440e1.js",
    "revision": "5dc241f7289e3c97a77e8bf11934b2f7"
  },
  {
    "url": "/_nuxt/234b31f.js",
    "revision": "a79f2a9284fdd65004531830c8f2c783"
  },
  {
    "url": "/_nuxt/2e74d93.js",
    "revision": "fa65e77b239d065ef3713f357b672b22"
  },
  {
    "url": "/_nuxt/3231833.js",
    "revision": "2ba8fd4043b908605791b98ba247ccca"
  },
  {
    "url": "/_nuxt/32fc03e.js",
    "revision": "4c52aaa1b20fb689f636155c096fb5d6"
  },
  {
    "url": "/_nuxt/3836aaa.js",
    "revision": "49264643dfd7e1a28cab998761bb4687"
  },
  {
    "url": "/_nuxt/3fdc0e3.js",
    "revision": "e01c82973678977f6d1e29ccca926303"
  },
  {
    "url": "/_nuxt/48c3134.js",
    "revision": "853a6987165bfe05ade94811b1e291a9"
  },
  {
    "url": "/_nuxt/5ac680b.js",
    "revision": "51da0d5580fe6db44e3362a353684892"
  },
  {
    "url": "/_nuxt/5c4b454.js",
    "revision": "d1ed2ebb710d9b05d2b14b579e42f844"
  },
  {
    "url": "/_nuxt/62ccea1.js",
    "revision": "fcf69fe86c1e86f39807fc96cf1dbe6a"
  },
  {
    "url": "/_nuxt/62d4e37.js",
    "revision": "a252f276c72b548ee06895c3ea770f50"
  },
  {
    "url": "/_nuxt/6856984.js",
    "revision": "1e93671abe026721c4b4dc4b546ed5db"
  },
  {
    "url": "/_nuxt/68b81c4.js",
    "revision": "0fa08927bb4572d94ce556600d92d14d"
  },
  {
    "url": "/_nuxt/6c27863.js",
    "revision": "49d0f6de9cc55ac788e7213a372519f0"
  },
  {
    "url": "/_nuxt/9c2a316.js",
    "revision": "2af3ba1d0ce92bfe348dd1532f282b77"
  },
  {
    "url": "/_nuxt/9ca063b.js",
    "revision": "ad8001d2f5b5a8b3d51d58cfb2678842"
  },
  {
    "url": "/_nuxt/9d508d3.js",
    "revision": "f8cc79f46c43a34a0b73108f6b47690f"
  },
  {
    "url": "/_nuxt/b0ecf95.js",
    "revision": "e22b4f2b720c4e4468f0679b273d4808"
  },
  {
    "url": "/_nuxt/bab8686.js",
    "revision": "b8c9f9942c4f107ec293340c12a97b84"
  },
  {
    "url": "/_nuxt/c1444c7.js",
    "revision": "46c09dbeeda6579478b1093912f52e3a"
  },
  {
    "url": "/_nuxt/c52ad55.js",
    "revision": "3fee7450935764ad71fd1de01655fb62"
  },
  {
    "url": "/_nuxt/c792cc6.js",
    "revision": "fa54299c70b1a585d70a1025b97f738e"
  },
  {
    "url": "/_nuxt/cc480d4.js",
    "revision": "3244d6c6fa88988cbd8f05d68ef57f80"
  },
  {
    "url": "/_nuxt/cd67484.js",
    "revision": "82cddd4588d6851e1f484279f9a0fe7b"
  },
  {
    "url": "/_nuxt/dc92107.js",
    "revision": "f39b8b54cb33dab363f9f148543eb7a0"
  },
  {
    "url": "/_nuxt/df0bcaf.js",
    "revision": "c56437e2832a32e5ef22637f389d81b4"
  },
  {
    "url": "/_nuxt/e532691.js",
    "revision": "d6fb6d058bbfe446805ba548d0887fc7"
  },
  {
    "url": "/_nuxt/e5755ac.js",
    "revision": "c4effb41f3b74f5809b0446473af1b16"
  },
  {
    "url": "/_nuxt/ec5e2ff.js",
    "revision": "dbaa44a53361e9687fb941de2d49084d"
  },
  {
    "url": "/_nuxt/eededce.js",
    "revision": "e8788f522c2998f8ee9db5d39257d68c"
  },
  {
    "url": "/_nuxt/f2dc299.js",
    "revision": "bb50eac0ddc66c68208f7d5dd770bcaf"
  },
  {
    "url": "/_nuxt/f3b4246.js",
    "revision": "70e4a26a24d5bcb0d52e89ee1aea421d"
  },
  {
    "url": "/_nuxt/f8abdce.js",
    "revision": "84e638205c10d51cb3069051b8c0ffef"
  }
], {
  "cacheId": "my-project",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
