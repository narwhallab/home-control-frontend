import React from "react"
import styles from "./FavoritesBox.module.css"
import { FaRegTrashAlt } from "react-icons/fa"

const FavoritesBox = ({img, title, onClick, remove, cleanup}) => {
    let timeout
    const endTimer = () => {
        if (title != "ADD") {
            clearTimeout(timeout)
            onClick()
        }
    }

    const startTimer = (element) => {
        let parent = element.closest(`.${styles.favorites_box}`)
        if (title != "ADD") {

            timeout = window.setTimeout(() => {
                parent.classList.add(styles.favorites_box_delete)
                window.setTimeout(() => {
                    remove()
                    cleanup()
                }, 500)
            }, 1000)
        } else {
            onClick()
        }
    }
    return (
        <div 
            className={styles.favorites_box} 
            onTouchStart={(e) => startTimer(e.target)} 
            onTouchEnd={endTimer} 
            onMouseDown={(e) => startTimer(e.target)} 
            onMouseUp={endTimer}>

            {title != "ADD" ? <span className={styles.favorites_can}><FaRegTrashAlt /></span> : ""}
            <img src={img} className={styles.favorites_image} />
            <h3>{title}</h3>
        </div>
    )
}

const FavoritesBoxes = ({favorites, devices, toggleControlPopup, removeFavorite, toggleFavoritesPopup}) => {
    return (
        <>
        {
            favorites.map((id, index) => 
              <FavoritesBox 
                img={devices[id].img}
                title={devices[id].name}
                key={index}
                onClick={() => toggleControlPopup(devices[id])}
                remove={() => removeFavorite(id)}
                cleanup={() => toggleControlPopup(null)} />
            )
          }
          <FavoritesBox img="/plus.jpg" title="ADD" onClick={toggleFavoritesPopup} />
        </>
    )
}

export { FavoritesBoxes, FavoritesBox }