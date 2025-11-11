const LoginForm = () =>{
    return(
        <>
        <div className="login-page">
              <Header />
              <section className="form-section">
                <InputField label="Correo Electrónico" type="email" placeholder="Ingresa tu correo electrónico" />
                <InputField label="Contraseña" type="password" placeholder="Ingresa tu contraseña" />
                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                <Button text="Iniciar Sesión" />
                <p className="login-link">¿Ya tienes una cuenta? <a href="#">Inicia sesión aquí</a></p>
              </section>
            </div>  
        </>
    )
}
export default LoginForm;