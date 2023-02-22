import {useState}from "react";
import LogInCard from "../components/LogInCard";
import '../App.css'
import {  Link, useNavigate} from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const LogIn = () => {
  const page = 'login'
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  let history = useNavigate();
  return (
    <main className="form-container">
        {isLogin ? history('/'):(
        <LogInCard 
        setIsLogin={setIsLogin} 
        loginFields={loginFields} 
        setLoginFields={setLoginFields}/>
        )}
    </main>
  );
};

export default LogIn;

