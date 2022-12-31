import styles from './App.module.css';
import Navbar from './components/Navbar'
import FavoritesBox from './components/FavoritesBox';
import MainBox from './components/MainBox';
import { useEffect, useState } from 'react';
import Popup from './components/Popup';
import Picker from './components/Picker';
import axios from 'axios'
import Login from './components/Login';
import { host } from './globals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const controlDevice = (device, data) => {
  axios.post(`${host}/api/control_device`, JSON.stringify({
    deviceId: device.id,
    data
  }), { headers: { "Content-Type": "application/json" } })
}

const ControlOptions = ({device}) => {
  const setValue = (name, value) => {
    controlDevice(device, { [name]: value })
  }

  return device.controlOptions.map((option, index) => 
    <div key={index}>
      <h2 style={{display: "inline"}}>{option.name}:</h2>
      { option.type == "picker" ? <Picker options={option} setValue={setValue} /> : "" }
    </div>
  )
}

const DefaultScene = ({toggleFavoritesPopup, toggleControlPopup, devices, favorites, removeFavorite}) => {
  return (
    <>
      <section className={styles.section_favorites}>
        <h1>즐겨찾기</h1>
        <div className={styles.favorite_boxes}>
          {
            favorites.map((id, index) => 
              <FavoritesBox 
                img={devices[id].img}
                title={devices[id].title}
                key={index}
                onClick={() => toggleControlPopup(devices[id])}
                remove={() => removeFavorite(id)}
                cleanup={() => toggleControlPopup(null)} />
            )
          }
          <FavoritesBox img="/plus.jpg" title="ADD" onClick={toggleFavoritesPopup} />
        </div>
      </section>
      <section className={styles.section_main}>
        <h1>제어</h1>
        <div className={styles.main_boxes}>
          {
            devices.map((device, index) => 
              <MainBox 
                img={device.img}
                title={device.title}
                desc={device.desc}
                key={index}
                onClick={() => toggleControlPopup(device)}  />
            )
          }
          <MainBox img="/plus.jpg" title="ADD" desc="새로운 기기 추가하기" />
        </div>
      </section>
    </>
  )
}

function LoginScene() {
  return (
    <>
      <section className={styles.section_login}>
        <h1>로그인</h1>
        <div className={styles.login}>
          <Login />
        </div>
      </section>
    </>
  )
}

function MenuScene({serverInfo}) {
  return (
    <>
      <section className={styles.section_devices}>
        <h1>기기</h1>
        <div className={styles.devices_boxes}>
          <MainBox img="/laptop.jpg" title={serverInfo.hostname} desc={serverInfo.version} />
        </div>
      </section>
      <section className={styles.section_donations}>
        <h1>후원하기</h1>
        <div className={styles.donations}>
          <p>후원은 아직 준비중입니다</p>
        </div>
      </section>
    </>
  )
}

const getFavoritesDB = () => {
  let localFavorites = localStorage.getItem("favorites")
  if (localFavorites == null) {
    localFavorites = []
  } else {
    localFavorites = JSON.parse(localFavorites)
  }
  return localFavorites
}

const setFavoritesDB = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites))
}

function App() {
  let [favoritesPopup, setFavoritesPopup] = useState(false)
  let [controlPopup, setControlPopup] = useState(null)
  let [devices, setDevices] = useState([])
  let [favorites, setFavorites] = useState([])
  let [serverInfo, setServerInfo] = useState({ hostname: "", version: "" })
  let [isDS, setIsDS] = useState(true)

  useEffect(async () => {
    setDevices((await axios.get(`${host}/api/list_devices`)).data)
    setFavorites(getFavoritesDB())

    setServerInfo((await axios.get(`${host}/api/server_info`)).data)
  }, [])

  const toggleControlPopup = (device) => {
    if (device == null) {
      setControlPopup(null)
      return
    }

    if (controlPopup) {
      setControlPopup(null)
    } else {
      setControlPopup(<ControlOptions device={device} />)
    }
  }

  const removeFavorite = (id) => {
    let favoritesDB = getFavoritesDB()
    favoritesDB.splice(favoritesDB.indexOf(id), 1)
    setFavoritesDB(favoritesDB)
    setFavorites(favoritesDB)
  }

  window.oncontextmenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  let DS = <DefaultScene removeFavorite={removeFavorite} favorites={favorites} toggleFavoritesPopup={() => setFavoritesPopup(!favoritesPopup)} devices={devices} toggleControlPopup={toggleControlPopup} />
  let MS = <MenuScene serverInfo={serverInfo} />

  const addFavorite = (device) => { 
    if (!favorites.includes(device.id)) {
      favorites.push(device.id)
      let db = getFavoritesDB()
      if (!db.includes(device.id)) {
        db.push(device.id)
      }
      setFavoritesDB(db)
    }
    setFavoritesPopup(false)
  }

  let FavoritePopup = () =>
    <Popup exit={() => setFavoritesPopup(false)} count={devices.filter(device => !favorites.includes(device.id)).length} title={"Add Favorites"}>
      {
        devices.map((device, index) => {
          if (!favorites.includes(device.id)) {
            return (<MainBox img={device.img} title={device.title} desc={device.desc} key={index} onClick={() => addFavorite(device)} />)
          }
        })
      }
    </Popup>

  let ControlModePopup = () => <Popup exit={() => setControlPopup(null)} count={1} title={"Control Mode"}>{controlPopup}</Popup>

  const MainPage = () => (
    <>
      { isDS ? DS : MS }
      { favoritesPopup ?  <FavoritePopup /> : "" }
      { controlPopup ? <ControlModePopup /> : "" }
    </>
  )

  return (
    <>
      <Navbar sceneToggle={() => setIsDS(!isDS)} startScene={() => setIsDS(true)} />
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='/login' element={<LoginScene />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
