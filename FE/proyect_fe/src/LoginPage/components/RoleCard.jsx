import '../styles/RoleCard.css';
export default function RoleCard({ title, description }) {
  return (
    <div className="role-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}