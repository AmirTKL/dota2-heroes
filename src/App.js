import { useEffect, useState } from "react";
import "./App.css"

function App() {
  const [search, setSearch] = useState("")
  const [heroes, setHeroes] = useState([])
  const [openHero, setOpenHero] = useState(null)
  useEffect(() => {
    fetcher()
  }, [])
  async function fetcher() {
    const response = await fetch("https://api.opendota.com/api/heroStats")
    const responseBody = await response.json()
    setHeroes(responseBody)
  }


  return (
    <div className={"parent-of-divs"}>
      <div className={"search"}>
        <p> Search Your Hero </p>
        <input onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>
      <div>

        <div className={"hero-cards"}>
          {heroes.filter((hero) => {
            return hero.localized_name.toLowerCase().includes(search.toLowerCase())
          }).map((hero) => <div className={"hero-card"} key={hero.id}>
            <img alt={hero.localized_name}
              src={"https://api.opendota.com" + hero.icon} />
            <div className="card-info">
              <div>{hero.localized_name}</div>
              <div className="hero-roles">{hero.roles.join(" - ")}</div>
              <div className={`hero-div hero-div-${hero.primary_attr}`}>
                {hero.primary_attr}
              </div>
              <div className="hero-attack-type">{hero.attack_type}</div>
              <div> <img alt={hero} src={"https://www.dotafire.com/images/icon_str.png"} /> {hero.base_str} <br />
                <img alt={hero} src={"https://www.dotafire.com/images/icon_agi.png"} /> {hero.base_agi} <br />
                <img alt={hero} src={"https://www.dotafire.com/images/icon_int.png"} /> {hero.base_int}
                <button className="more-btn" onClick={() => setOpenHero(hero.id === openHero ? null : hero.id)}>{openHero === hero.id ? "Close" : "More..."}</button>
                <div className="more-information" style={{ display: openHero === hero.id ? '' : 'none' }}>
                  <div>Attack Range: {hero.attack_range}</div>
                  <img className="more-information-img" alt={hero.localized_name} src={"https://api.opendota.com" + hero.img} />
                </div>
              </div>
            </div>
          </div>)}
        </div>

      </div>
    </div >


  )
}

export default App;
