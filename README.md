# client-vue

```
Use node 16.0.0
```

npm v16.0.0

Run Tailwind build process
```
npx tailwindcss -i ./src/assets/app.scss -o ./src/assets/output.css --watch
```


To make the **manifest copying** work, the current solution is to change the output directory to manifest/manifest.json
And then manually copy it over. It doesn't create a new file when builds are made.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
