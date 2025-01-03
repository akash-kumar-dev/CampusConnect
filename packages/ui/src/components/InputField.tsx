export function InputField({ label, type, value, onChange }: { label: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
      <div>
        <label>{label}</label>
        <input type={type} value={value} onChange={onChange} />
      </div>
    );
  }