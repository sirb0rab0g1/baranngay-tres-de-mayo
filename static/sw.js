importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/020652f.js",
    "revision": "4cb715d79cf982ade57fb7db5d0d52b0"
  },
  {
    "url": "/_nuxt/025f937.js",
    "revision": "66294984c0c99b640946608a593a58ff"
  },
  {
    "url": "/_nuxt/08b26ee.js",
    "revision": "6136f59ead71c8d7fb8077e928020610"
  },
  {
    "url": "/_nuxt/0f604ec.js",
    "revision": "98f799d96debae81982cfa893c14c974"
  },
  {
    "url": "/_nuxt/13d8ffa.js",
    "revision": "dd91e3b2f7caee0cf9079e2d409fea6f"
  },
  {
    "url": "/_nuxt/1445127.js",
    "revision": "0919d6c2f795ebb8101529bf72966f76"
  },
  {
    "url": "/_nuxt/237dfce.js",
    "revision": "91e7ec183e5524cecea1a9d12b4a5cfd"
  },
  {
    "url": "/_nuxt/4583312.js",
    "revision": "aa6b8b7c6b3b24cf5a251a2e76813bee"
  },
  {
    "url": "/_nuxt/45a68ba.js",
    "revision": "915ea7299986dad4131c5eb17787b5ad"
  },
  {
    "url": "/_nuxt/4cd32a8.js",
    "revision": "b41cd8b9f55d6eb8ebbb0325c781e9b5"
  },
  {
    "url": "/_nuxt/542cf4b.js",
    "revision": "6f349ab3f9e0f92fb555ba48f465dace"
  },
  {
    "url": "/_nuxt/5c0d89f.js",
    "revision": "3d6033d005cb1fd9ec77a9beaf3afd39"
  },
  {
    "url": "/_nuxt/5fef187.js",
    "revision": "c1e72211f257fadec3cd780d2317d7fc"
  },
  {
    "url": "/_nuxt/611577b.js",
    "revision": "e061f94d24bb9304efcad696e075df5a"
  },
  {
    "url": "/_nuxt/628fb49.js",
    "revision": "08285840dd787844f8edaefe9e1c0567"
  },
  {
    "url": "/_nuxt/69c67c2.js",
    "revision": "c01381dd6fa6b1a2127d1c90939bceab"
  },
  {
    "url": "/_nuxt/6c514b6.js",
    "revision": "2521a5ec4d620379f4514ce98d2bf326"
  },
  {
    "url": "/_nuxt/7763463.js",
    "revision": "171e90ef8c1613949695d9eb95220b5a"
  },
  {
    "url": "/_nuxt/82a6b81.js",
    "revision": "f9fedf1f0966f90608b2ad1dc113b7d6"
  },
  {
    "url": "/_nuxt/9071ea8.js",
    "revision": "d537464947b9dd31d5dfa25adf8d0146"
  },
  {
    "url": "/_nuxt/9075acf.js",
    "revision": "28f24c6c77a3cd4a51b6bb1a618b735f"
  },
  {
    "url": "/_nuxt/95eaf0b.js",
    "revision": "a2beabdee820c4b44a735e08661c37e5"
  },
  {
    "url": "/_nuxt/97f0968.js",
    "revision": "17e3e91a188effa51db47a905a52f707"
  },
  {
    "url": "/_nuxt/9ea14e5.js",
    "revision": "50b599126f279ad167b54966d51a1802"
  },
  {
    "url": "/_nuxt/a835c5d.js",
    "revision": "73efbb038c4137b9d12fd71c207cad40"
  },
  {
    "url": "/_nuxt/aa46968.js",
    "revision": "0bc8d7e5b553ae299c50f06d13d492a0"
  },
  {
    "url": "/_nuxt/ade7be1.js",
    "revision": "81e4ba065f049947c485c3761b579ce4"
  },
  {
    "url": "/_nuxt/b81d1d3.js",
    "revision": "90963a204f9f4c46d4a5513cab09addb"
  },
  {
    "url": "/_nuxt/c5749c5.js",
    "revision": "bbea188270b428e2791d0ffbeeb6aff4"
  },
  {
    "url": "/_nuxt/ca066c7.js",
    "revision": "94ffe9c56f4bbfb5bd22dc8379ba715f"
  },
  {
    "url": "/_nuxt/dfbf116.js",
    "revision": "e20628f30d747aa0118ce1c37526fb5b"
  },
  {
    "url": "/_nuxt/e1001d5.js",
    "revision": "eba0ae39fbec4eb89c33721646d6e771"
  },
  {
    "url": "/_nuxt/e22fab2.js",
    "revision": "355816181e34a54c0458b83ce6e88c39"
  },
  {
    "url": "/_nuxt/e3502f1.js",
    "revision": "2ae03f98c4cff90b7e925c822be77292"
  },
  {
    "url": "/_nuxt/e4baabc.js",
    "revision": "4fc51a0474e42f1355105429c1e35b5c"
  },
  {
    "url": "/_nuxt/e8bd401.js",
    "revision": "2a037f235428ce186725617630ed0a5b"
  },
  {
    "url": "/_nuxt/e9903f5.js",
    "revision": "4254dc86dc862e660add8a05cdd3bf02"
  },
  {
    "url": "/_nuxt/efed2d9.js",
    "revision": "9865cc5ff494214ad564fa5e64e55b7c"
  },
  {
    "url": "/_nuxt/f261dcd.js",
    "revision": "80b86d5be9713683d8ba8ca3f2216e1f"
  },
  {
    "url": "/_nuxt/f346ff2.js",
    "revision": "60e1223c22ea9551c286139e5fa299f3"
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
