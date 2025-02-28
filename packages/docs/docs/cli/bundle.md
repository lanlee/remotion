---
image: /generated/articles-docs-cli-bundle.png
title: npx remotion bundle
sidebar_label: bundle
crumb: CLI Reference
---

_available from v4.0.89_

Creates a [Remotion Bundle](/docs/terminology/bundle) on the command line.  
Equivalent to the [`bundle()`](/docs/bundle) Node.JS API.

```bash
npx remotion bundle <serve-url|entry-file>?
```

You may pass a [Serve URL](/docs/terminology/serve-url) or an [entry point](/docs/terminology/entry-point) as the first argument, otherwise the entry point will be [determined](/docs/terminology/entry-point#which-entry-point-is-being-used).

## Flags

### `--config`

Specify a location for the Remotion config file.

### `--log`

[Set the log level](/docs/config#setlevel). Increase or decrease the amount of output. Acceptable values: `error`, `warn`, `info` (_default_), `verbose`

### `--public-dir`

[Define the location of the `public/` directory.](/docs/config#setpublicdir). If not defined, Remotion will assume the location is the `public` folder in your Remotion root.

### `--out-dir`

Define the location of the resulting bundle. By default it is a folder called `./build`, adjacent to the [Remotion Root](/docs/terminology/remotion-root).
