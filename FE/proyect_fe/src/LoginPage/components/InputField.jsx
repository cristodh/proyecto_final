import '../styles/InputField.css';
export default function InputField({ label, type, placeholder }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
