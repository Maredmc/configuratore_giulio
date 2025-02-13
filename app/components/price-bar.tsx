import { Button } from "@/components/ui/button"

interface PriceBarProps {
  price: number
}

export default function PriceBar({ price }: PriceBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-50">
      <div>
        <div className="text-2xl font-bold">€ {price}</div>
        <div className="text-sm text-gray-500">Prezzo IVA inclusa</div>
      </div>
      <Button size="lg" className="bg-[#79aea3] hover:bg-[#679a8f]">
        Ordina Ora
      </Button>
    </div>
  )
}

