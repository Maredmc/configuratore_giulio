import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const colors = [
  { name: "Rosso", value: "#FF0000" },
  { name: "Blu", value: "#0000FF" },
  { name: "Verde", value: "#00FF00" },
  { name: "Nero", value: "#000000" },
  { name: "Bianco", value: "#FFFFFF" },
]

export default function ColorPicker({ color, onChange }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Colore</h3>
      <RadioGroup value={color} onValueChange={onChange}>
        {colors.map((c) => (
          <div key={c.value} className="flex items-center space-x-2">
            <RadioGroupItem value={c.value} id={c.value} />
            <Label htmlFor={c.value}>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: c.value }} />
                {c.name}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

