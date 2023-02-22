import {useState} from "react";
import { useNavigate} from "react-router-dom";
import '../App.css'
import LogInCard from "../components/LogInCard";
import SignUpCard from "../components/SignUpCard";

const SignUp = () => { 
  const [didSignUp, setDidSignUp] = useState(false);
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  let history = useNavigate();
  return (

    <main className="form-container">
        {didSignUp ? history('/login') : (
        <SignUpCard setDidSignUp={setDidSignUp} />
      )}
    </main>
  );
};

export default SignUp;
