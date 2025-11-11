import RoleCard from "../../demo/components/RoleCard";
import '../styles/Register.css';
const RegisterForm = () => {
    return(
        <>
              <section className="role-selection">
                <h2>Únete como</h2>
                <p>Elige tu rol para comenzar a generar un impacto.</p>
                <div className="roles">
                  <RoleCard title="Donante" description="Apoya proyectos que transforman comunidades." />
                  <RoleCard title="Gestor de Proyectos" description="Crea y conecta tu idea con financiamiento." />
                </div>
              </section>
        </>
    )
}
export default RegisterForm;