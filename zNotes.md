```ts
// 1- SVG
// to display an svg from the static files at /public, then you will have to referance it using the <Image/>
// and you will have to use xmlns <svg xmlns="http://www.w3.org/2000/svg"> to tell the browser how to parse this svg file

<div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-dark-4 '>
  <Image
    src='/logo.svg'
    alt='profile'
    width={20 * 4}
    height={20 * 4}
    priority
    className='absolute left-1/2 top-1/2 w-20 -translate-x-1/2 -translate-y-1/2 '
  />
</div>;

// to avoide using the Image tag for svgs, you will need to create a folder called Svgs inside the components folder and store all the svgs in there then index export them
export { default as Logo } from './Logo';
export { default as Shop } from './Shop';
```

```ts
// add this to vscode global setting.json to have auto sort imports on save
// the imports order won't couse erros, and it also help us catch any errors, so there is no need to set an eslint watcher for the imports ordering, just let vscode sort them on save and trust it
,
	"editor.codeActionsOnSave": {
		"source.organizeImports": true
	}
```

>
