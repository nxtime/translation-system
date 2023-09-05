import { TxKeyPath } from '../interfaces/languages';
/**
 * Translates text.
 *
 * @param key The i18n key.
 * @param options The i18n options.
 * @returns The translated text.
 *
 * @example
 * Translations:
 *
 * ```.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 * ```
 *
 * ```.ts
 * Usage:
 * import { translate } from "i18n-js"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
declare const translate: (key: TxKeyPath, options?: Record<string, string | number>) => string;
export default translate;
