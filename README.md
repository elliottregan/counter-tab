# Counter Tab

A simple counter as your new tab page. Built with [WXT](https://wxt.dev) and vanilla TypeScript. Targets Chrome (Manifest V3) and Firefox.

## Develop

```sh
pnpm install
pnpm dev           # Chrome
pnpm dev:firefox   # Firefox
```

WXT auto-loads the extension into a fresh browser profile and HMR updates the new tab page on save.

## Build

```sh
pnpm compile          # type-check only
pnpm build            # Chrome
pnpm build:firefox    # Firefox
```

Output lands in `.output/<browser>/`.

## Package for the stores

```sh
pnpm zip           # .output/counter-tab-<version>-chrome.zip
pnpm zip:firefox   # .output/counter-tab-<version>-firefox.zip
                   # .output/counter-tab-<version>-sources.zip  (required by AMO)
```

Load `unpacked` from `.output/<browser>/` to test before zipping:
- Chrome: `chrome://extensions` → Developer mode → Load unpacked
- Firefox: `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → pick `manifest.json`

## Build from source (for AMO reviewers)

The source ZIP submitted alongside the Firefox build can be reproduced with:

```sh
# Requires: Node 20+, pnpm 10+
pnpm install --frozen-lockfile
pnpm zip:firefox
```

The unpacked extension at `.output/firefox-mv2/` will match the submitted `counter-tab-<version>-firefox.zip`.

## Release

Tag a version on `main` to trigger the release workflow:

```sh
# bump the "version" field in package.json first, then:
git tag v0.1.0
git push origin v0.1.0
```

The workflow zips both browsers, submits to the Chrome Web Store and Firefox AMO via `wxt submit`, and attaches the zips to a GitHub Release.

### Required secrets

Set these once on the GitHub repo (`Settings → Secrets and variables → Actions`):

**Chrome Web Store**
- `CHROME_EXTENSION_ID`
- `CHROME_CLIENT_ID`
- `CHROME_CLIENT_SECRET`
- `CHROME_REFRESH_TOKEN`

**Firefox Add-ons**
- `FIREFOX_EXTENSION_ID`
- `FIREFOX_JWT_ISSUER`
- `FIREFOX_JWT_SECRET`

Run `pnpm wxt submit init` locally for an interactive walk-through of how to obtain each one.
