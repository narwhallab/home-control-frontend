import styles from './App.module.css';
import Navbar from './components/Navbar'
import {FavoritesBoxes} from './components/FavoritesBox';
import {MainBoxes,MainBox} from './components/MainBox';
import { useEffect, useState } from 'react';
import Popup from './components/Popup';
import Picker from './components/Picker';
import Range from './components/Range';
import axios from 'axios'
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getCookie, expireCookie } from './util/cookies';
import ReadData from './components/ReadData';

const access_key = getCookie("access_key")

const logout = () => {
  expireCookie("access_key")
  window.location.href = "/login"
}

const controlDevice = (device, data) => {
  axios.post(`/api/control_device`, JSON.stringify({
    device_id: device.id,
    data
  }), { headers: { "Content-Type": "application/json", "Authorization": `bearer ${access_key}` } }).catch(e => {
    alert("Failed to Control Device")
  })
}

const retrieveData = (device, callback) => {
  axios.post(`/api/fetch_info`, JSON.stringify({
    device_id: device.id,
  }), { headers: { "Content-Type": "application/json", "Authorization": `bearer ${access_key}` } }).catch(e => {
    alert("Failed to Control Device")
  })
  .then(res => {
    callback(res.data)
  })
}

const ControlOptions = ({device}) => {
  const setValue = (name, value) => {
    controlDevice(device, { [name]: value })
  }

  return device.ctrl_opts.map((option, index) => 
    <div key={index}>
      <h2 style={{display: "inline"}}>{option.name}:</h2>
      { option.type == "picker" ? <Picker options={option} setValue={setValue} /> : "" }
      { option.type == "range" ? <Range options={option} setValue={setValue} /> : "" }
      { option.type == "read" ? <ReadData device={device} retrieveData={retrieveData} /> : "" }
    </div>
  )
}

const DefaultScene = ({toggleFavoritesPopup, toggleControlPopup, devices, favorites, removeFavorite}) => {
  return (
    <>
      <section className={styles.section_favorites}>
        <h1>즐겨찾기</h1>
        <div className={styles.favorite_boxes}>
          <FavoritesBoxes favorites={favorites} devices={devices} removeFavorite={removeFavorite} toggleControlPopup={toggleControlPopup} toggleFavoritesPopup={toggleFavoritesPopup} />
        </div>
      </section>
      <section className={styles.section_main}>
        <h1>제어</h1>
        <div className={styles.main_boxes}>
          <MainBoxes devices={devices} toggleControlPopup={toggleControlPopup} />
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
      <section className={styles.section_logout}>
        <h1>로그아웃</h1>
        <div className={styles.devices_boxes}>
         <MainBox img="/laptop.jpg" title="Logout" desc="Logout from the current session" onClick={() => logout()} />
        </div>
      </section>
      <section className={styles.section_donations}>
        <h1>후원하기</h1>
        <div className={styles.devices_boxes}>
         <MainBox img="/laptop.jpg" title="Toss" desc="Any help appreciated" onClick={() => window.location.href = "https://toss.me/dolphin241"} />
         <MainBox img="/laptop.jpg" title="GitHub" desc="Sponsor me on GitHub" onClick={() => window.location.href = "https://github.com/sponsors/dolphin2410"} />
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
    setDevices((await axios.get(`/api/list_devices`)).data)
    setFavorites(getFavoritesDB())

    setServerInfo((await axios.get(`/api/server_info`)).data)
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
    <Popup exit={() => setFavoritesPopup(false)} count={Object.keys(devices).filter(id => !favorites.includes(id)).length} title={"Add Favorites"}>
      {
        Object.keys(devices).map((id, index) => {
          let device = devices[id]
          if (!favorites.includes(device.id)) {
            return (<MainBox img={device.img} title={device.name} desc={device.desc} key={index} onClick={() => addFavorite(device)} />)
          }
        })
      }
    </Popup>

  let ControlModePopup = () => <Popup exit={() => setControlPopup(null)} count={1} title={"Control Mode"}>{controlPopup}</Popup>

  const MainPage = () => (
    <>
      { isDS ? DS : MS }
      { favoritesPopup ? <FavoritePopup /> : "" }
      { controlPopup ? <ControlModePopup /> : "" }
    </>
  )

  return (
    <>
      <Navbar sceneToggle={() => setIsDS(!isDS)} startScene={() => setIsDS(true)} />
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />}  />
          <Route path='/login' element={<LoginScene />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
