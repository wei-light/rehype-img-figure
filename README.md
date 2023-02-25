# rehype-img-figure

A rehype plugin to add figure and figcaption for image.

## Install

```bash
npm install rehype-img-figure # yarn add rehype-img-figure
```

## Use

Here's a `example.md` file:

```markdown
![image]()

Enim pariatur ad incididunt aliqua et nostrud ea qui tempor est.
![image]()

![image1]()
![image2]()
```

And the module `example.js`:

```js
import fs from 'node:fs'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeImgFigure from 'rehype-img-figure'

const file = await remark()
  .use(remarkRehype)
  .use(rehypeImgFigure)
  .use(rehypeStringify)
  .process(fs.readFileSync('example.md'))

console.log(String(file))
```

Output:

```html
<figure class="rehype-img-figure">
  <img src="" alt="image" />
  <figcaption>image</figcaption>
</figure>
<div>
  Enim pariatur ad incididunt aliqua et nostrud ea qui tempor est.
  <figure class="rehype-img-figure">
    <img src="" alt="image" />
    <figcaption>image</figcaption>
  </figure>
</div>
<div>
  <figure class="rehype-img-figure">
    <img src="" alt="image1" />
    <figcaption>image1</figcaption>
  </figure>
  <figure class="rehype-img-figure">
    <img src="" alt="image2" />
    <figcaption>image2</figcaption>
  </figure>
</div>
```

## Options

### `className`

Specify the class name for `<figure>` (`string`, default: `'rehype-img-figure'`)