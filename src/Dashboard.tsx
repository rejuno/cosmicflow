import Astronautas from "./pages/Astronautas"
import Lua from "./pages/Lua"
import CeuLocal from "./pages/CeuLocal"

export default function Dashboard() {
  return (
      <div className="containerDashboard flex justify-center lg:justify-end items-center w-full px-10">
        <div className="flex flex-row w-4/5">
          <div className="flex flex-col gap-8">
            <Astronautas />
            <CeuLocal />
            <Lua />
          </div>

          <div className="container-infos-2">
            <div>Data comemorativa de hoje</div>
            <div>Calendario lunar</div>
          </div>
      </div>
      </div>
  )
}
