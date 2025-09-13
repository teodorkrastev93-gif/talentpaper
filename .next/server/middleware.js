// runtime can't be in strict mode because a global variable is assign and maybe created.
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[826],{

/***/ 903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ nHandler)
});

// NAMESPACE OBJECT: ./next-intl.config.ts
var next_intl_config_namespaceObject = {};
__webpack_require__.r(next_intl_config_namespaceObject);
__webpack_require__.d(next_intl_config_namespaceObject, {
  Z: () => (next_intl_config)
});

// NAMESPACE OBJECT: ./middleware.ts
var middleware_namespaceObject_0 = {};
__webpack_require__.r(middleware_namespaceObject_0);
__webpack_require__.d(middleware_namespaceObject_0, {
  config: () => (config),
  "default": () => (middleware_0)
});

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/globals.js
async function registerInstrumentation() {
    if ("_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && _ENTRIES.middleware_instrumentation.register) {
        try {
            await _ENTRIES.middleware_instrumentation.register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === "then") {
                return {};
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        construct () {
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        apply (_target, _this, args) {
            if (typeof args[0] === "function") {
                return args[0](proxy);
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    // The condition is true when the "process" module is provided
    if (process !== __webpack_require__.g.process) {
        // prefer local process but global.process has correct "env"
        process.env = __webpack_require__.g.process.env;
        __webpack_require__.g.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, "__import_unsupported", {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals(); //# sourceMappingURL=globals.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/error.js
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/utils.js
var utils = __webpack_require__(969);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js

const responseSymbol = Symbol("response");
const passThroughSymbol = Symbol("passThrough");
const waitUntilSymbol = Symbol("waitUntil");
class FetchEvent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_request){
        this[waitUntilSymbol] = [];
        this[passThroughSymbol] = false;
    }
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        this[waitUntilSymbol].push(promise);
    }
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        super(params.request);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
} //# sourceMappingURL=fetch-event.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/next-url.js + 12 modules
var next_url = __webpack_require__(579);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/cookies.js
var spec_extension_cookies = __webpack_require__(72);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/request.js




const INTERNALS = Symbol("internal request");
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        (0,utils/* validateURL */.r4)(url);
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new next_url/* NextURL */.c(url, {
            headers: (0,utils/* toNodeOutgoingHttpHeaders */.lb)(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new spec_extension_cookies/* RequestCookies */.q(this.headers),
            geo: init.geo || {},
            ip: init.ip,
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/response.js
var spec_extension_response = __webpack_require__(444);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js
/**
 * Given a URL as a string and a base URL it will make the URL relative
 * if the parsed protocol and host is the same as the one in the base
 * URL. Otherwise it returns the same URL string.
 */ function relativizeURL(url, base) {
    const baseURL = typeof base === "string" ? new URL(base) : base;
    const relative = new URL(url, base);
    const origin = baseURL.protocol + "//" + baseURL.host;
    return relative.protocol + "//" + relative.host === origin ? relative.toString().replace(origin, "") : relative.toString();
} //# sourceMappingURL=relativize-url.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/app-router-headers.js
const RSC = "RSC";
const ACTION = "Next-Action";
const NEXT_ROUTER_STATE_TREE = "Next-Router-State-Tree";
const NEXT_ROUTER_PREFETCH = "Next-Router-Prefetch";
const NEXT_URL = "Next-Url";
const RSC_CONTENT_TYPE_HEADER = "text/x-component";
const RSC_VARY_HEADER = RSC + ", " + NEXT_ROUTER_STATE_TREE + ", " + NEXT_ROUTER_PREFETCH + ", " + NEXT_URL;
const FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
const NEXT_RSC_UNION_QUERY = "_rsc"; //# sourceMappingURL=app-router-headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/internal-utils.js

const INTERNAL_QUERY_NAMES = [
    "__nextFallback",
    "__nextLocale",
    "__nextInferredLocaleFromDefault",
    "__nextDefaultLocale",
    "__nextIsNotFound",
    NEXT_RSC_UNION_QUERY
];
const EDGE_EXTENDED_INTERNAL_QUERY_NAMES = [
    "__nextDataReq"
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url, isEdge) {
    const isStringUrl = typeof url === "string";
    const instance = isStringUrl ? new URL(url) : url;
    for (const name of INTERNAL_QUERY_NAMES){
        instance.searchParams.delete(name);
    }
    if (isEdge) {
        for (const name of EDGE_EXTENDED_INTERNAL_QUERY_NAMES){
            instance.searchParams.delete(name);
        }
    }
    return isStringUrl ? instance.toString() : instance;
}
/**
 * Headers that are set by the Next.js server and should be stripped from the
 * request headers going to the user's application.
 */ const INTERNAL_HEADERS = (/* unused pure expression or super */ null && ([
    "x-invoke-path",
    "x-invoke-status",
    "x-invoke-error",
    "x-invoke-query",
    "x-invoke-output",
    "x-middleware-invoke"
]));
/**
 * Strip internal headers from the request headers.
 *
 * @param headers the headers to strip of internal headers
 */ function stripInternalHeaders(headers) {
    for (const key of INTERNAL_HEADERS){
        delete headers[key];
    }
} //# sourceMappingURL=internal-utils.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js


/**
 * Normalizes an app route so it represents the actual request path. Essentially
 * performing the following transformations:
 *
 * - `/(dashboard)/user/[id]/page` to `/user/[id]`
 * - `/(dashboard)/account/page` to `/account`
 * - `/user/[id]/page` to `/user/[id]`
 * - `/account/page` to `/account`
 * - `/page` to `/`
 * - `/(dashboard)/user/[id]/route` to `/user/[id]`
 * - `/(dashboard)/account/route` to `/account`
 * - `/user/[id]/route` to `/user/[id]`
 * - `/account/route` to `/account`
 * - `/route` to `/`
 * - `/` to `/`
 *
 * @param route the app route to normalize
 * @returns the normalized pathname
 */ function normalizeAppPath(route) {
    return ensureLeadingSlash(route.split("/").reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (isGroupSegment(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === "@") {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ""));
}
/**
 * Strips the `.rsc` extension if it's in the pathname.
 * Since this function is used on full urls it checks `?` for searchParams handling.
 */ function normalizeRscPath(pathname, enabled) {
    return enabled ? pathname.replace(/\.rsc($|\?)/, "$1") : pathname;
} //# sourceMappingURL=app-paths.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/lib/constants.js
const NEXT_QUERY_PARAM_PREFIX = "nxtP";
const PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
const NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
const NEXT_CACHE_SOFT_TAGS_HEADER = "x-next-cache-soft-tags";
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
// in seconds
const CACHE_ONE_YEAR = 31536000;
// Patterns to detect middleware files
const MIDDLEWARE_FILENAME = "middleware";
const MIDDLEWARE_LOCATION_REGEXP = (/* unused pure expression or super */ null && (`(?:src/)?${MIDDLEWARE_FILENAME}`));
// Pattern to detect instrumentation hooks file
const INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
// Because on Windows absolute paths in the generated code can break because of numbers, eg 1 in the path,
// we have to use a private alias
const PAGES_DIR_ALIAS = "private-next-pages";
const DOT_NEXT_ALIAS = "private-dot-next";
const ROOT_DIR_ALIAS = "private-next-root-dir";
const APP_DIR_ALIAS = "private-next-app-dir";
const RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
const RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
const RSC_ACTION_PROXY_ALIAS = "private-next-rsc-action-proxy";
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = (/* unused pure expression or super */ null && (`You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`));
const SSG_GET_INITIAL_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`));
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`));
const SERVER_PROPS_SSG_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`));
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = (/* unused pure expression or super */ null && (`can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`));
const SERVER_PROPS_EXPORT_ERROR = (/* unused pure expression or super */ null && (`pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`));
const GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
const GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
const UNSTABLE_REVALIDATE_RENAME_ERROR = (/* unused pure expression or super */ null && ("The `unstable_revalidate` property is available for general use.\n" + "Please use `revalidate` instead."));
const GSSP_COMPONENT_MEMBER_ERROR = (/* unused pure expression or super */ null && (`can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`));
const NON_STANDARD_NODE_ENV = (/* unused pure expression or super */ null && (`You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`));
const SSG_FALLBACK_EXPORT_ERROR = (/* unused pure expression or super */ null && (`Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`));
const ESLINT_DEFAULT_DIRS = (/* unused pure expression or super */ null && ([
    "app",
    "pages",
    "components",
    "lib",
    "src"
]));
const ESLINT_PROMPT_VALUES = [
    {
        title: "Strict",
        recommended: true,
        config: {
            extends: "next/core-web-vitals"
        }
    },
    {
        title: "Base",
        config: {
            extends: "next"
        }
    },
    {
        title: "Cancel",
        config: null
    }
];
const SERVER_RUNTIME = {
    edge: "edge",
    experimentalEdge: "experimental-edge",
    nodejs: "nodejs"
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: "shared",
    /**
   * React Server Components layer (rsc).
   */ reactServerComponents: "rsc",
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: "ssr",
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: "action-browser",
    /**
   * The layer for the API routes.
   */ api: "api",
    /**
   * The layer for the middleware code.
   */ middleware: "middleware",
    /**
   * The layer for assets on the edge.
   */ edgeAsset: "edge-asset",
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: "app-pages-browser",
    /**
   * The server bundle layer for metadata routes.
   */ appMetadataRoute: "app-metadata-route",
    /**
   * The layer for the server bundle for App Route handlers.
   */ appRouteHandler: "app-route-handler"
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        server: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler
        ],
        nonClientServerTarget: [
            // plus middleware and pages api
            WEBPACK_LAYERS_NAMES.middleware,
            WEBPACK_LAYERS_NAMES.api
        ],
        app: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: "__next_edge_ssr_entry__",
    metadata: "__next_metadata__",
    metadataRoute: "__next_metadata_route__",
    metadataImageMeta: "__next_metadata_image_meta__"
};
 //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js

/**
 * @internal
 */ class ReadonlyHeadersError extends Error {
    constructor(){
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === "symbol") {
                    return ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === "undefined") return;
                // If the original casing exists, return the value.
                return ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === "symbol") {
                    return ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === "undefined") return false;
                // If the original casing exists, return true.
                return ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === "undefined") return true;
                // If the original casing exists, delete the property.
                return ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case "append":
                    case "delete":
                    case "set":
                        return ReadonlyHeadersError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(", ");
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === "string") {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== "undefined") return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== "undefined";
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js


/**
 * @internal
 */ class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case "clear":
                    case "delete":
                    case "set":
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookes = new spec_extension_cookies/* ResponseCookies */.n(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookes.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            var _fetch___nextGetStaticStore;
            // TODO-APP: change method of getting staticGenerationAsyncStore
            const staticGenerationAsyncStore = fetch.__nextGetStaticStore == null ? void 0 : (_fetch___nextGetStaticStore = fetch.__nextGetStaticStore.call(fetch)) == null ? void 0 : _fetch___nextGetStaticStore.getStore();
            if (staticGenerationAsyncStore) {
                staticGenerationAsyncStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookes.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new spec_extension_cookies/* ResponseCookies */.n(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        return new Proxy(responseCookes, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case "delete":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case "set":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                return target.set(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
} //# sourceMappingURL=request-cookies.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/api-utils/index.js


/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */ function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */ function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === "string") {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== "number" || typeof url !== "string") {
        throw new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`);
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = HeadersAdapter.from(req.headers);
    const previewModeId = headers.get(PRERENDER_REVALIDATE_HEADER);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = (/* unused pure expression or super */ null && (4 * 1024 * 1024));
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __webpack_require__(842);
    const previous = res.getHeader("Set-Cookie");
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === "string" ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
/**
 * Custom error class
 */ class ApiError extends (/* unused pure expression or super */ null && (Error)) {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */ function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */ function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js

class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && checkIsOnDemandRevalidate(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(COOKIE_NAME_PRERENDER_BYPASS)) == null ? void 0 : _cookies_get.value;
        this.isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && cookieValue === previewProps.previewModeId);
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    enable() {
        if (!this._previewModeId) {
            throw new Error("Invariant: previewProps missing previewModeId this should never happen");
        }
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: this._previewModeId,
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/"
        });
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: "",
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            expires: new Date(0)
        });
    }
} //# sourceMappingURL=draft-mode-provider.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js





function getHeaders(headers) {
    const cleaned = HeadersAdapter.from(headers);
    for (const param of FLIGHT_PARAMETERS){
        cleaned.delete(param.toString().toLowerCase());
    }
    return HeadersAdapter.seal(cleaned);
}
function getCookies(headers) {
    const cookies = new spec_extension_cookies/* RequestCookies */.q(HeadersAdapter.from(headers));
    return RequestCookiesAdapter.seal(cookies);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new spec_extension_cookies/* RequestCookies */.q(HeadersAdapter.from(headers));
    return MutableRequestCookiesAdapter.wrap(cookies, onUpdateCookies);
}
const RequestAsyncStorageWrapper = {
    /**
   * Wrap the callback with the given store so it can access the underlying
   * store using hooks.
   *
   * @param storage underlying storage object returned by the module
   * @param context context to seed the store
   * @param callback function to call within the scope of the context
   * @returns the result returned by the callback
   */ wrap (storage, { req, res, renderOpts }, callback) {
        let previewProps = undefined;
        if (renderOpts && "previewProps" in renderOpts) {
            // TODO: investigate why previewProps isn't on RenderOpts
            previewProps = renderOpts.previewProps;
        }
        function defaultOnUpdateCookies(cookies) {
            if (res) {
                res.setHeader("Set-Cookie", cookies);
            }
        }
        const cache = {};
        const store = {
            get headers () {
                if (!cache.headers) {
                    // Seal the headers object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.headers = getHeaders(req.headers);
                }
                return cache.headers;
            },
            get cookies () {
                if (!cache.cookies) {
                    // Seal the cookies object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.cookies = getCookies(req.headers);
                }
                return cache.cookies;
            },
            get mutableCookies () {
                if (!cache.mutableCookies) {
                    cache.mutableCookies = getMutableCookies(req.headers, (renderOpts == null ? void 0 : renderOpts.onUpdateCookies) || (res ? defaultOnUpdateCookies : undefined));
                }
                return cache.mutableCookies;
            },
            get draftMode () {
                if (!cache.draftMode) {
                    cache.draftMode = new DraftModeProvider(previewProps, req, this.cookies, this.mutableCookies);
                }
                return cache.draftMode;
            }
        };
        return storage.run(store, callback, store);
    }
}; //# sourceMappingURL=request-async-storage-wrapper.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/async-local-storage.js
const sharedAsyncLocalStorageNotAvailableError = new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
}
const maybeGlobalAsyncLocalStorage = globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
} //# sourceMappingURL=async-local-storage.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/request-async-storage.external.js

