import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"

const sizes = [
  { name: "190x80", value: "190x80" },
  { name: "190x120", value: "190x120" },
  { name: "160x80", value: "160x80" },
]

const colors = [
  { name: "Legno naturale", value: "natural" },
  { name: "Bio paint (bianco 9010)", value: "white" },
]

const railingOptions = [
  { name: "Senza Sponde", value: "none" },
  { name: "Set superiore letto", value: "top" },
  { name: "Set completo", value: "full" },
  { name: "Set testiera + pediera", value: "ends" },
]

const evolutiveKitOptions = [
  { name: "Nessun kit", value: "none" },
  { name: "Kit piedini 11cm", value: "small" },
  { name: "Kit piedOni 23cm", value: "large" },
]

interface ConfigPanelProps {
  size: string
  onSizeChange: (size: string) => void
  color: string
  onColorChange: (color: string) => void
  railings: string
  onRailingsChange: (railings: string) => void
  evolutiveKit: string
  onEvolutiveKitChange: (kit: string) => void
  dimensions: { length: number; width: number }
  className?: string
}

export default function ConfigPanel({
  size,
  onSizeChange,
  color,
  onColorChange,
  railings,
  onRailingsChange,
  evolutiveKit,
  onEvolutiveKitChange,
  dimensions,
  className = "",
}: ConfigPanelProps) {
  return (
    <div className={`p-4 md:p-8 bg-white pb-40 ${className}`}>
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">nabè zero+ Earth</h1>
        <div className="flex gap-6 md:gap-8 text-lg md:text-xl">
          <div>
            <span className="block text-gray-600">Lunghezza</span>
            <span className="font-bold">{dimensions.length} cm</span>
          </div>
          <div>
            <span className="block text-gray-600">Larghezza</span>
            <span className="font-bold">{dimensions.width} cm</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dimensioni</h3>
          <RadioGroup value={size} onValueChange={onSizeChange}>
            {sizes.map((s) => (
              <div key={s.value} className="flex items-center space-x-2 p-2">
                <RadioGroupItem value={s.value} id={`size-${s.value}`} />
                <Label htmlFor={`size-${s.value}`}>{s.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Materiale</h3>
          <RadioGroup value={color} onValueChange={onColorChange}>
            {colors.map((c) => (
              <div key={c.value} className="flex items-center space-x-2 p-2">
                <RadioGroupItem value={c.value} id={`color-${c.value}`} />
                <Label htmlFor={`color-${c.value}`}>{c.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sponde protettive</h3>
          <RadioGroup value={railings} onValueChange={onRailingsChange}>
            {railingOptions.map((r) => (
              <div key={r.value} className="flex items-center space-x-2 p-2">
                <RadioGroupItem value={r.value} id={`railings-${r.value}`} />
                <Label htmlFor={`railings-${r.value}`}>{r.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        <Card className="p-6 mb-32">
          <h3 className="text-lg font-semibold mb-4">Kit evolutivi</h3>
          <RadioGroup value={evolutiveKit} onValueChange={onEvolutiveKitChange}>
            {evolutiveKitOptions.map((k) => (
              <div key={k.value} className="flex items-center space-x-2 p-2">
                <RadioGroupItem value={k.value} id={`kit-${k.value}`} />
                <Label htmlFor={`kit-${k.value}`}>{k.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </Card>
      </div>
    </div>
  )
}

