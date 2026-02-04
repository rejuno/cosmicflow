import logo from '../../assets/images/logolight.webp';

export default function Header() {
  return (
    <header className="flex justify-center lg:justify-end items-center w-full px-4 lg:px-10 py-5">
      
      <div className="flex flex-row lg:flex-row items-center justify-between lg:justify-between w-full lg:w-4/5 text-center">
        <img
          src={logo}
          alt="Logo Cosmic Flow"
          className="w-40 lg:w-auto"
        />

        <h1 className="text-red-400 text-3xl">
          Tema
        </h1>
      </div>

    </header>
  )
}
