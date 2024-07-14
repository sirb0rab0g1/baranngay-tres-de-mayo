importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/1728407.js",
    "revision": "5fb46dabb2f798fa64b126bd876e4daa"
  },
  {
    "url": "/_nuxt/1cc7b15.js",
    "revision": "055a54c92debcd2fd2398a51cf1a90f5"
  },
  {
    "url": "/_nuxt/219e974.js",
    "revision": "151d218d363579ecca4f0669ad26ada0"
  },
  {
    "url": "/_nuxt/2bb55c3.js",
    "revision": "6e38583d8151f457c205e89a28d27804"
  },
  {
    "url": "/_nuxt/3bb6146.js",
    "revision": "c1bb859fdeaeb6e398fa700ff1b85af6"
  },
  {
    "url": "/_nuxt/3dc4d2f.js",
    "revision": "cf9b8f8dc079a6251d031e92a143019c"
  },
  {
    "url": "/_nuxt/42b2a32.js",
    "revision": "c3991203adbb4e15be0156788226a2c7"
  },
  {
    "url": "/_nuxt/48bee7b.js",
    "revision": "eb868d4640020dc4181cba5505b36e7c"
  },
  {
    "url": "/_nuxt/54dd167.js",
    "revision": "75e6efc5425a6cbd763b27eee8c4b052"
  },
  {
    "url": "/_nuxt/57dbe1a.js",
    "revision": "31a247715eef7c6f9381395e9c8c9623"
  },
  {
    "url": "/_nuxt/5f09956.js",
    "revision": "7c083e183efda7e20df15fc322304560"
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
    "url": "/_nuxt/7204f9c.js",
    "revision": "6ed12a1b15440211e44cfdcd2e49f604"
  },
  {
    "url": "/_nuxt/7763463.js",
    "revision": "171e90ef8c1613949695d9eb95220b5a"
  },
  {
    "url": "/_nuxt/79c1e59.js",
    "revision": "30b5c0ebc4103b02bf90d2c4074f685b"
  },
  {
    "url": "/_nuxt/844c465.js",
    "revision": "1a85fef9b42c387a543254231f639e4e"
  },
  {
    "url": "/_nuxt/9071ea8.js",
    "revision": "d537464947b9dd31d5dfa25adf8d0146"
  },
  {
    "url": "/_nuxt/93de103.js",
    "revision": "3d309a17fbf1806fff32f4055eb6440c"
  },
  {
    "url": "/_nuxt/95eaf0b.js",
    "revision": "a2beabdee820c4b44a735e08661c37e5"
  },
  {
    "url": "/_nuxt/9d21671.js",
    "revision": "25c89df722ffc56e5e239e39a73e81c0"
  },
  {
    "url": "/_nuxt/9d95701.js",
    "revision": "b38ed8e7644ea21b34ed1e55e1f0262d"
  },
  {
    "url": "/_nuxt/9ea14e5.js",
    "revision": "50b599126f279ad167b54966d51a1802"
  },
  {
    "url": "/_nuxt/a556998.js",
    "revision": "d34352c9e74e7ee1354b8df55587d545"
  },
  {
    "url": "/_nuxt/a8514ba.js",
    "revision": "ef377f70e401a3cf553f45cd30c8501a"
  },
  {
    "url": "/_nuxt/aa46968.js",
    "revision": "0bc8d7e5b553ae299c50f06d13d492a0"
  },
  {
    "url": "/_nuxt/ac7d14c.js",
    "revision": "812593be60b6934716c6358721c4a2d0"
  },
  {
    "url": "/_nuxt/ad99cea.js",
    "revision": "9a13fb6bf1dff367d648c64d29313ea9"
  },
  {
    "url": "/_nuxt/b47683c.js",
    "revision": "ee9bb93094eca20eb0d18ba4ab15d836"
  },
  {
    "url": "/_nuxt/ba4eef6.js",
    "revision": "993c94ed888bc6f3394da0903afe4393"
  },
  {
    "url": "/_nuxt/bb327d5.js",
    "revision": "593096f76781a49c32c5e184aa93f66a"
  },
  {
    "url": "/_nuxt/c3d211d.js",
    "revision": "596330c97d5552f2fcee2bd0116d6742"
  },
  {
    "url": "/_nuxt/caa8a6f.js",
    "revision": "025f93aafcce68fd45e507effa4821c1"
  },
  {
    "url": "/_nuxt/e1001d5.js",
    "revision": "eba0ae39fbec4eb89c33721646d6e771"
  },
  {
    "url": "/_nuxt/e1fab4c.js",
    "revision": "5ea5cadf89f8e8919d49c2086d536ca4"
  },
  {
    "url": "/_nuxt/e5509ae.js",
    "revision": "b4f69985d26e6c7ef409b89cd86627a0"
  },
  {
    "url": "/_nuxt/ea8a438.js",
    "revision": "a9381d3d2d78ff368832fe578c57e13f"
  },
  {
    "url": "/_nuxt/ec1ad6f.js",
    "revision": "78baf3e121c0016d5dde74c5f99de788"
  },
  {
    "url": "/_nuxt/ec86fa2.js",
    "revision": "978d7dc73a42f96e0fc40978645d83f1"
  },
  {
    "url": "/_nuxt/f6982d3.js",
    "revision": "2c89ba2b30ebe1719edc57a340d6aa49"
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