const requestAsyncStorage = createAsyncLocalStorage(); //# sourceMappingURL=request-async-storage.external.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/adapter.js















class NextRequestHint extends NextRequest {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    waitUntil() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
}
const adapter_FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
async function adapter(params) {
    await ensureInstrumentationRegistered();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof self.__BUILD_MANIFEST !== "undefined";
    const prerenderManifest = typeof self.__PRERENDER_MANIFEST === "string" ? JSON.parse(self.__PRERENDER_MANIFEST) : undefined;
    params.request.url = normalizeRscPath(params.request.url, true);
    const requestUrl = new next_url/* NextURL */.c(params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestUrl.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestUrl.searchParams.getAll(key);
        if (key !== NEXT_QUERY_PARAM_PREFIX && key.startsWith(NEXT_QUERY_PARAM_PREFIX)) {
            const normalizedKey = key.substring(NEXT_QUERY_PARAM_PREFIX.length);
            requestUrl.searchParams.delete(normalizedKey);
            for (const val of value){
                requestUrl.searchParams.append(normalizedKey, val);
            }
            requestUrl.searchParams.delete(key);
        }
    }
    // Ensure users only see page requests, never data requests.
    const buildId = requestUrl.buildId;
    requestUrl.buildId = "";
    const isDataReq = params.request.headers["x-nextjs-data"];
    if (isDataReq && requestUrl.pathname === "/index") {
        requestUrl.pathname = "/";
    }
    const requestHeaders = (0,utils/* fromNodeOutgoingHttpHeaders */.EK)(params.request.headers);
    const flightHeaders = new Map();
    // Parameters should only be stripped for middleware
    if (!isEdgeRendering) {
        for (const param of adapter_FLIGHT_PARAMETERS){
            const key = param.toString().toLowerCase();
            const value = requestHeaders.get(key);
            if (value) {
                flightHeaders.set(key, requestHeaders.get(key));
                requestHeaders.delete(key);
            }
        }
    }
    const normalizeUrl =  false ? 0 : requestUrl;
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input: stripInternalSearchParams(normalizeUrl, true).toString(),
        init: {
            body: params.request.body,
            geo: params.request.geo,
            headers: requestHeaders,
            ip: params.request.ip,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isDataReq) {
        Object.defineProperty(request, "__isData", {
            enumerable: false,
            value: true
        });
    }
    if (!globalThis.__incrementalCache && params.IncrementalCache) {
        globalThis.__incrementalCache = new params.IncrementalCache({
            appDir: true,
            fetchCache: true,
            minimalMode: "production" !== "development",
            fetchCacheKeyPrefix: undefined,
            dev: "production" === "development",
            requestHeaders: params.request.headers,
            requestProtocol: "https",
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: {
                        previewModeId: "development-id"
                    }
                };
            }
        });
    }
    const event = new NextFetchEvent({
        request,
        page: params.page
    });
    let response;
    let cookiesFromResponse;
    // we only care to make async storage available for middleware
    const isMiddleware = params.page === "/middleware" || params.page === "/src/middleware";
    if (isMiddleware) {
        response = await RequestAsyncStorageWrapper.wrap(requestAsyncStorage, {
            req: request,
            renderOpts: {
                onUpdateCookies: (cookies)=>{
                    cookiesFromResponse = cookies;
                },
                // @ts-expect-error: TODO: investigate why previewProps isn't on RenderOpts
                previewProps: (prerenderManifest == null ? void 0 : prerenderManifest.preview) || {
                    previewModeId: "development-id",
                    previewModeEncryptionKey: "",
                    previewModeSigningKey: ""
                }
            }
        }, ()=>params.handler(request, event));
    } else {
        response = await params.handler(request, event);
    }
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw new TypeError("Expected an instance of Response to be returned");
    }
    if (response && cookiesFromResponse) {
        response.headers.set("set-cookie", cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get("x-middleware-rewrite");
    if (response && rewrite) {
        const rewriteUrl = new next_url/* NextURL */.c(rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if (true) {
            if (rewriteUrl.host === request.nextUrl.host) {
                rewriteUrl.buildId = buildId || rewriteUrl.buildId;
                response.headers.set("x-middleware-rewrite", String(rewriteUrl));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const relativizedRewrite = relativizeURL(String(rewriteUrl), String(requestUrl));
        if (isDataReq && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !(undefined && 0)) {
            response.headers.set("x-nextjs-rewrite", relativizedRewrite);
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get("Location");
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new next_url/* NextURL */.c(redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (true) {
            if (redirectURL.host === request.nextUrl.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set("Location", String(redirectURL));
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isDataReq) {
            response.headers.delete("Location");
            response.headers.set("x-nextjs-redirect", relativizeURL(String(redirectURL), String(requestUrl)));
        }
    }
    const finalResponse = response ? response : spec_extension_response/* NextResponse */.x.next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get("x-middleware-override-headers");
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set("x-middleware-override-headers", middlewareOverrideHeaders + "," + overwrittenHeaders.join(","));
        }
    }
    return {
        response: finalResponse,
        waitUntil: Promise.all(event[waitUntilSymbol]),
        fetchMetrics: request.fetchMetrics
    };
} //# sourceMappingURL=adapter.js.map

// EXTERNAL MODULE: ./node_modules/next-intl/dist/production/middleware.js
var middleware = __webpack_require__(744);
;// CONCATENATED MODULE: ./next-intl.config.ts

/* harmony default export */ const next_intl_config = ((0,next_intl_config_namespaceObject.defineConfig)({
    locales: [
        "en",
        "bg",
        "ro",
        "es",
        "fr",
        "de"
    ],
    defaultLocale: "en",
    messagesDir: "./messages"
}));

;// CONCATENATED MODULE: ./middleware.ts


/* harmony default export */ const middleware_0 = ((0,middleware/* default */.Z)(next_intl_config));
const config = {
    matcher: [
        "/((?!_next|.*\\..*).*)"
    ]
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=private-next-root-dir%2Fmiddleware.ts&page=%2Fmiddleware&rootDir=%2FUsers%2Fteodorkrastev%2FDesktop%2FDocuments%2Fprojectnew%2FTalent_Paper%2Ftalentpaper_complete_final&matchers=W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyFfbmV4dHwuKlxcLi4qKS4qKSkoLmpzb24pP1tcXC8jXFw%2FXT8kIiwib3JpZ2luYWxTb3VyY2UiOiIvKCg%2FIV9uZXh0fC4qXFwuLiopLiopIn1d&preferredRegion=&middlewareConfig=eyJtYXRjaGVycyI6W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpPyg%2FOlxcLygoPyFfbmV4dHwuKlxcLi4qKS4qKSkoLmpzb24pP1tcXC8jXFw%2FXT8kIiwib3JpZ2luYWxTb3VyY2UiOiIvKCg%2FIV9uZXh0fC4qXFwuLiopLiopIn1dfQ%3D%3D!


// Import the userland code.

const mod = {
    ...middleware_namespaceObject_0
};
const handler = mod.middleware || mod.default;
const page = "/middleware";
if (typeof handler !== "function") {
    throw new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`);
}
function nHandler(opts) {
    return adapter({
        ...opts,
        page,
        handler
    });
}

//# sourceMappingURL=middleware.js.map

/***/ }),

/***/ 141:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  LookupSupportedLocales: () => (/* reexport */ LookupSupportedLocales),
  ResolveLocale: () => (/* reexport */ ResolveLocale),
  match: () => (/* binding */ match)
});

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeLocaleList.js
/**
 * http://ecma-international.org/ecma-402/7.0/index.html#sec-canonicalizelocalelist
 * @param locales
 */ function CanonicalizeLocaleList(locales) {
    return Intl.getCanonicalLocales(locales);
}

;// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.mjs
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
/** @deprecated */ function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
/** @deprecated */ function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
/* harmony default export */ const tslib_es6 = ({
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
});

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/languageMatching.js
var languageMatching_data = {
    supplemental: {
        languageMatching: {
            "written-new": [
                {
                    paradigmLocales: {
                        _locales: "en en_GB es es_419 pt_BR pt_PT"
                    }
                },
                {
                    $enUS: {
                        _value: "AS+CA+GU+MH+MP+PH+PR+UM+US+VI"
                    }
                },
                {
                    $cnsar: {
                        _value: "HK+MO"
                    }
                },
                {
                    $americas: {
                        _value: "019"
                    }
                },
                {
                    $maghreb: {
                        _value: "MA+DZ+TN+LY+MR+EH"
                    }
                },
                {
                    no: {
                        _desired: "nb",
                        _distance: "1"
                    }
                },
                {
                    bs: {
                        _desired: "hr",
                        _distance: "4"
                    }
                },
                {
                    bs: {
                        _desired: "sh",
                        _distance: "4"
                    }
                },
                {
                    hr: {
                        _desired: "sh",
                        _distance: "4"
                    }
                },
                {
                    sr: {
                        _desired: "sh",
                        _distance: "4"
                    }
                },
                {
                    aa: {
                        _desired: "ssy",
                        _distance: "4"
                    }
                },
                {
                    de: {
                        _desired: "gsw",
                        _distance: "4",
                        _oneway: "true"
                    }
                },
                {
                    de: {
                        _desired: "lb",
                        _distance: "4",
                        _oneway: "true"
                    }
                },
                {
                    no: {
                        _desired: "da",
                        _distance: "8"
                    }
                },
                {
                    nb: {
                        _desired: "da",
                        _distance: "8"
                    }
                },
                {
                    ru: {
                        _desired: "ab",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ach",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    nl: {
                        _desired: "af",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ak",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "am",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    es: {
                        _desired: "ay",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "az",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ur: {
                        _desired: "bal",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "be",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "bem",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    hi: {
                        _desired: "bh",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "bn",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "bo",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "br",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    es: {
                        _desired: "ca",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    fil: {
                        _desired: "ceb",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "chr",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ckb",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "co",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "crs",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    sk: {
                        _desired: "cs",
                        _distance: "20"
                    }
                },
                {
                    en: {
                        _desired: "cy",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ee",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "eo",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    es: {
                        _desired: "eu",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    da: {
                        _desired: "fo",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    nl: {
                        _desired: "fy",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ga",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "gaa",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "gd",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    es: {
                        _desired: "gl",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    es: {
                        _desired: "gn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    hi: {
                        _desired: "gu",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ha",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "haw",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "ht",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "hy",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ia",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ig",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "is",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    id: {
                        _desired: "jv",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ka",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "kg",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "kk",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "km",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "kn",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "kri",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    tr: {
                        _desired: "ku",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "ky",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    it: {
                        _desired: "la",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "lg",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "ln",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "lo",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "loz",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "lua",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    hi: {
                        _desired: "mai",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "mfe",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "mg",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "mi",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ml",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "mn",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    hi: {
                        _desired: "mr",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    id: {
                        _desired: "ms",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "mt",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "my",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ne",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    nb: {
                        _desired: "nn",
                        _distance: "20"
                    }
                },
                {
                    no: {
                        _desired: "nn",
                        _distance: "20"
                    }
                },
                {
                    en: {
                        _desired: "nso",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ny",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "nyn",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "oc",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "om",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "or",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "pa",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "pcm",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ps",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    es: {
                        _desired: "qu",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    de: {
                        _desired: "rm",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "rn",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "rw",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    hi: {
                        _desired: "sa",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "sd",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "si",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "sn",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "so",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "sq",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "st",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    id: {
                        _desired: "su",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "sw",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ta",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "te",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "tg",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ti",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "tk",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "tlh",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "tn",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "to",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "tt",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "tum",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "ug",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "uk",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "ur",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ru: {
                        _desired: "uz",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    fr: {
                        _desired: "wo",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "xh",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "yi",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "yo",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "za",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    en: {
                        _desired: "zu",
                        _distance: "30",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "aao",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "abh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "abv",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "acm",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "acq",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "acw",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "acx",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "acy",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "adf",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "aeb",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "aec",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "afb",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ajp",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "apc",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "apd",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "arq",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ars",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ary",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "arz",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "auz",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "avl",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ayh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ayl",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ayn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ayp",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "bbz",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "pga",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "shu",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ar: {
                        _desired: "ssh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    az: {
                        _desired: "azb",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    et: {
                        _desired: "vro",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ff: {
                        _desired: "ffm",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ff: {
                        _desired: "fub",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ff: {
                        _desired: "fue",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ff: {
                        _desired: "fuf",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ff: {
                        _desired: "fuh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ff: {
                        _desired: "fui",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ff: {
                        _desired: "fuq",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ff: {
                        _desired: "fuv",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    gn: {
                        _desired: "gnw",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    gn: {
                        _desired: "gui",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    gn: {
                        _desired: "gun",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    gn: {
                        _desired: "nhd",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    iu: {
                        _desired: "ikt",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kln: {
                        _desired: "enb",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kln: {
                        _desired: "eyo",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kln: {
                        _desired: "niq",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kln: {
                        _desired: "oki",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kln: {
                        _desired: "pko",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kln: {
                        _desired: "sgc",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kln: {
                        _desired: "tec",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kln: {
                        _desired: "tuy",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kok: {
                        _desired: "gom",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    kpe: {
                        _desired: "gkp",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "ida",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lkb",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lko",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lks",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lri",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lrm",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lsm",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lto",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lts",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "lwg",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "nle",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "nyd",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    luy: {
                        _desired: "rag",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    lv: {
                        _desired: "ltg",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "bhr",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "bjq",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "bmm",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "bzc",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "msh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "skg",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "tdx",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "tkg",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "txy",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "xmv",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mg: {
                        _desired: "xmw",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    mn: {
                        _desired: "mvf",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "bjn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "btj",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "bve",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "bvu",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "coa",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "dup",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "hji",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "id",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "jak",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "jax",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "kvb",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "kvr",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "kxd",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "lce",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "lcf",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "liw",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "max",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "meo",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "mfa",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "mfb",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "min",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "mqg",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "msi",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "mui",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "orn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "ors",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "pel",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "pse",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "tmw",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "urk",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "vkk",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "vkt",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "xmm",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "zlm",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ms: {
                        _desired: "zmi",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ne: {
                        _desired: "dty",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    om: {
                        _desired: "gax",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    om: {
                        _desired: "hae",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    om: {
                        _desired: "orc",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    or: {
                        _desired: "spv",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ps: {
                        _desired: "pbt",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    ps: {
                        _desired: "pst",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qub",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qud",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "quf",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qug",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "quh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "quk",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qul",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qup",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qur",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qus",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "quw",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qux",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "quy",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qva",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvc",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qve",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvi",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvj",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvl",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvm",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvo",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvp",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvs",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvw",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qvz",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qwa",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qwc",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qwh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qws",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxa",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxc",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxl",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxo",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxp",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxr",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxt",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxu",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    qu: {
                        _desired: "qxw",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    sc: {
                        _desired: "sdc",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    sc: {
                        _desired: "sdn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    sc: {
                        _desired: "sro",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    sq: {
                        _desired: "aae",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    sq: {
                        _desired: "aat",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    sq: {
                        _desired: "aln",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    syr: {
                        _desired: "aii",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    uz: {
                        _desired: "uzs",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    yi: {
                        _desired: "yih",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "cdo",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "cjy",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "cpx",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "czh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "czo",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "gan",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "hak",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "hsn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "lzh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "mnp",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "nan",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "wuu",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    zh: {
                        _desired: "yue",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "*": {
                        _desired: "*",
                        _distance: "80"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "am-Ethi",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "ru-Cyrl": {
                        _desired: "az-Latn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "bn-Beng",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "zh-Hans": {
                        _desired: "bo-Tibt",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "ru-Cyrl": {
                        _desired: "hy-Armn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "ka-Geor",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "km-Khmr",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "kn-Knda",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "lo-Laoo",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "ml-Mlym",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "my-Mymr",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "ne-Deva",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "or-Orya",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "pa-Guru",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "ps-Arab",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "sd-Arab",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "si-Sinh",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "ta-Taml",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "te-Telu",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "ti-Ethi",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "ru-Cyrl": {
                        _desired: "tk-Latn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "ur-Arab",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "ru-Cyrl": {
                        _desired: "uz-Latn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "en-Latn": {
                        _desired: "yi-Hebr",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "sr-Cyrl": {
                        _desired: "sr-Latn",
                        _distance: "5"
                    }
                },
                {
                    "zh-Hans": {
                        _desired: "za-Latn",
                        _distance: "10",
                        _oneway: "true"
                    }
                },
                {
                    "zh-Hans": {
                        _desired: "zh-Hani",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "zh-Hant": {
                        _desired: "zh-Hani",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "ar-Arab": {
                        _desired: "ar-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "bn-Beng": {
                        _desired: "bn-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "gu-Gujr": {
                        _desired: "gu-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "hi-Deva": {
                        _desired: "hi-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "kn-Knda": {
                        _desired: "kn-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "ml-Mlym": {
                        _desired: "ml-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "mr-Deva": {
                        _desired: "mr-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "ta-Taml": {
                        _desired: "ta-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "te-Telu": {
                        _desired: "te-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "zh-Hans": {
                        _desired: "zh-Latn",
                        _distance: "20",
                        _oneway: "true"
                    }
                },
                {
                    "ja-Jpan": {
                        _desired: "ja-Latn",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ja-Jpan": {
                        _desired: "ja-Hani",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ja-Jpan": {
                        _desired: "ja-Hira",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ja-Jpan": {
                        _desired: "ja-Kana",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ja-Jpan": {
                        _desired: "ja-Hrkt",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ja-Hrkt": {
                        _desired: "ja-Hira",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ja-Hrkt": {
                        _desired: "ja-Kana",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ko-Kore": {
                        _desired: "ko-Hani",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ko-Kore": {
                        _desired: "ko-Hang",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ko-Kore": {
                        _desired: "ko-Jamo",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "ko-Hang": {
                        _desired: "ko-Jamo",
                        _distance: "5",
                        _oneway: "true"
                    }
                },
                {
                    "*-*": {
                        _desired: "*-*",
                        _distance: "50"
                    }
                },
                {
                    "ar-*-$maghreb": {
                        _desired: "ar-*-$maghreb",
                        _distance: "4"
                    }
                },
                {
                    "ar-*-$!maghreb": {
                        _desired: "ar-*-$!maghreb",
                        _distance: "4"
                    }
                },
                {
                    "ar-*-*": {
                        _desired: "ar-*-*",
                        _distance: "5"
                    }
                },
                {
                    "en-*-$enUS": {
                        _desired: "en-*-$enUS",
                        _distance: "4"
                    }
                },
                {
                    "en-*-GB": {
                        _desired: "en-*-$!enUS",
                        _distance: "3"
                    }
                },
                {
                    "en-*-$!enUS": {
                        _desired: "en-*-$!enUS",
                        _distance: "4"
                    }
                },
                {
                    "en-*-*": {
                        _desired: "en-*-*",
                        _distance: "5"
                    }
                },
                {
                    "es-*-$americas": {
                        _desired: "es-*-$americas",
                        _distance: "4"
                    }
                },
                {
                    "es-*-$!americas": {
                        _desired: "es-*-$!americas",
                        _distance: "4"
                    }
                },
                {
                    "es-*-*": {
                        _desired: "es-*-*",
                        _distance: "5"
                    }
                },
                {
                    "pt-*-$americas": {
                        _desired: "pt-*-$americas",
                        _distance: "4"
                    }
                },
                {
                    "pt-*-$!americas": {
                        _desired: "pt-*-$!americas",
                        _distance: "4"
                    }
                },
                {
                    "pt-*-*": {
                        _desired: "pt-*-*",
                        _distance: "5"
                    }
                },
                {
                    "zh-Hant-$cnsar": {
                        _desired: "zh-Hant-$cnsar",
                        _distance: "4"
                    }
                },
                {
                    "zh-Hant-$!cnsar": {
                        _desired: "zh-Hant-$!cnsar",
                        _distance: "4"
                    }
                },
                {
                    "zh-Hant-*": {
                        _desired: "zh-Hant-*",
                        _distance: "5"
                    }
                },
                {
                    "*-*-*": {
                        _desired: "*-*-*",
                        _distance: "4"
                    }
                }
            ]
        }
    }
};

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/regions.generated.js
// This file is generated from regions-gen.ts
var regions = {
    "001": [
        "001",
        "001-status-grouping",
        "002",
        "005",
        "009",
        "011",
        "013",
        "014",
        "015",
        "017",
        "018",
        "019",
        "021",
        "029",
        "030",
        "034",
        "035",
        "039",
        "053",
        "054",
        "057",
        "061",
        "142",
        "143",
        "145",
        "150",
        "151",
        "154",
        "155",
        "AC",
        "AD",
        "AE",
        "AF",
        "AG",
        "AI",
        "AL",
        "AM",
        "AO",
        "AQ",
        "AR",
        "AS",
        "AT",
        "AU",
        "AW",
        "AX",
        "AZ",
        "BA",
        "BB",
        "BD",
        "BE",
        "BF",
        "BG",
        "BH",
        "BI",
        "BJ",
        "BL",
        "BM",
        "BN",
        "BO",
        "BQ",
        "BR",
        "BS",
        "BT",
        "BV",
        "BW",
        "BY",
        "BZ",
        "CA",
        "CC",
        "CD",
        "CF",
        "CG",
        "CH",
        "CI",
        "CK",
        "CL",
        "CM",
        "CN",
        "CO",
        "CP",
        "CQ",
        "CR",
        "CU",
        "CV",
        "CW",
        "CX",
        "CY",
        "CZ",
        "DE",
        "DG",
        "DJ",
        "DK",
        "DM",
        "DO",
        "DZ",
        "EA",
        "EC",
        "EE",
        "EG",
        "EH",
        "ER",
        "ES",
        "ET",
        "EU",
        "EZ",
        "FI",
        "FJ",
        "FK",
        "FM",
        "FO",
        "FR",
        "GA",
        "GB",
        "GD",
        "GE",
        "GF",
        "GG",
        "GH",
        "GI",
        "GL",
        "GM",
        "GN",
        "GP",
        "GQ",
        "GR",
        "GS",
        "GT",
        "GU",
        "GW",
        "GY",
        "HK",
        "HM",
        "HN",
        "HR",
        "HT",
        "HU",
        "IC",
        "ID",
        "IE",
        "IL",
        "IM",
        "IN",
        "IO",
        "IQ",
        "IR",
        "IS",
        "IT",
        "JE",
        "JM",
        "JO",
        "JP",
        "KE",
        "KG",
        "KH",
        "KI",
        "KM",
        "KN",
        "KP",
        "KR",
        "KW",
        "KY",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LI",
        "LK",
        "LR",
        "LS",
        "LT",
        "LU",
        "LV",
        "LY",
        "MA",
        "MC",
        "MD",
        "ME",
        "MF",
        "MG",
        "MH",
        "MK",
        "ML",
        "MM",
        "MN",
        "MO",
        "MP",
        "MQ",
        "MR",
        "MS",
        "MT",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NC",
        "NE",
        "NF",
        "NG",
        "NI",
        "NL",
        "NO",
        "NP",
        "NR",
        "NU",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PF",
        "PG",
        "PH",
        "PK",
        "PL",
        "PM",
        "PN",
        "PR",
        "PS",
        "PT",
        "PW",
        "PY",
        "QA",
        "QO",
        "RE",
        "RO",
        "RS",
        "RU",
        "RW",
        "SA",
        "SB",
        "SC",
        "SD",
        "SE",
        "SG",
        "SH",
        "SI",
        "SJ",
        "SK",
        "SL",
        "SM",
        "SN",
        "SO",
        "SR",
        "SS",
        "ST",
        "SV",
        "SX",
        "SY",
        "SZ",
        "TA",
        "TC",
        "TD",
        "TF",
        "TG",
        "TH",
        "TJ",
        "TK",
        "TL",
        "TM",
        "TN",
        "TO",
        "TR",
        "TT",
        "TV",
        "TW",
        "TZ",
        "UA",
        "UG",
        "UM",
        "UN",
        "US",
        "UY",
        "UZ",
        "VA",
        "VC",
        "VE",
        "VG",
        "VI",
        "VN",
        "VU",
        "WF",
        "WS",
        "XK",
        "YE",
        "YT",
        "ZA",
        "ZM",
        "ZW"
    ],
    "002": [
        "002",
        "002-status-grouping",
        "011",
        "014",
        "015",
        "017",
        "018",
        "202",
        "AO",
        "BF",
        "BI",
        "BJ",
        "BW",
        "CD",
        "CF",
        "CG",
        "CI",
        "CM",
        "CV",
        "DJ",
        "DZ",
        "EA",
        "EG",
        "EH",
        "ER",
        "ET",
        "GA",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GW",
        "IC",
        "IO",
        "KE",
        "KM",
        "LR",
        "LS",
        "LY",
        "MA",
        "MG",
        "ML",
        "MR",
        "MU",
        "MW",
        "MZ",
        "NA",
        "NE",
        "NG",
        "RE",
        "RW",
        "SC",
        "SD",
        "SH",
        "SL",
        "SN",
        "SO",
        "SS",
        "ST",
        "SZ",
        "TD",
        "TF",
        "TG",
        "TN",
        "TZ",
        "UG",
        "YT",
        "ZA",
        "ZM",
        "ZW"
    ],
    "003": [
        "003",
        "013",
        "021",
        "029",
        "AG",
        "AI",
        "AW",
        "BB",
        "BL",
        "BM",
        "BQ",
        "BS",
        "BZ",
        "CA",
        "CR",
        "CU",
        "CW",
        "DM",
        "DO",
        "GD",
        "GL",
        "GP",
        "GT",
        "HN",
        "HT",
        "JM",
        "KN",
        "KY",
        "LC",
        "MF",
        "MQ",
        "MS",
        "MX",
        "NI",
        "PA",
        "PM",
        "PR",
        "SV",
        "SX",
        "TC",
        "TT",
        "US",
        "VC",
        "VG",
        "VI"
    ],
    "005": [
        "005",
        "AR",
        "BO",
        "BR",
        "BV",
        "CL",
        "CO",
        "EC",
        "FK",
        "GF",
        "GS",
        "GY",
        "PE",
        "PY",
        "SR",
        "UY",
        "VE"
    ],
    "009": [
        "009",
        "053",
        "054",
        "057",
        "061",
        "AC",
        "AQ",
        "AS",
        "AU",
        "CC",
        "CK",
        "CP",
        "CX",
        "DG",
        "FJ",
        "FM",
        "GU",
        "HM",
        "KI",
        "MH",
        "MP",
        "NC",
        "NF",
        "NR",
        "NU",
        "NZ",
        "PF",
        "PG",
        "PN",
        "PW",
        "QO",
        "SB",
        "TA",
        "TK",
        "TO",
        "TV",
        "UM",
        "VU",
        "WF",
        "WS"
    ],
    "011": [
        "011",
        "BF",
        "BJ",
        "CI",
        "CV",
        "GH",
        "GM",
        "GN",
        "GW",
        "LR",
        "ML",
        "MR",
        "NE",
        "NG",
        "SH",
        "SL",
        "SN",
        "TG"
    ],
    "013": [
        "013",
        "BZ",
        "CR",
        "GT",
        "HN",
        "MX",
        "NI",
        "PA",
        "SV"
    ],
    "014": [
        "014",
        "BI",
        "DJ",
        "ER",
        "ET",
        "IO",
        "KE",
        "KM",
        "MG",
        "MU",
        "MW",
        "MZ",
        "RE",
        "RW",
        "SC",
        "SO",
        "SS",
        "TF",
        "TZ",
        "UG",
        "YT",
        "ZM",
        "ZW"
    ],
    "015": [
        "015",
        "DZ",
        "EA",
        "EG",
        "EH",
        "IC",
        "LY",
        "MA",
        "SD",
        "TN"
    ],
    "017": [
        "017",
        "AO",
        "CD",
        "CF",
        "CG",
        "CM",
        "GA",
        "GQ",
        "ST",
        "TD"
    ],
    "018": [
        "018",
        "BW",
        "LS",
        "NA",
        "SZ",
        "ZA"
    ],
    "019": [
        "003",
        "005",
        "013",
        "019",
        "019-status-grouping",
        "021",
        "029",
        "419",
        "AG",
        "AI",
        "AR",
        "AW",
        "BB",
        "BL",
        "BM",
        "BO",
        "BQ",
        "BR",
        "BS",
        "BV",
        "BZ",
        "CA",
        "CL",
        "CO",
        "CR",
        "CU",
        "CW",
        "DM",
        "DO",
        "EC",
        "FK",
        "GD",
        "GF",
        "GL",
        "GP",
        "GS",
        "GT",
        "GY",
        "HN",
        "HT",
        "JM",
        "KN",
        "KY",
        "LC",
        "MF",
        "MQ",
        "MS",
        "MX",
        "NI",
        "PA",
        "PE",
        "PM",
        "PR",
        "PY",
        "SR",
        "SV",
        "SX",
        "TC",
        "TT",
        "US",
        "UY",
        "VC",
        "VE",
        "VG",
        "VI"
    ],
    "021": [
        "021",
        "BM",
        "CA",
        "GL",
        "PM",
        "US"
    ],
    "029": [
        "029",
        "AG",
        "AI",
        "AW",
        "BB",
        "BL",
        "BQ",
        "BS",
        "CU",
        "CW",
        "DM",
        "DO",
        "GD",
        "GP",
        "HT",
        "JM",
        "KN",
        "KY",
        "LC",
        "MF",
        "MQ",
        "MS",
        "PR",
        "SX",
        "TC",
        "TT",
        "VC",
        "VG",
        "VI"
    ],
    "030": [
        "030",
        "CN",
        "HK",
        "JP",
        "KP",
        "KR",
        "MN",
        "MO",
        "TW"
    ],
    "034": [
        "034",
        "AF",
        "BD",
        "BT",
        "IN",
        "IR",
        "LK",
        "MV",
        "NP",
        "PK"
    ],
    "035": [
        "035",
        "BN",
        "ID",
        "KH",
        "LA",
        "MM",
        "MY",
        "PH",
        "SG",
        "TH",
        "TL",
        "VN"
    ],
    "039": [
        "039",
        "AD",
        "AL",
        "BA",
        "ES",
        "GI",
        "GR",
        "HR",
        "IT",
        "ME",
        "MK",
        "MT",
        "PT",
        "RS",
        "SI",
        "SM",
        "VA",
        "XK"
    ],
    "053": [
        "053",
        "AU",
        "CC",
        "CX",
        "HM",
        "NF",
        "NZ"
    ],
    "054": [
        "054",
        "FJ",
        "NC",
        "PG",
        "SB",
        "VU"
    ],
    "057": [
        "057",
        "FM",
        "GU",
        "KI",
        "MH",
        "MP",
        "NR",
        "PW",
        "UM"
    ],
    "061": [
        "061",
        "AS",
        "CK",
        "NU",
        "PF",
        "PN",
        "TK",
        "TO",
        "TV",
        "WF",
        "WS"
    ],
    "142": [
        "030",
        "034",
        "035",
        "142",
        "143",
        "145",
        "AE",
        "AF",
        "AM",
        "AZ",
        "BD",
        "BH",
        "BN",
        "BT",
        "CN",
        "CY",
        "GE",
        "HK",
        "ID",
        "IL",
        "IN",
        "IQ",
        "IR",
        "JO",
        "JP",
        "KG",
        "KH",
        "KP",
        "KR",
        "KW",
        "KZ",
        "LA",
        "LB",
        "LK",
        "MM",
        "MN",
        "MO",
        "MV",
        "MY",
        "NP",
        "OM",
        "PH",
        "PK",
        "PS",
        "QA",
        "SA",
        "SG",
        "SY",
        "TH",
        "TJ",
        "TL",
        "TM",
        "TR",
        "TW",
        "UZ",
        "VN",
        "YE"
    ],
    "143": [
        "143",
        "KG",
        "KZ",
        "TJ",
        "TM",
        "UZ"
    ],
    "145": [
        "145",
        "AE",
        "AM",
        "AZ",
        "BH",
        "CY",
        "GE",
        "IL",
        "IQ",
        "JO",
        "KW",
        "LB",
        "OM",
        "PS",
        "QA",
        "SA",
        "SY",
        "TR",
        "YE"
    ],
    "150": [
        "039",
        "150",
        "151",
        "154",
        "155",
        "AD",
        "AL",
        "AT",
        "AX",
        "BA",
        "BE",
        "BG",
        "BY",
        "CH",
        "CQ",
        "CZ",
        "DE",
        "DK",
        "EE",
        "ES",
        "FI",
        "FO",
        "FR",
        "GB",
        "GG",
        "GI",
        "GR",
        "HR",
        "HU",
        "IE",
        "IM",
        "IS",
        "IT",
        "JE",
        "LI",
        "LT",
        "LU",
        "LV",
        "MC",
        "MD",
        "ME",
        "MK",
        "MT",
        "NL",
        "NO",
        "PL",
        "PT",
        "RO",
        "RS",
        "RU",
        "SE",
        "SI",
        "SJ",
        "SK",
        "SM",
        "UA",
        "VA",
        "XK"
    ],
    "151": [
        "151",
        "BG",
        "BY",
        "CZ",
        "HU",
        "MD",
        "PL",
        "RO",
        "RU",
        "SK",
        "UA"
    ],
    "154": [
        "154",
        "AX",
        "CQ",
        "DK",
        "EE",
        "FI",
        "FO",
        "GB",
        "GG",
        "IE",
        "IM",
        "IS",
        "JE",
        "LT",
        "LV",
        "NO",
        "SE",
        "SJ"
    ],
    "155": [
        "155",
        "AT",
        "BE",
        "CH",
        "DE",
        "FR",
        "LI",
        "LU",
        "MC",
        "NL"
    ],
    "202": [
        "011",
        "014",
        "017",
        "018",
        "202",
        "AO",
        "BF",
        "BI",
        "BJ",
        "BW",
        "CD",
        "CF",
        "CG",
        "CI",
        "CM",
        "CV",
        "DJ",
        "ER",
        "ET",
        "GA",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GW",
        "IO",
        "KE",
        "KM",
        "LR",
        "LS",
        "MG",
        "ML",
        "MR",
        "MU",
        "MW",
        "MZ",
        "NA",
        "NE",
        "NG",
        "RE",
        "RW",
        "SC",
        "SH",
        "SL",
        "SN",
        "SO",
        "SS",
        "ST",
        "SZ",
        "TD",
        "TF",
        "TG",
        "TZ",
        "UG",
        "YT",
        "ZA",
        "ZM",
        "ZW"
    ],
    "419": [
        "005",
        "013",
        "029",
        "419",
        "AG",
        "AI",
        "AR",
        "AW",
        "BB",
        "BL",
        "BO",
        "BQ",
        "BR",
        "BS",
        "BV",
        "BZ",
        "CL",
        "CO",
        "CR",
        "CU",
        "CW",
        "DM",
        "DO",
        "EC",
        "FK",
        "GD",
        "GF",
        "GP",
        "GS",
        "GT",
        "GY",
        "HN",
        "HT",
        "JM",
        "KN",
        "KY",
        "LC",
        "MF",
        "MQ",
        "MS",
        "MX",
        "NI",
        "PA",
        "PE",
        "PR",
        "PY",
        "SR",
        "SV",
        "SX",
        "TC",
        "TT",
        "UY",
        "VC",
        "VE",
        "VG",
        "VI"
    ],
    "EU": [
        "AT",
        "BE",
        "BG",
        "CY",
        "CZ",
        "DE",
        "DK",
        "EE",
        "ES",
        "EU",
        "FI",
        "FR",
        "GR",
        "HR",
        "HU",
        "IE",
        "IT",
        "LT",
        "LU",
        "LV",
        "MT",
        "NL",
        "PL",
        "PT",
        "RO",
        "SE",
        "SI",
        "SK"
    ],
    "EZ": [
        "AT",
        "BE",
        "CY",
        "DE",
        "EE",
        "ES",
        "EZ",
        "FI",
        "FR",
        "GR",
        "IE",
        "IT",
        "LT",
        "LU",
        "LV",
        "MT",
        "NL",
        "PT",
        "SI",
        "SK"
    ],
    "QO": [
        "AC",
        "AQ",
        "CP",
        "DG",
        "QO",
        "TA"
    ],
    "UN": [
        "AD",
        "AE",
        "AF",
        "AG",
        "AL",
        "AM",
        "AO",
        "AR",
        "AT",
        "AU",
        "AZ",
        "BA",
        "BB",
        "BD",
        "BE",
        "BF",
        "BG",
        "BH",
        "BI",
        "BJ",
        "BN",
        "BO",
        "BR",
        "BS",
        "BT",
        "BW",
        "BY",
        "BZ",
        "CA",
        "CD",
        "CF",
        "CG",
        "CH",
        "CI",
        "CL",
        "CM",
        "CN",
        "CO",
        "CR",
        "CU",
        "CV",
        "CY",
        "CZ",
        "DE",
        "DJ",
        "DK",
        "DM",
        "DO",
        "DZ",
        "EC",
        "EE",
        "EG",
        "ER",
        "ES",
        "ET",
        "FI",
        "FJ",
        "FM",
        "FR",
        "GA",
        "GB",
        "GD",
        "GE",
        "GH",
        "GM",
        "GN",
        "GQ",
        "GR",
        "GT",
        "GW",
        "GY",
        "HN",
        "HR",
        "HT",
        "HU",
        "ID",
        "IE",
        "IL",
        "IN",
        "IQ",
        "IR",
        "IS",
        "IT",
        "JM",
        "JO",
        "JP",
        "KE",
        "KG",
        "KH",
        "KI",
        "KM",
        "KN",
        "KP",
        "KR",
        "KW",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LI",
        "LK",
        "LR",
        "LS",
        "LT",
        "LU",
        "LV",
        "LY",
        "MA",
        "MC",
        "MD",
        "ME",
        "MG",
        "MH",
        "MK",
        "ML",
        "MM",
        "MN",
        "MR",
        "MT",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NE",
        "NG",
        "NI",
        "NL",
        "NO",
        "NP",
        "NR",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PG",
        "PH",
        "PK",
        "PL",
        "PT",
        "PW",
        "PY",
        "QA",
        "RO",
        "RS",
        "RU",
        "RW",
        "SA",
        "SB",
        "SC",
        "SD",
        "SE",
        "SG",
        "SI",
        "SK",
        "SL",
        "SM",
        "SN",
        "SO",
        "SR",
        "SS",
        "ST",
        "SV",
        "SY",
        "SZ",
        "TD",
        "TG",
        "TH",
        "TJ",
        "TL",
        "TM",
        "TN",
        "TO",
        "TR",
        "TT",
        "TV",
        "TZ",
        "UA",
        "UG",
        "UN",
        "US",
        "UY",
        "UZ",
        "VC",
        "VE",
        "VN",
        "VU",
        "WS",
        "YE",
        "ZA",
        "ZM",
        "ZW"
    ]
};

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js



var UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
function invariant(condition, message, Err) {
    if (Err === void 0) {
        Err = Error;
    }
    if (!condition) {
        throw new Err(message);
    }
}
// This is effectively 2 languages in 2 different regions in the same cluster
var DEFAULT_MATCHING_THRESHOLD = 838;
var PROCESSED_DATA;
function processData() {
    var _a, _b;
    if (!PROCESSED_DATA) {
        var paradigmLocales = (_b = (_a = languageMatching_data.supplemental.languageMatching["written-new"][0]) === null || _a === void 0 ? void 0 : _a.paradigmLocales) === null || _b === void 0 ? void 0 : _b._locales.split(" ");
        var matchVariables = languageMatching_data.supplemental.languageMatching["written-new"].slice(1, 5);
        var data = languageMatching_data.supplemental.languageMatching["written-new"].slice(5);
        var matches = data.map(function(d) {
            var key = Object.keys(d)[0];
            var value = d[key];
            return {
                supported: key,
                desired: value._desired,
                distance: +value._distance,
                oneway: value.oneway === "true" ? true : false
            };
        }, {});
        PROCESSED_DATA = {
            matches: matches,
            matchVariables: matchVariables.reduce(function(all, d) {
                var key = Object.keys(d)[0];
                var value = d[key];
                all[key.slice(1)] = value._value.split("+");
                return all;
            }, {}),
            paradigmLocales: __spreadArray(__spreadArray([], paradigmLocales, true), paradigmLocales.map(function(l) {
                return new Intl.Locale(l.replace(/_/g, "-")).maximize().toString();
            }), true)
        };
    }
    return PROCESSED_DATA;
}
function isMatched(locale, languageMatchInfoLocale, matchVariables) {
    var _a = languageMatchInfoLocale.split("-"), language = _a[0], script = _a[1], region = _a[2];
    var matches = true;
    if (region && region[0] === "$") {
        var shouldInclude = region[1] !== "!";
        var matchRegions = shouldInclude ? matchVariables[region.slice(1)] : matchVariables[region.slice(2)];
        var expandedMatchedRegions = matchRegions.map(function(r) {
            return regions[r] || [
                r
            ];
        }).reduce(function(all, list) {
            return __spreadArray(__spreadArray([], all, true), list, true);
        }, []);
        matches && (matches = !(expandedMatchedRegions.indexOf(locale.region || "") > 1 != shouldInclude));
    } else {
        matches && (matches = locale.region ? region === "*" || region === locale.region : true);
    }
    matches && (matches = locale.script ? script === "*" || script === locale.script : true);
    matches && (matches = locale.language ? language === "*" || language === locale.language : true);
    return matches;
}
function serializeLSR(lsr) {
    return [
        lsr.language,
        lsr.script,
        lsr.region
    ].filter(Boolean).join("-");
}
function findMatchingDistanceForLSR(desired, supported, data) {
    for(var _i = 0, _a = data.matches; _i < _a.length; _i++){
        var d = _a[_i];
        var matches = isMatched(desired, d.desired, data.matchVariables) && isMatched(supported, d.supported, data.matchVariables);
        if (!d.oneway && !matches) {
            matches = isMatched(desired, d.supported, data.matchVariables) && isMatched(supported, d.desired, data.matchVariables);
        }
        if (matches) {
            var distance = d.distance * 10;
            if (data.paradigmLocales.indexOf(serializeLSR(desired)) > -1 != data.paradigmLocales.indexOf(serializeLSR(supported)) > -1) {
                return distance - 1;
            }
            return distance;
        }
    }
    throw new Error("No matching distance found");
}
function findMatchingDistance(desired, supported) {
    var desiredLocale = new Intl.Locale(desired).maximize();
    var supportedLocale = new Intl.Locale(supported).maximize();
    var desiredLSR = {
        language: desiredLocale.language,
        script: desiredLocale.script || "",
        region: desiredLocale.region || ""
    };
    var supportedLSR = {
        language: supportedLocale.language,
        script: supportedLocale.script || "",
        region: supportedLocale.region || ""
    };
    var matchingDistance = 0;
    var data = processData();
    if (desiredLSR.language !== supportedLSR.language) {
        matchingDistance += findMatchingDistanceForLSR({
            language: desiredLocale.language,
            script: "",
            region: ""
        }, {
            language: supportedLocale.language,
            script: "",
            region: ""
        }, data);
    }
    if (desiredLSR.script !== supportedLSR.script) {
        matchingDistance += findMatchingDistanceForLSR({
            language: desiredLocale.language,
            script: desiredLSR.script,
            region: ""
        }, {
            language: supportedLocale.language,
            script: desiredLSR.script,
            region: ""
        }, data);
    }
    if (desiredLSR.region !== supportedLSR.region) {
        matchingDistance += findMatchingDistanceForLSR(desiredLSR, supportedLSR, data);
    }
    return matchingDistance;
}
function findBestMatch(requestedLocales, supportedLocales, threshold) {
    if (threshold === void 0) {
        threshold = DEFAULT_MATCHING_THRESHOLD;
    }
    var lowestDistance = Infinity;
    var result = {
        matchedDesiredLocale: "",
        distances: {}
    };
    requestedLocales.forEach(function(desired, i) {
        if (!result.distances[desired]) {
            result.distances[desired] = {};
        }
        supportedLocales.forEach(function(supported) {
            // Add some weight to the distance based on the order of the supported locales
            // Add penalty for the order of the requested locales, which currently is 0 since ECMA-402
            // doesn't really have room for weighted locales like `en; q=0.1`
            var distance = findMatchingDistance(desired, supported) + 0 + i * 40;
            result.distances[desired][supported] = distance;
            if (distance < lowestDistance) {
                lowestDistance = distance;
                result.matchedDesiredLocale = desired;
                result.matchedSupportedLocale = supported;
            }
        });
    });
    if (lowestDistance >= threshold) {
        result.matchedDesiredLocale = undefined;
        result.matchedSupportedLocale = undefined;
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/BestFitMatcher.js

/**
 * https://tc39.es/ecma402/#sec-bestfitmatcher
 * @param availableLocales
 * @param requestedLocales
 * @param getDefaultLocale
 */ function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var foundLocale;
    var extension;
    var noExtensionLocales = [];
    var noExtensionLocaleMap = requestedLocales.reduce(function(all, l) {
        var noExtensionLocale = l.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
        noExtensionLocales.push(noExtensionLocale);
        all[noExtensionLocale] = l;
        return all;
    }, {});
    var result = findBestMatch(noExtensionLocales, availableLocales);
    if (result.matchedSupportedLocale && result.matchedDesiredLocale) {
        foundLocale = result.matchedSupportedLocale;
        extension = noExtensionLocaleMap[result.matchedDesiredLocale].slice(result.matchedDesiredLocale.length) || undefined;
    }
    if (!foundLocale) {
        return {
            locale: getDefaultLocale()
        };
    }
    return {
        locale: foundLocale,
        extension: extension
    };
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeUValue.js

function CanonicalizeUValue(ukey, uvalue) {
    // TODO: Implement algorithm for CanonicalizeUValue per https://tc39.es/ecma402/#sec-canonicalizeuvalue
    var lowerValue = uvalue.toLowerCase();
    invariant(ukey !== undefined, "ukey must be defined");
    var canonicalized = lowerValue;
    return canonicalized;
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeUnicodeLocaleId.js
function CanonicalizeUnicodeLocaleId(locale) {
    return Intl.getCanonicalLocales(locale)[0];
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/InsertUnicodeExtensionAndCanonicalize.js


function InsertUnicodeExtensionAndCanonicalize(locale, attributes, keywords) {
    invariant(locale.indexOf("-u-") === -1, "Expected locale to not have a Unicode locale extension");
    var extension = "-u";
    for(var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++){
        var attr = attributes_1[_i];
        extension += "-".concat(attr);
    }
    for(var _a = 0, keywords_1 = keywords; _a < keywords_1.length; _a++){
        var kw = keywords_1[_a];
        var key = kw.key, value = kw.value;
        extension += "-".concat(key);
        if (value !== "") {
            extension += "-".concat(value);
        }
    }
    if (extension === "-u") {
        return CanonicalizeUnicodeLocaleId(locale);
    }
    var privateIndex = locale.indexOf("-x-");
    var newLocale;
    if (privateIndex === -1) {
        newLocale = locale + extension;
    } else {
        var preExtension = locale.slice(0, privateIndex);
        var postExtension = locale.slice(privateIndex);
        newLocale = preExtension + extension + postExtension;
    }
    return CanonicalizeUnicodeLocaleId(newLocale);
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/BestAvailableLocale.js
/**
 * https://tc39.es/ecma402/#sec-bestavailablelocale
 * @param availableLocales
 * @param locale
 */ function BestAvailableLocale(availableLocales, locale) {
    var candidate = locale;
    while(true){
        if (availableLocales.indexOf(candidate) > -1) {
            return candidate;
        }
        var pos = candidate.lastIndexOf("-");
        if (!~pos) {
            return undefined;
        }
        if (pos >= 2 && candidate[pos - 2] === "-") {
            pos -= 2;
        }
        candidate = candidate.slice(0, pos);
    }
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/LookupMatcher.js


/**
 * https://tc39.es/ecma402/#sec-lookupmatcher
 * @param availableLocales
 * @param requestedLocales
 * @param getDefaultLocale
 */ function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var result = {
        locale: ""
    };
    for(var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++){
        var locale = requestedLocales_1[_i];
        var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
        var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
        if (availableLocale) {
            result.locale = availableLocale;
            if (locale !== noExtensionLocale) {
                result.extension = locale.slice(noExtensionLocale.length, locale.length);
            }
            return result;
        }
    }
    result.locale = getDefaultLocale();
    return result;
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/UnicodeExtensionComponents.js

function UnicodeExtensionComponents(extension) {
    invariant(extension === extension.toLowerCase(), "Expected extension to be lowercase");
    invariant(extension.slice(0, 3) === "-u-", "Expected extension to be a Unicode locale extension");
    var attributes = [];
    var keywords = [];
    var keyword;
    var size = extension.length;
    var k = 3;
    while(k < size){
        var e = extension.indexOf("-", k);
        var len = void 0;
        if (e === -1) {
            len = size - k;
        } else {
            len = e - k;
        }
        var subtag = extension.slice(k, k + len);
        invariant(len >= 2, "Expected a subtag to have at least 2 characters");
        if (keyword === undefined && len != 2) {
            if (attributes.indexOf(subtag) === -1) {
                attributes.push(subtag);
            }
        } else if (len === 2) {
            keyword = {
                key: subtag,
                value: ""
            };
            if (keywords.find(function(k) {
                return k.key === (keyword === null || keyword === void 0 ? void 0 : keyword.key);
            }) === undefined) {
                keywords.push(keyword);
            }
        } else if ((keyword === null || keyword === void 0 ? void 0 : keyword.value) === "") {
            keyword.value = subtag;
        } else {
            invariant(keyword !== undefined, "Expected keyword to be defined");
            keyword.value += "-" + subtag;
        }
        k += len + 1;
    }
    return {
        attributes: attributes,
        keywords: keywords
    };
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/ResolveLocale.js






/**
 * https://tc39.es/ecma402/#sec-resolvelocale
 */ function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
    var _a;
    var matcher = options.localeMatcher;
    var r;
    if (matcher === "lookup") {
        r = LookupMatcher(Array.from(availableLocales), requestedLocales, getDefaultLocale);
    } else {
        r = BestFitMatcher(Array.from(availableLocales), requestedLocales, getDefaultLocale);
    }
    if (r == null) {
        r = {
            locale: getDefaultLocale(),
            extension: ""
        };
    }
    var foundLocale = r.locale;
    var foundLocaleData = localeData[foundLocale];
    // TODO: We can't really guarantee that the locale data is available
    // invariant(
    //   foundLocaleData !== undefined,
    //   `Missing locale data for ${foundLocale}`
    // )
    var result = {
        locale: "en",
        dataLocale: foundLocale
    };
    var components;
    var keywords;
    if (r.extension) {
        components = UnicodeExtensionComponents(r.extension);
        keywords = components.keywords;
    } else {
        keywords = [];
    }
    var supportedKeywords = [];
    var _loop_1 = function(key) {
        // TODO: Shouldn't default to empty array, see TODO above
        var keyLocaleData = (_a = foundLocaleData === null || foundLocaleData === void 0 ? void 0 : foundLocaleData[key]) !== null && _a !== void 0 ? _a : [];
        invariant(Array.isArray(keyLocaleData), "keyLocaleData for ".concat(key, " must be an array"));
        var value = keyLocaleData[0];
        invariant(value === undefined || typeof value === "string", "value must be a string or undefined");
        var supportedKeyword = void 0;
        var entry = keywords.find(function(k) {
            return k.key === key;
        });
        if (entry) {
            var requestedValue = entry.value;
            if (requestedValue !== "") {
                if (keyLocaleData.indexOf(requestedValue) > -1) {
                    value = requestedValue;
                    supportedKeyword = {
                        key: key,
                        value: value
                    };
                }
            } else if (keyLocaleData.indexOf("true") > -1) {
                value = "true";
                supportedKeyword = {
                    key: key,
                    value: value
                };
            }
        }
        var optionsValue = options[key];
        invariant(optionsValue == null || typeof optionsValue === "string", "optionsValue must be a string or undefined");
        if (typeof optionsValue === "string") {
            var ukey = key.toLowerCase();
            optionsValue = CanonicalizeUValue(ukey, optionsValue);
            if (optionsValue === "") {
                optionsValue = "true";
            }
        }
        if (optionsValue !== value && keyLocaleData.indexOf(optionsValue) > -1) {
            value = optionsValue;
            supportedKeyword = undefined;
        }
        if (supportedKeyword) {
            supportedKeywords.push(supportedKeyword);
        }
        result[key] = value;
    };
    for(var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++){
        var key = relevantExtensionKeys_1[_i];
        _loop_1(key);
    }
    var supportedAttributes = [];
    if (supportedKeywords.length > 0) {
        supportedAttributes = [];
        foundLocale = InsertUnicodeExtensionAndCanonicalize(foundLocale, supportedAttributes, supportedKeywords);
    }
    result.locale = foundLocale;
    return result;
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/abstract/LookupSupportedLocales.js


/**
 * https://tc39.es/ecma402/#sec-lookupsupportedlocales
 * @param availableLocales
 * @param requestedLocales
 */ function LookupSupportedLocales(availableLocales, requestedLocales) {
    var subset = [];
    for(var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++){
        var locale = requestedLocales_1[_i];
        var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
        var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
        if (availableLocale) {
            subset.push(availableLocale);
        }
    }
    return subset;
}

;// CONCATENATED MODULE: ./node_modules/@formatjs/intl-localematcher/lib/index.js


function match(requestedLocales, availableLocales, defaultLocale, opts) {
    return ResolveLocale(availableLocales, CanonicalizeLocaleList(requestedLocales), {
        localeMatcher: (opts === null || opts === void 0 ? void 0 : opts.algorithm) || "best fit"
    }, [], {}, function() {
        return defaultLocale;
    }).locale;
}




/***/ }),

/***/ 230:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 
var preferredCharsets = __webpack_require__(212);
var preferredEncodings = __webpack_require__(238);
var preferredLanguages = __webpack_require__(997);
var preferredMediaTypes = __webpack_require__(162);
/**
 * Module exports.
 * @public
 */ module.exports = Negotiator;
module.exports.Negotiator = Negotiator;
/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */ function Negotiator(request) {
    if (!(this instanceof Negotiator)) {
        return new Negotiator(request);
    }
    this.request = request;
}
Negotiator.prototype.charset = function charset(available) {
    var set = this.charsets(available);
    return set && set[0];
};
Negotiator.prototype.charsets = function charsets(available) {
    return preferredCharsets(this.request.headers["accept-charset"], available);
};
Negotiator.prototype.encoding = function encoding(available, opts) {
    var set = this.encodings(available, opts);
    return set && set[0];
};
Negotiator.prototype.encodings = function encodings(available, options) {
    var opts = options || {};
    return preferredEncodings(this.request.headers["accept-encoding"], available, opts.preferred);
};
Negotiator.prototype.language = function language(available) {
    var set = this.languages(available);
    return set && set[0];
};
Negotiator.prototype.languages = function languages(available) {
    return preferredLanguages(this.request.headers["accept-language"], available);
};
Negotiator.prototype.mediaType = function mediaType(available) {
    var set = this.mediaTypes(available);
    return set && set[0];
};
Negotiator.prototype.mediaTypes = function mediaTypes(available) {
    return preferredMediaTypes(this.request.headers.accept, available);
};
// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;


/***/ }),

/***/ 212:
/***/ ((module) => {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 
/**
 * Module exports.
 * @public
 */ module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;
/**
 * Module variables.
 * @private
 */ var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Charset header.
 * @private
 */ function parseAcceptCharset(accept) {
    var accepts = accept.split(",");
    for(var i = 0, j = 0; i < accepts.length; i++){
        var charset = parseCharset(accepts[i].trim(), i);
        if (charset) {
            accepts[j++] = charset;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */ function parseCharset(str, i) {
    var match = simpleCharsetRegExp.exec(str);
    if (!match) return null;
    var charset = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(";");
        for(var j = 0; j < params.length; j++){
            var p = params[j].trim().split("=");
            if (p[0] === "q") {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return {
        charset: charset,
        q: q,
        i: i
    };
}
/**
 * Get the priority of a charset.
 * @private
 */ function getCharsetPriority(charset, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(charset, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the charset.
 * @private
 */ function specify(charset, spec, index) {
    var s = 0;
    if (spec.charset.toLowerCase() === charset.toLowerCase()) {
        s |= 1;
    } else if (spec.charset !== "*") {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */ function preferredCharsets(accept, provided) {
    // RFC 2616 sec 14.2: no header = *
    var accepts = parseAcceptCharset(accept === undefined ? "*" : accept || "");
    if (!provided) {
        // sorted list of all charsets
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getCharsetPriority(type, accepts, index);
    });
    // sorted list of accepted charsets
    return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full charset string.
 * @private
 */ function getFullCharset(spec) {
    return spec.charset;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}


/***/ }),

/***/ 238:
/***/ ((module) => {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 
/**
 * Module exports.
 * @public
 */ module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;
/**
 * Module variables.
 * @private
 */ var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Encoding header.
 * @private
 */ function parseAcceptEncoding(accept) {
    var accepts = accept.split(",");
    var hasIdentity = false;
    var minQuality = 1;
    for(var i = 0, j = 0; i < accepts.length; i++){
        var encoding = parseEncoding(accepts[i].trim(), i);
        if (encoding) {
            accepts[j++] = encoding;
            hasIdentity = hasIdentity || specify("identity", encoding);
            minQuality = Math.min(minQuality, encoding.q || 1);
        }
    }
    if (!hasIdentity) {
        /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */ accepts[j++] = {
            encoding: "identity",
            q: minQuality,
            i: i
        };
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */ function parseEncoding(str, i) {
    var match = simpleEncodingRegExp.exec(str);
    if (!match) return null;
    var encoding = match[1];
    var q = 1;
    if (match[2]) {
        var params = match[2].split(";");
        for(var j = 0; j < params.length; j++){
            var p = params[j].trim().split("=");
            if (p[0] === "q") {
                q = parseFloat(p[1]);
                break;
            }
        }
    }
    return {
        encoding: encoding,
        q: q,
        i: i
    };
}
/**
 * Get the priority of an encoding.
 * @private
 */ function getEncodingPriority(encoding, accepted, index) {
    var priority = {
        encoding: encoding,
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(encoding, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the encoding.
 * @private
 */ function specify(encoding, spec, index) {
    var s = 0;
    if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
        s |= 1;
    } else if (spec.encoding !== "*") {
        return null;
    }
    return {
        encoding: encoding,
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
;
/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */ function preferredEncodings(accept, provided, preferred) {
    var accepts = parseAcceptEncoding(accept || "");
    var comparator = preferred ? function comparator(a, b) {
        if (a.q !== b.q) {
            return b.q - a.q // higher quality first
            ;
        }
        var aPreferred = preferred.indexOf(a.encoding);
        var bPreferred = preferred.indexOf(b.encoding);
        if (aPreferred === -1 && bPreferred === -1) {
            // consider the original specifity/order
            return b.s - a.s || a.o - b.o || a.i - b.i;
        }
        if (aPreferred !== -1 && bPreferred !== -1) {
            return aPreferred - bPreferred // consider the preferred order
            ;
        }
        return aPreferred === -1 ? 1 : -1 // preferred first
        ;
    } : compareSpecs;
    if (!provided) {
        // sorted list of all encodings
        return accepts.filter(isQuality).sort(comparator).map(getFullEncoding);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getEncodingPriority(type, accepts, index);
    });
    // sorted list of accepted encodings
    return priorities.filter(isQuality).sort(comparator).map(function getEncoding(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i;
}
/**
 * Get full encoding string.
 * @private
 */ function getFullEncoding(spec) {
    return spec.encoding;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}


/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 
/**
 * Module exports.
 * @public
 */ module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;
/**
 * Module variables.
 * @private
 */ var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
/**
 * Parse the Accept-Language header.
 * @private
 */ function parseAcceptLanguage(accept) {
    var accepts = accept.split(",");
    for(var i = 0, j = 0; i < accepts.length; i++){
        var language = parseLanguage(accepts[i].trim(), i);
        if (language) {
            accepts[j++] = language;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a language from the Accept-Language header.
 * @private
 */ function parseLanguage(str, i) {
    var match = simpleLanguageRegExp.exec(str);
    if (!match) return null;
    var prefix = match[1];
    var suffix = match[2];
    var full = prefix;
    if (suffix) full += "-" + suffix;
    var q = 1;
    if (match[3]) {
        var params = match[3].split(";");
        for(var j = 0; j < params.length; j++){
            var p = params[j].split("=");
            if (p[0] === "q") q = parseFloat(p[1]);
        }
    }
    return {
        prefix: prefix,
        suffix: suffix,
        q: q,
        i: i,
        full: full
    };
}
/**
 * Get the priority of a language.
 * @private
 */ function getLanguagePriority(language, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(language, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the language.
 * @private
 */ function specify(language, spec, index) {
    var p = parseLanguage(language);
    if (!p) return null;
    var s = 0;
    if (spec.full.toLowerCase() === p.full.toLowerCase()) {
        s |= 4;
    } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
        s |= 2;
    } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
        s |= 1;
    } else if (spec.full !== "*") {
        return null;
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
;
/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */ function preferredLanguages(accept, provided) {
    // RFC 2616 sec 14.4: no header = *
    var accepts = parseAcceptLanguage(accept === undefined ? "*" : accept || "");
    if (!provided) {
        // sorted list of all languages
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getLanguagePriority(type, accepts, index);
    });
    // sorted list of accepted languages
    return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full language string.
 * @private
 */ function getFullLanguage(spec) {
    return spec.full;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}


/***/ }),

/***/ 162:
/***/ ((module) => {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 
/**
 * Module exports.
 * @public
 */ module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;
/**
 * Module variables.
 * @private
 */ var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
/**
 * Parse the Accept header.
 * @private
 */ function parseAccept(accept) {
    var accepts = splitMediaTypes(accept);
    for(var i = 0, j = 0; i < accepts.length; i++){
        var mediaType = parseMediaType(accepts[i].trim(), i);
        if (mediaType) {
            accepts[j++] = mediaType;
        }
    }
    // trim accepts
    accepts.length = j;
    return accepts;
}
/**
 * Parse a media type from the Accept header.
 * @private
 */ function parseMediaType(str, i) {
    var match = simpleMediaTypeRegExp.exec(str);
    if (!match) return null;
    var params = Object.create(null);
    var q = 1;
    var subtype = match[2];
    var type = match[1];
    if (match[3]) {
        var kvps = splitParameters(match[3]).map(splitKeyValuePair);
        for(var j = 0; j < kvps.length; j++){
            var pair = kvps[j];
            var key = pair[0].toLowerCase();
            var val = pair[1];
            // get the value, unwrapping quotes
            var value = val && val[0] === '"' && val[val.length - 1] === '"' ? val.slice(1, -1) : val;
            if (key === "q") {
                q = parseFloat(value);
                break;
            }
            // store parameter
            params[key] = value;
        }
    }
    return {
        type: type,
        subtype: subtype,
        params: params,
        q: q,
        i: i
    };
}
/**
 * Get the priority of a media type.
 * @private
 */ function getMediaTypePriority(type, accepted, index) {
    var priority = {
        o: -1,
        q: 0,
        s: 0
    };
    for(var i = 0; i < accepted.length; i++){
        var spec = specify(type, accepted[i], index);
        if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
            priority = spec;
        }
    }
    return priority;
}
/**
 * Get the specificity of the media type.
 * @private
 */ function specify(type, spec, index) {
    var p = parseMediaType(type);
    var s = 0;
    if (!p) {
        return null;
    }
    if (spec.type.toLowerCase() == p.type.toLowerCase()) {
        s |= 4;
    } else if (spec.type != "*") {
        return null;
    }
    if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
        s |= 2;
    } else if (spec.subtype != "*") {
        return null;
    }
    var keys = Object.keys(spec.params);
    if (keys.length > 0) {
        if (keys.every(function(k) {
            return spec.params[k] == "*" || (spec.params[k] || "").toLowerCase() == (p.params[k] || "").toLowerCase();
        })) {
            s |= 1;
        } else {
            return null;
        }
    }
    return {
        i: index,
        o: spec.i,
        q: spec.q,
        s: s
    };
}
/**
 * Get the preferred media types from an Accept header.
 * @public
 */ function preferredMediaTypes(accept, provided) {
    // RFC 2616 sec 14.2: no header = */*
    var accepts = parseAccept(accept === undefined ? "*/*" : accept || "");
    if (!provided) {
        // sorted list of all types
        return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
    }
    var priorities = provided.map(function getPriority(type, index) {
        return getMediaTypePriority(type, accepts, index);
    });
    // sorted list of accepted types
    return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
        return provided[priorities.indexOf(priority)];
    });
}
/**
 * Compare two specs.
 * @private
 */ function compareSpecs(a, b) {
    return b.q - a.q || b.s - a.s || a.o - b.o || a.i - b.i || 0;
}
/**
 * Get full type string.
 * @private
 */ function getFullType(spec) {
    return spec.type + "/" + spec.subtype;
}
/**
 * Check if a spec has any quality.
 * @private
 */ function isQuality(spec) {
    return spec.q > 0;
}
/**
 * Count the number of quotes in a string.
 * @private
 */ function quoteCount(string) {
    var count = 0;
    var index = 0;
    while((index = string.indexOf('"', index)) !== -1){
        count++;
        index++;
    }
    return count;
}
/**
 * Split a key value pair.
 * @private
 */ function splitKeyValuePair(str) {
    var index = str.indexOf("=");
    var key;
    var val;
    if (index === -1) {
        key = str;
    } else {
        key = str.slice(0, index);
        val = str.slice(index + 1);
    }
    return [
        key,
        val
    ];
}
/**
 * Split an Accept header into media types.
 * @private
 */ function splitMediaTypes(accept) {
    var accepts = accept.split(",");
    for(var i = 1, j = 0; i < accepts.length; i++){
        if (quoteCount(accepts[j]) % 2 == 0) {
            accepts[++j] = accepts[i];
        } else {
            accepts[j] += "," + accepts[i];
        }
    }
    // trim accepts
    accepts.length = j + 1;
    return accepts;
}
/**
 * Split a string of parameters.
 * @private
 */ function splitParameters(str) {
    var parameters = str.split(";");
    for(var i = 1, j = 0; i < parameters.length; i++){
        if (quoteCount(parameters[j]) % 2 == 0) {
            parameters[++j] = parameters[i];
        } else {
            parameters[j] += ";" + parameters[i];
        }
    }
    // trim parameters
    parameters.length = j + 1;
    for(var i = 0; i < parameters.length; i++){
        parameters[i] = parameters[i].trim();
    }
    return parameters;
}


/***/ }),

/***/ 744:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: !0
});
var e = __webpack_require__(102);
exports.Z = e.default;


/***/ }),

/***/ 501:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: !0
}));
var e = __webpack_require__(308), a = __webpack_require__(692);
exports["default"] = function(t) {
    var o;
    let { localizedPathnames: n, request: l, resolvedLocale: r, routing: s } = t;
    const i = l.nextUrl.clone(), c = a.getHost(l.headers);
    function p(t, o) {
        return t.pathname = e.normalizeTrailingSlash(t.pathname), l.nextUrl.basePath && ((t = new URL(t)).pathname = a.applyBasePath(t.pathname, l.nextUrl.basePath)), "<".concat(t.toString(), '>; rel="alternate"; hreflang="').concat(o, '"');
    }
    function m(e, t) {
        return n && "object" == typeof n ? a.formatTemplatePathname(e, n[r], n[t]) : e;
    }
    c && (i.port = "", i.host = c), i.protocol = null !== (o = l.headers.get("x-forwarded-proto")) && void 0 !== o ? o : i.protocol, i.pathname = a.getNormalizedPathname(i.pathname, s.locales, s.localePrefix);
    const h = a.getLocalePrefixes(s.locales, s.localePrefix, !1).flatMap((e)=>{
        let t, [o, l] = e;
        function r(e) {
            return "/" === e ? l : l + e;
        }
        if (s.domains) {
            return s.domains.filter((e)=>a.isLocaleSupportedOnDomain(o, e)).map((e)=>(t = new URL(i), t.port = "", t.host = e.domain, t.pathname = m(i.pathname, o), o === e.defaultLocale && "always" !== s.localePrefix.mode || (t.pathname = r(t.pathname)), p(t, o)));
        }
        {
            let e;
            e = n && "object" == typeof n ? m(i.pathname, o) : i.pathname, o === s.defaultLocale && "always" !== s.localePrefix.mode || (e = r(e)), t = new URL(e, i);
        }
        return p(t, o);
    });
    if (!s.domains && ("always" !== s.localePrefix.mode || "/" === i.pathname)) {
        const e = new URL(m(i.pathname, s.defaultLocale), i);
        h.push(p(e, "x-default"));
    }
    return h.join(", ");
};


/***/ }),

/***/ 102:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const NextResponse = (__webpack_require__(444)/* .NextResponse */ .x);
Object.defineProperty(exports, "__esModule", ({
    value: !0
}));
var a = __webpack_require__(851), t = __webpack_require__(553), l = __webpack_require__(308), o = __webpack_require__(501), n = __webpack_require__(644), r = __webpack_require__(424), i = __webpack_require__(692);
exports["default"] = function(s, c) {
    var d, h, m;
    const f = a.receiveRoutingConfig({
        ...s,
        alternateLinks: null !== (d = null == c ? void 0 : c.alternateLinks) && void 0 !== d ? d : s.alternateLinks,
        localeDetection: null !== (h = null == c ? void 0 : c.localeDetection) && void 0 !== h ? h : s.localeDetection,
        localeCookie: null !== (m = null == c ? void 0 : c.localeCookie) && void 0 !== m ? m : s.localeCookie
    });
    return function(a) {
        var s;
        let c;
        try {
            c = decodeURI(a.nextUrl.pathname);
        } catch (a) {
            return NextResponse.next();
        }
        const d = i.sanitizePathname(c), { domain: h, locale: m } = n.default(f, a.headers, a.cookies, d), u = h ? h.defaultLocale === m : m === f.defaultLocale, x = (null === (s = f.domains) || void 0 === s ? void 0 : s.filter((e)=>i.isLocaleSupportedOnDomain(m, e))) || [], P = null != f.domains && !h;
        function p(l) {
            const o = new URL(l, a.url);
            a.nextUrl.basePath && (o.pathname = i.applyBasePath(o.pathname, a.nextUrl.basePath));
            const n = new Headers(a.headers);
            return n.set(t.HEADER_LOCALE_NAME, m), NextResponse.rewrite(o, {
                request: {
                    headers: n
                }
            });
        }
        function v(t, o) {
            const n = new URL(t, a.url);
            if (n.pathname = l.normalizeTrailingSlash(n.pathname), x.length > 0 && !o && h) {
                const e = i.getBestMatchingDomain(h, m, x);
                e && (o = e.domain, e.defaultLocale === m && "as-needed" === f.localePrefix.mode && (n.pathname = i.getNormalizedPathname(n.pathname, f.locales, f.localePrefix)));
            }
            var r, s;
            o && (n.host = o, a.headers.get("x-forwarded-host") && (n.protocol = null !== (r = a.headers.get("x-forwarded-proto")) && void 0 !== r ? r : a.nextUrl.protocol, n.port = null !== (s = a.headers.get("x-forwarded-port")) && void 0 !== s ? s : ""));
            return a.nextUrl.basePath && (n.pathname = i.applyBasePath(n.pathname, a.nextUrl.basePath)), NextResponse.redirect(n.toString());
        }
        const g = i.getNormalizedPathname(d, f.locales, f.localePrefix), L = i.getPathnameMatch(d, f.locales, f.localePrefix), U = null != L, k = "never" === f.localePrefix.mode || u && "as-needed" === f.localePrefix.mode;
        let q, j, C = g;
        const D = f.pathnames;
        if (D) {
            let e;
            if ([e, j] = i.getInternalTemplate(D, g, m), j) {
                const t = D[j], o = "string" == typeof t ? t : t[m];
                if (l.matchesPathname(o, g)) C = i.formatTemplatePathname(g, o, j);
                else {
                    let n;
                    n = e ? "string" == typeof t ? t : t[e] : j;
                    const r = k ? void 0 : l.getLocalePrefix(m, f.localePrefix), s = i.formatTemplatePathname(g, n, o);
                    q = v(i.formatPathname(s, r, a.nextUrl.search));
                }
            }
        }
        if (!q) if ("/" !== C || U) {
            const e = i.formatPathname(C, i.getLocaleAsPrefix(m), a.nextUrl.search);
            if (U) {
                const t = i.formatPathname(g, L.prefix, a.nextUrl.search);
                if ("never" === f.localePrefix.mode) q = v(i.formatPathname(g, void 0, a.nextUrl.search));
                else if (L.exact) if (u && k) q = v(i.formatPathname(g, void 0, a.nextUrl.search));
                else if (f.domains) {
                    const a = i.getBestMatchingDomain(h, L.locale, x);
                    q = (null == h ? void 0 : h.domain) === (null == a ? void 0 : a.domain) || P ? p(e) : v(t, null == a ? void 0 : a.domain);
                } else q = p(e);
                else q = v(t);
            } else q = k ? p(e) : v(i.formatPathname(g, l.getLocalePrefix(m, f.localePrefix), a.nextUrl.search));
        } else q = k ? p(i.formatPathname(C, i.getLocaleAsPrefix(m), a.nextUrl.search)) : v(i.formatPathname(g, l.getLocalePrefix(m, f.localePrefix), a.nextUrl.search));
        return f.localeDetection && f.localeCookie && r.default(a, q, m, f.localeCookie), "never" !== f.localePrefix.mode && f.alternateLinks && f.locales.length > 1 && q.headers.set("Link", o.default({
            routing: f,
            localizedPathnames: null != j && D ? D[j] : void 0,
            request: a,
            resolvedLocale: m
        })), q;
    };
};


/***/ }),

/***/ 644:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: !0
}));
var e = __webpack_require__(141), o = __webpack_require__(230), l = __webpack_require__(692);
function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
var a = t(o);
function n(o, l, t) {
    let n;
    const c = new a.default({
        headers: {
            "accept-language": o.get("accept-language") || void 0
        }
    }).languages();
    try {
        const o = function(e) {
            return e.slice().sort((e, o)=>o.length - e.length);
        }(l);
        n = e.match(c, o, t);
    } catch (e) {}
    return n;
}
function c(e, o) {
    if (e.localeCookie && o.has(e.localeCookie.name)) {
        var l;
        const t = null === (l = o.get(e.localeCookie.name)) || void 0 === l ? void 0 : l.value;
        if (t && e.locales.includes(t)) return t;
    }
}
function i(e, o, t, a) {
    let i;
    var r;
    a && (i = null === (r = l.getPathnameMatch(a, e.locales, e.localePrefix)) || void 0 === r ? void 0 : r.locale);
    return !i && e.localeDetection && (i = c(e, t)), !i && e.localeDetection && (i = n(o, e.locales, e.defaultLocale)), i || (i = e.defaultLocale), i;
}
function r(e, o, t, a) {
    const r = function(e, o) {
        const t = l.getHost(e);
        if (t) return o.find((e)=>e.domain === t);
    }(o, e.domains);
    if (!r) return {
        locale: i(e, o, t, a)
    };
    let u;
    if (a) {
        var s;
        const o = null === (s = l.getPathnameMatch(a, e.locales, e.localePrefix)) || void 0 === s ? void 0 : s.locale;
        if (o) {
            if (!l.isLocaleSupportedOnDomain(o, r)) return {
                locale: o,
                domain: r
            };
            u = o;
        }
    }
    if (!u && e.localeDetection) {
        const o = c(e, t);
        o && l.isLocaleSupportedOnDomain(o, r) && (u = o);
    }
    if (!u && e.localeDetection) {
        const l = n(o, r.locales || e.locales, r.defaultLocale);
        l && (u = l);
    }
    return u || (u = r.defaultLocale), {
        locale: u,
        domain: r
    };
}
exports["default"] = function(e, o, l, t) {
    return e.domains ? r(e, o, l, t) : {
        locale: i(e, o, l, t)
    };
}, exports.getAcceptLanguageLocale = n;


/***/ }),

/***/ 424:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: !0
})), exports["default"] = function(e, t, o, s) {
    var a;
    const { name: i, ...l } = s;
    (null === (a = e.cookies.get(i)) || void 0 === a ? void 0 : a.value) !== o && t.cookies.set(i, o, {
        path: e.nextUrl.basePath || void 0,
        ...l
    });
};


/***/ }),

/***/ 692:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: !0
}));
var e = __webpack_require__(308);
function t(t, n) {
    let r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
    const o = t.map((t)=>[
            t,
            e.getLocalePrefix(t, n)
        ]);
    return r && o.sort((e, t)=>t[1].length - e[1].length), o;
}
function n(t, n) {
    const r = e.normalizeTrailingSlash(n), o = e.normalizeTrailingSlash(t), a = e.templateToRegex(o).exec(r);
    if (!a) return;
    const l = {};
    for(let e = 1; e < a.length; e++){
        var i;
        const t = null === (i = o.match(/\[([^\]]+)\]/g)) || void 0 === i ? void 0 : i[e - 1].replace(/[[\]]/g, "");
        t && (l[t] = a[e]);
    }
    return l;
}
function r(e, t) {
    if (!t) return e;
    let n = e = e.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
    return Object.entries(t).forEach((e)=>{
        let [t, r] = e;
        n = n.replace("[".concat(t, "]"), r);
    }), n;
}
function o(e, t) {
    return t.defaultLocale === e || !t.locales || t.locales.includes(e);
}
exports.applyBasePath = function(t, n) {
    return e.normalizeTrailingSlash(n + t);
}, exports.formatPathname = function(t, n, r) {
    let o = t;
    return n && (o = e.prefixPathname(n, o)), r && (o += r), o;
}, exports.formatPathnameTemplate = r, exports.formatTemplatePathname = function(t, o, a, l) {
    let i = "";
    return i += r(a, n(o, t)), i = e.normalizeTrailingSlash(i), i;
}, exports.getBestMatchingDomain = function(e, t, n) {
    let r;
    return e && o(t, e) && (r = e), r || (r = n.find((e)=>e.defaultLocale === t)), r || (r = n.find((e)=>{
        var n;
        return null === (n = e.locales) || void 0 === n ? void 0 : n.includes(t);
    })), r || null != (null == e ? void 0 : e.locales) || (r = e), r || (r = n.find((e)=>!e.locales)), r;
}, exports.getHost = function(e) {
    var t, n;
    return null !== (t = null !== (n = e.get("x-forwarded-host")) && void 0 !== n ? n : e.get("host")) && void 0 !== t ? t : void 0;
}, exports.getInternalTemplate = function(t, n, r) {
    const o = e.getSortedPathnames(Object.keys(t));
    for (const a of o){
        const o = t[a];
        if ("string" == typeof o) {
            const t = o;
            if (e.matchesPathname(t, n)) return [
                void 0,
                a
            ];
        } else {
            const t = Object.entries(o), l = t.findIndex((e)=>{
                let [t] = e;
                return t === r;
            });
            l > 0 && t.unshift(t.splice(l, 1)[0]);
            for (const [r, o] of t)if (e.matchesPathname(o, n)) return [
                r,
                a
            ];
        }
    }
    for (const r of Object.keys(t))if (e.matchesPathname(r, n)) return [
        void 0,
        r
    ];
    return [
        void 0,
        void 0
    ];
}, exports.getLocaleAsPrefix = function(e) {
    return "/".concat(e);
}, exports.getLocalePrefixes = t, exports.getNormalizedPathname = function(n, r, o) {
    n.endsWith("/") || (n += "/");
    const a = t(r, o), l = new RegExp("^(".concat(a.map((e)=>{
        let [, t] = e;
        return t.replaceAll("/", "\\/");
    }).join("|"), ")/(.*)"), "i"), i = n.match(l);
    let s = i ? "/" + i[2] : n;
    return "/" !== s && (s = e.normalizeTrailingSlash(s)), s;
}, exports.getPathnameMatch = function(e, n, r) {
    const o = t(n, r);
    for (const [t, n] of o){
        let r, o;
        if (e === n || e.startsWith(n + "/")) r = o = !0;
        else {
            const t = e.toLowerCase(), a = n.toLowerCase();
            (t === a || t.startsWith(a + "/")) && (r = !1, o = !0);
        }
        if (o) return {
            locale: t,
            prefix: n,
            matchedPrefix: e.slice(0, n.length),
            exact: r
        };
    }
}, exports.getRouteParams = n, exports.isLocaleSupportedOnDomain = o, exports.sanitizePathname = function(e) {
    return e.replace(/\\/g, "%5C").replace(/\/+/g, "/");
};


/***/ }),

/***/ 851:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

function e(e) {
    return !(null != e && !e) && {
        name: "NEXT_LOCALE",
        maxAge: 31536e3,
        sameSite: "lax",
        ..."object" == typeof e && e
    };
}
function o(e) {
    return "object" == typeof e ? e : {
        mode: e || "always"
    };
}
Object.defineProperty(exports, "__esModule", ({
    value: !0
})), exports.receiveLocaleCookie = e, exports.receiveLocalePrefixConfig = o, exports.receiveRoutingConfig = function(t) {
    var l, i;
    return {
        ...t,
        localePrefix: o(t.localePrefix),
        localeCookie: e(t.localeCookie),
        localeDetection: null === (l = t.localeDetection) || void 0 === l || l,
        alternateLinks: null === (i = t.alternateLinks) || void 0 === i || i
    };
};


/***/ }),

/***/ 553:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: !0
}));
exports.HEADER_LOCALE_NAME = "X-NEXT-INTL-LOCALE", exports.LOCALE_SEGMENT_NAME = "locale";


/***/ }),

/***/ 308:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

function t(t) {
    return function(t) {
        return "object" == typeof t ? null == t.host && null == t.hostname : !/^[a-z]+:/i.test(t);
    }(t) && !function(t) {
        const e = "object" == typeof t ? t.pathname : t;
        return null != e && !e.startsWith("/");
    }(t);
}
function e(t, e) {
    let r;
    return "string" == typeof t ? r = n(e, t) : (r = {
        ...t
    }, t.pathname && (r.pathname = n(e, t.pathname))), r;
}
function n(t, e) {
    let n = t;
    return /^\/(\?.*)?$/.test(e) && (e = e.slice(1)), n += e, n;
}
function r(t, e) {
    return e === t || e.startsWith("".concat(t, "/"));
}
function o(t) {
    const e = function() {
        try {
            return "true" === process.env._next_intl_trailing_slash;
        } catch (t) {
            return !1;
        }
    }();
    if ("/" !== t) {
        const n = t.endsWith("/");
        e && !n ? t += "/" : !e && n && (t = t.slice(0, -1));
    }
    return t;
}
function i(t) {
    return "/" + t;
}
function u(t) {
    const e = t.replace(/\[\[(\.\.\.[^\]]+)\]\]/g, "?(.*)").replace(/\[(\.\.\.[^\]]+)\]/g, "(.+)").replace(/\[([^\]]+)\]/g, "([^/]+)");
    return new RegExp("^".concat(e, "$"));
}
function s(t) {
    return t.includes("[[...");
}
function c(t) {
    return t.includes("[...");
}
function f(t) {
    return t.includes("[");
}
function a(t, e) {
    const n = t.split("/"), r = e.split("/"), o = Math.max(n.length, r.length);
    for(let t = 0; t < o; t++){
        const e = n[t], o = r[t];
        if (!e && o) return -1;
        if (e && !o) return 1;
        if (e || o) {
            if (!f(e) && f(o)) return -1;
            if (f(e) && !f(o)) return 1;
            if (!c(e) && c(o)) return -1;
            if (c(e) && !c(o)) return 1;
            if (!s(e) && s(o)) return -1;
            if (s(e) && !s(o)) return 1;
        }
    }
    return 0;
}
Object.defineProperty(exports, "__esModule", ({
    value: !0
})), exports.getLocaleAsPrefix = i, exports.getLocalePrefix = function(t, e) {
    var n;
    return "never" !== e.mode && (null === (n = e.prefixes) || void 0 === n ? void 0 : n[t]) || i(t);
}, exports.getSortedPathnames = function(t) {
    return t.sort(a);
}, exports.hasPathnamePrefixed = r, exports.isLocalizableHref = t, exports.isPromise = function(t) {
    return "function" == typeof t.then;
}, exports.localizeHref = function(n, o) {
    let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o, u = arguments.length > 3 ? arguments[3] : void 0, s = arguments.length > 4 ? arguments[4] : void 0;
    if (!t(n)) return n;
    const c = o !== i, f = r(s, u);
    return (c || f) && null != s ? e(n, s) : n;
}, exports.matchesPathname = function(t, e) {
    const n = o(t), r = o(e);
    return u(n).test(r);
}, exports.normalizeTrailingSlash = o, exports.prefixHref = e, exports.prefixPathname = n, exports.templateToRegex = u, exports.unprefixPathname = function(t, e) {
    return t.replace(new RegExp("^".concat(e)), "") || "/";
};


/***/ }),

/***/ 492:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies,
    parseCookie: ()=>parseCookie,
    parseSetCookie: ()=>parseSetCookie,
    stringifyCookie: ()=>stringifyCookie
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function stringifyCookie(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
        "priority" in c && c.priority && `Priority=${c.priority}`
    ].filter(Boolean);
    return `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookie(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookie(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure, priority } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase(),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        },
        ...priority && {
            priority: parsePriority(priority)
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = [
    "low",
    "medium",
    "high"
];
function parsePriority(string) {
    string = string.toLowerCase();
    return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>stringifyCookie(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>stringifyCookie(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookie(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    has(name) {
        return this._parsed.has(name);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const [name, path, domain] = typeof args[0] === "string" ? [
            args[0]
        ] : [
            args[0].name,
            args[0].path,
            args[0].domain
        ];
        return this.set({
            name,
            path,
            domain,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(stringifyCookie).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = stringifyCookie(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 842:
/***/ ((module) => {

"use strict";
var __dirname = "/";

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();


/***/ }),

/***/ 579:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  c: () => (/* binding */ NextURL)
});

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":")[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ function removeTrailingSlash(route) {
    return route.replace(/\/$/, "") || "/";
} //# sourceMappingURL=remove-trailing-slash.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ function parsePath(path) {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : "",
            hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
    }
    return {
        pathname: path,
        query: "",
        hash: ""
    };
} //# sourceMappingURL=parse-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js

/**
 * Adds the provided prefix to the given path. It first ensures that the path
 * is indeed starting with a slash.
 */ function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js

/**
 * Similarly to `addPathPrefix`, this function adds a suffix at the end on the
 * provided path. It also works only for paths ensuring the argument starts
 * with a slash.
 */ function addPathSuffix(path, suffix) {
    if (!path.startsWith("/") || !suffix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js

/**
 * Checks if a given path starts with a given prefix. It ensures it matches
 * exactly without containing extra chars. e.g. prefix /docs should replace
 * for /docs, /docs/, /docs/a but not /docsss
 * @param path The path to check.
 * @param prefix The prefix to check against.
 */ function pathHasPrefix(path, prefix) {
    if (typeof path !== "string") {
        return false;
    }
    const { pathname } = parsePath(path);
    return pathname === prefix || pathname.startsWith(prefix + "/");
} //# sourceMappingURL=path-has-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js


/**
 * For a given path and a locale, if the locale is given, it will prefix the
 * locale. The path shouldn't be an API path. If a default locale is given the
 * prefix will be omitted if the locale is already the default locale.
 */ function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if (pathHasPrefix(lower, "/api")) return path;
        if (pathHasPrefix(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return addPathPrefix(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js




function formatNextPathnameInfo(info) {
    let pathname = addLocale(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = removeTrailingSlash(pathname);
    }
    if (info.buildId) {
        pathname = addPathSuffix(addPathPrefix(pathname, "/_next/data/" + info.buildId), info.pathname === "/" ? "index.json" : ".json");
    }
    pathname = addPathPrefix(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith("/") ? addPathSuffix(pathname, "/") : pathname : removeTrailingSlash(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/get-hostname.js
/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(":")[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js
/**
 * For a pathname that may include a locale from a list of locales, it
 * removes the locale from the pathname returning it alongside with the
 * detected locale.
 *
 * @param pathname A pathname that may include a locale.
 * @param locales A list of locales.
 * @returns The detected locale and pathname without locale
 */ function normalizeLocalePath(pathname, locales) {
    let detectedLocale;
    // first item will be empty string from splitting at first char
    const pathnameParts = pathname.split("/");
    (locales || []).some((locale)=>{
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
            detectedLocale = locale;
            pathnameParts.splice(1, 1);
            pathname = pathnameParts.join("/") || "/";
            return true;
        }
        return false;
    });
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js

/**
 * Given a path and a prefix it will remove the prefix when it exists in the
 * given path. It ensures it matches exactly without containing extra chars
 * and if the prefix is not there it will be noop.
 *
 * @param path The path to remove the prefix from.
 * @param prefix The prefix to be removed.
 */ function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!pathHasPrefix(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith("/")) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js



function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
    };
    if (basePath && pathHasPrefix(info.pathname, basePath)) {
        info.pathname = removePathPrefix(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith("/_next/data/") && info.pathname.endsWith(".json")) {
        const paths = info.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : normalizeLocalePath(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : normalizeLocalePath(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/next-url.js




const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
}
const Internal = Symbol("NextURLInternal");
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ""
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = getNextPathnameInfo(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = getHostname(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : detectDomainLocale((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? "";
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return formatNextPathnameInfo({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? "";
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map


/***/ }),

/***/ 72:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.ResponseCookies),
/* harmony export */   q: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.RequestCookies)
/* harmony export */ });
/* harmony import */ var next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(492);
/* harmony import */ var next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__);
 //# sourceMappingURL=cookies.js.map


/***/ }),

/***/ 444:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ NextResponse)
/* harmony export */ });
/* harmony import */ var _next_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(969);
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);



const INTERNALS = Symbol("internal response");
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw new Error("request.headers must be an instance of Headers");
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set("x-middleware-request-" + key, value);
            keys.push(key);
        }
        headers.set("x-middleware-override-headers", keys.join(","));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        this[INTERNALS] = {
            cookies: new _cookies__WEBPACK_IMPORTED_MODULE_1__/* .ResponseCookies */ .n(this.headers),
            url: init.url ? new _next_url__WEBPACK_IMPORTED_MODULE_0__/* .NextURL */ .c(init.url, {
                headers: (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .toNodeOutgoingHttpHeaders */ .lb)(this.headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === "object" ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set("Location", (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .validateURL */ .r4)(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-rewrite", (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .validateURL */ .r4)(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-next", "1");
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map


/***/ }),

/***/ 969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EK: () => (/* binding */ fromNodeOutgoingHttpHeaders),
/* harmony export */   lb: () => (/* binding */ toNodeOutgoingHttpHeaders),
/* harmony export */   r4: () => (/* binding */ validateURL)
/* harmony export */ });
/* unused harmony export splitCookiesString */
/**
 * Converts a Node.js IncomingHttpHeaders object to a Headers object. Any
 * headers with multiple values will be joined with a comma and space. Any
 * headers that have an undefined value will be ignored and others will be
 * coerced to strings.
 *
 * @param nodeHeaders the headers object to convert
 * @returns the converted headers object
 */ function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === "undefined") continue;
            if (typeof v === "number") {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.
  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.
  
  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
/**
 * Converts a Headers object to a Node.js OutgoingHttpHeaders object. This is
 * required to support the set-cookie header, which may have multiple values.
 *
 * @param headers the headers object to convert
 * @returns the converted headers object
 */ function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === "set-cookie") {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
/**
 * Validate the correctness of a user-provided URL.
 */ function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
} //# sourceMappingURL=utils.js.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(903));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES).middleware_middleware = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=middleware.js.map