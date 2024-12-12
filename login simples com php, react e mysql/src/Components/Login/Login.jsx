import {FaUser, FaLock} from 'react-icons/fa';
import { useState } from 'react';
import "./Login.css";

const Login = () => {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const user = document.getElementById('user');
    const pass = document.getElementById('pass');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const loginData = {
            usuario: username,
            senha: password,
        };

        try {
            // Enviar a requisição POST para a API PHP
            const response = await fetch('http://localhost:8000/login.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginData),
            });
      
            const result = await response.json();

            if (result.success) {
              alert('Login realizado com sucesso');
            } else {
                user.value = "";
                pass.value = "";
                user.placeholder = "Dados incorretos. Tente novamente";
                pass.placeholder = "Dados incorretos. Tente novamente";
            }
          } catch (error) {
            alert('Erro ao se comunicar com o servidor.');
          }
    };

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <h1>ACESSE O SISTEMA</h1>
            <div>
                <FaUser className="icon"/>
                <input type="text" placeholder="E-mail" required onChange={(e) => setUsername(e.target.value)} id='user'/>
            </div>
            <div>
                <FaLock className="icon"/>
                <input type="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)} id='pass'/>
            </div>
            <div className="recall-forget">
                <label>
                    <input type="checkbox"/>
                    Lembre de mim
                </label>
                <a href="#">Esqueci minha senha</a>
            </div>
            <button>Entrar</button>
            <div className="signup-link">
                <p>Não tem uma conta? <a href="#">Registre-se.</a></p>
            </div>
        </form>
    </div>
  );
};

export default Login;
