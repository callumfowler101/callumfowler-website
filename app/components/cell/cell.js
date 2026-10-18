'use client'

import styles from './cell.module.css'
import About from './about.js'
import Portfolio from './portfolio.js'
import Writing from './writing.js'

import { useState } from 'react'

const selectCellContent = (name) => {
  if (name === 'About') return <About />
  if (name === 'Portfolio') return <Portfolio />
  if (name === 'Writing') return <Writing />
}

export default function Cell({ name, isActive, onOpen, onClose }) {
  const showPanel = (e) => {
    const id = e.target.id
    const tChild = e.target
    const pChildren = e.target.parentElement.children

    tChild.classList.remove('cell-shrink')
    tChild.classList.toggle('cell-clicked')

    onOpen()

    for (let i = 0; i < pChildren.length; i++) {
      const child = pChildren[i]

      if (child.id === id) continue

      child.classList.remove('cell-clicked')
      if (tChild.classList.value.includes('cell-clicked')) {
        child.classList.add('cell-shrink')
      } else {
        child.classList.remove('cell-shrink')
        onClose()
      }
    }
  }

  return (
    <div className="cell" id={name} onClick={showPanel}>
      {isActive ? selectCellContent(name) : <h2>{name}</h2>}
    </div>
  )
}
