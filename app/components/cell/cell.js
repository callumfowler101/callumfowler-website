import styles from './cell.module.css'

const showPanel = (e) => {
  console.log('bang')
  const id = e.target.id
  const tChild = e.target
  const pChildren = e.target.parentElement.children

  tChild.classList.remove('cell-shrink')
  tChild.classList.toggle('cell-clicked')

  for (let i = 0; i < pChildren.length; i++) {
    const child = pChildren[i]
    console.log(child.id)
    if (child.id === id) continue
    child.classList.remove('cell-clicked')

    if (tChild.classList.value.includes('cell-clicked')) {
      child.classList.add('cell-shrink')
    } else {
      child.classList.remove('cell-shrink')
    }
  }
  console.log(pChildren)
}

export default function Cell({ name }) {
  return (
    <div className="cell" id={name} onClick={showPanel}>
      <h2>{name}</h2>
    </div>
  )
}
