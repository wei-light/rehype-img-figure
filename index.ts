import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

import type { Plugin } from 'unified'
import type { Element, ElementContent, Root } from 'hast'

export interface RehypeImgFigureOptions {
  className: string
}

const isImageElement = (el: ElementContent) => el.type === 'element' && el.tagName === 'img'

const rehypeImgFigure: Plugin<[RehypeImgFigureOptions?], Root> = (options) => {
  const className = (options && options.className) || 'rehype-img-figure'

  const buildFigure = ({ properties }: Element) => {
    const figure = h('figure', { class: className }, [
      h('img', { ...properties }),
      properties?.alt && (properties.alt as string).trim().length > 0
        ? h('figcaption', (properties.alt as string))
        : '',
    ])
    return figure
  }

  return (tree) => {
    visit(tree, { tagName: 'p' }, (node, index, parent) => {
      const images = node.children.filter(n => isImageElement(n)) as Element[]

      if (images.length === 0 || index === null || parent === null) return

      const children = node.children.map(child => {
        return isImageElement(child) ? buildFigure(child as Element) : child
      })

      parent.children[index] = children.length === 1 ? children[0] : h('div', children)
    })
  }
}

export default rehypeImgFigure
