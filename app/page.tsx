'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const showPanel = (e) => {
  const id = e.target.id
  const tChild = e.target
  const pChildren = e.target.parentElement.children

  tChild.classList.remove('cell-shrink')
  tChild.classList.toggle('cell-clicked')
  for (let i = 0; i < pChildren.length; i++) {
    const child = pChildren[i]
    if (child.id !== id) {
      if (tChild.classList.value.includes('cell-clicked')) {
        child.classList.add('cell-shrink')
        child.classList.remove('cell-clicked')
      } else {
        child.classList.remove('cell-shrink')
      }
    }
  }
}

export default function Home() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="tint" colorInterpolationFilters="sRGB">
          <feFlood id="tint-color" floodColor="#2c3b23" result="color" />
          <feComposite in="color" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>
      <div className="container">
        <div className="header">
          <div>
            <p>Developer | Writer | Musician | Activist</p>
          </div>
          <div>
            <h2>Callum Fowler</h2>
          </div>
          <div>
            <nav>
              <a href="https://www.google.com/">
                <img src="./x-logo.png" alt="x-logo" />
              </a>
              <a href="https://www.google.com/">
                <img src="./substack-logo.png" alt="substack-logo" />
              </a>
              <a href="https://www.google.com/">
                <img src="./github-logo.png" alt="github-logo" />
              </a>
            </nav>
          </div>
        </div>
        <div className="cell-container">
          <div className="cell" id="about" onClick={showPanel}>
            About
          </div>
          <div className="cell" id="portfolio" onClick={showPanel}>
            Portfolio
          </div>
          <div className="cell" id="writing" onClick={showPanel}>
            Writing
          </div>
        </div>
      </div>
    </>
  )
}
