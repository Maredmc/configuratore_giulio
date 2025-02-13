import Image from "next/image"

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Image
          src="https://nabecreation.com/cdn/shop/files/logo_def_998c1978-d649-48b3-b326-afa18edf32ed.png?v=1710718770"
          alt="Nabè Creation Logo"
          width={120}
          height={40}
          className="object-contain w-24 md:w-32"
        />
      </div>
    </header>
  )
}

