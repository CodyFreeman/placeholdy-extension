# Webpack Build System

**NB!** The webpack setup is not yet complete and only works with `npm run dev` using Chrome. I am currently exploring alternative build options than loading a polyfill everywhere.

## Webpack Configs

Webpack configs are loaded dynamically based on `env`. See `./webpack/envInterfaces.ts` for interface for arguments.

## Webpack Presets

Webpack presets is not an official term, but works as partial configs you can load on top of regular webpack configs.

Use the names of the presets you wish to use in a comma separated string as an env argument: `--env.presets compress,analyze` This will add `compress` and `analyze` presets found in this project.

## Future Considerations

- Move to `require` for webpack configs to allow loading arbitrary names like presets.
