import Header from './components/Header/Header';


export default function Dashboard() {
  return (
    <>
      <div className="containerDashboard flex flex-row gap-x-30 w-full px-10 justify-end">
        
        <div className="container-infos-1">
          <div>Astronauta do dia</div>
          <div>Fase da Lua</div>
          <div>Espaço na sua localização</div>
        </div>

        <div className="container-infos-2">
          <div>Data comemorativa de hoje</div>
          <div>Calendario lunar</div>
        </div>

      </div>
    </>
  )
}
