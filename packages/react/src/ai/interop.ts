/**
 * Resolves CJS/ESM interop for dependencies whose pre-bundled default export
 * may be the module namespace object instead of the component (a known esbuild
 * optimizeDeps pitfall, observed with ansi-to-react inside Storybook).
 */
export function resolveInterop<T>(mod: unknown): T {
  if (typeof mod === 'function') {
    return mod as T
  }
  const candidate = (mod as { default?: unknown } | null)?.default
  if (typeof candidate === 'function') {
    return candidate as T
  }
  return mod as T
}
