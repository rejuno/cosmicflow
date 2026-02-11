import Astronautas from "./pages/Astronautas"
import Lua from "./pages/Lua"
import CeuLocal from "./pages/CeuLocal"
import DataComemorativa from "./pages/DataComemorativa"
import CalendarioLunar from "./pages/CalendarioLunar"

export default function Dashboard() {
  return (
      <div className="containerDashboard flex flex-col 2xl:flex-col-reverse justify-center p-3 lg:justify-end items-center w-full lg:px-12">
      
      <div className="flex flex-col 2xl:flex-row w-full gap-x-20 gap-y-8 pb-10 2xl:pb-0">
        <div className="flex flex-col gap-x-8 gap-y-8 2xl:gap-y-5 order-2 2xl:order-1">
          <Astronautas />
          <Lua />
          <CeuLocal />
        </div>

        <div className="container-infos-2 w-full flex flex-col justify-between gap-8 2xl:gap-4 2xl:pb-0 order-1 2xl:order-2">
          <DataComemorativa />
          <CalendarioLunar />
        </div>
      </div>
    </div>
  )
}
