'use client'
import { useEffect, useState } from 'react'
import Cell from './components/cell/cell.js'
import Image from 'next/image'

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
          <Cell name="About" />
          <Cell name="Portfolio" />
          <Cell name="Writing" />
        </div>
        <div className="footer"></div>
      </div>
    </>
  )
}
