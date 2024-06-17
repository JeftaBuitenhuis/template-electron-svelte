# Svelte-Electron application

Everything you need to build a Svelte-Electron application combining the two powerfull tools to develop front-end applications rapidly.

## Creating a project

```bash
# create a new project, cloned from github
git clone https://github.com/JeftaBuitenhuis/template-electron-svelte.git

# move into project folder
cd template-electron-svelte

# install all dependencies
npm install
```

## Developing

Once you've created a project and installed dependencies with `npm install`, start a development server and client:

```bash
# run both the svelte server and electron
npm run dev # svelte and electron

# or start the server and client seperately
npm run dev-s # svelte (can also be tested via a browser)
npm run dev-e # electron
```

With the development server and client it is possible to change code runtime.

## Building

To create a production version of your app:

```bash
# build both the svelte server and electron
npm run build # svelte and electron

# or build them seperately
npm run build-s # svelte
npm run build-e # electron
```

## Preview

You can preview the production build with `npm run preview`.

```bash
# preview both the svelte server and electron
npm run preview # preview svelte and electron
npm run previewb # build svelte, then preview svelte and electron

# or preview them seperately
npm run preview-s # svelte
npm run preview-e # electron
```
