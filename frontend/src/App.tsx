import { useState, useEffect } from 'react'
import { login, register } from "./api/authApi";
import {getAnswer} from "./api/deepApi";
import { getGuides, searchGuides, type Guide} from './api/guideApi';
import { getCodecuts, createCodecut, deleteCodecut,type Codecut} from './api/cutApi';
import { type State } from './api/stateApi';
import './App.css'

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [req, setReq] = useState("");
  const [resp, setResp] = useState("")
  const [guides, setGuides] = useState<Guide[]>([]);
  const [codecuts, setCodecuts] = useState<Codecut[]>([]);

  const [state, setState] = useState<keyof typeof views>("guides");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // false = вход, true = регистрация
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guideError, setGuideError] = useState("");



  const [cuts, setCuts] = useState<Codecut[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [cutError, setCutError] = useState("");


  async function handleAddCut(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newCut = await createCodecut(title, description, code);
      setCodecuts([...codecuts, newCut]);
      setTitle("");
      setDescription("");
      setCode("");
    } catch {
      setCutError("Ошибка при создании задачи");
    }
  }


  async function loadCuts() {
    setLoading(true);
    try {
      const data = await getCodecuts();
      setCodecuts(data);
      setCutError("");
    } catch {
      setCutError("Не удалось загрузить сниппеты");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCut(id: number) {
    try {
      await deleteCodecut(id);
      setCodecuts((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setCutError("Ошибка при удалении сниппета");
    }
  }
  



  function guidesblock(){
  const [openId, setOpenId] = useState<number | null>(null);
  return(
  <div className="guides-list">
        {loading ? (
          <p>Загрузка...</p>
        ) : guides.length === 0 ? (
          <p>пусто</p>
        ) : (
          guides.map((guide, index) => (
            
            <div key={index} className="guide-card">
              <div className="guide-info">
                <strong>{guide.title}</strong>

                
              </div>
              <button onClick={() => setOpenId(openId === index ? null : index)}>
            {openId === index ? "Свернуть" : "Развернуть"}
          </button>
          {openId === index && <p>{guide.description}<br />{guide.syntax}</p>}
            </div>
          ))
        )}
      </div>)};
    

  function cutsblock(){
    const [openId, setOpenId] = useState<number | null>(null);
    return(
      <div className="cutsBlock">
      <form className="add-form" onSubmit={handleAddCut}>
        <input
          type="text"
          placeholder="Название сниппета"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Наполнение"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>

      <div className="codecuts-list">
        {loading ? (
          
          <p>Загрузка...</p>
        ) : codecuts.length === 0 ? (
          <p>Сниппетов пока нет. Создайте первый!</p>
        ) : (
          codecuts.map((codecut) => (
            <div key={codecut.id} className="cut-card">
              <div className="cut-info">
                <strong>{codecut.title}</strong>
              </div>
              {openId === codecut.id && <p> {codecut.description}<br />{codecut.code}</p>}
              <div className="cutButtonsContainer">
              <button onClick={() => setOpenId(openId === codecut.id ? null : codecut.id)}>
            {openId === codecut.id ? "Свернуть" : "Развернуть"}
          </button>
              <button
                className="delete-btn"
                onClick={() => {handleDeleteCut(codecut.id)}}
              >
                🗑
              </button></div>
            </div>)))}
      </div>
      </div>
    )
  }

  const views = {
  "guides": guidesblock(),
  "cuts": cutsblock(),
};



  useEffect(() => {
    if (token) {
      loadGuides();
      loadCuts();
    }
  }, [token]);

  async function loadGuides() {
    setLoading(true);
    try {
      const data = await getGuides();
      setGuides(data);
      setGuideError("");
    } catch {
      setGuideError("Не удалось загрузить документации");
    } finally {
      setLoading(false);
    }
  }



  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");

    try {
      if (isRegister) {
        // Регистрация
        await register({ email, password });
        // После регистрации сразу входим
        const tokenData = await login({ email, password });
        localStorage.setItem("access_token", tokenData.access_token);
        setToken(tokenData.access_token);
      } else {
        // Вход
        const tokenData = await login({ email, password });
        localStorage.setItem("access_token", tokenData.access_token);
        setToken(tokenData.access_token);
        setGuideState
      }
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setAuthError(err.message);
    }
  }


  

    function handleLogout() {
    localStorage.removeItem("access_token");
    setToken(null);
    setGuides([]);
    setCodecuts([])
  }

  function setGuideState() {
    setState("guides")
  }

  function setCutState() {
    setState("cuts")
  }

  if (!token) {
    return (
      <div className="containerForm">
        <h1>Авторизация</h1>
        <div className="auth-form">
          <h2>{isRegister ? "Регистрация" : "Вход"}</h2>

          {authError && <div className="error">{authError}</div>}

          <form onSubmit={handleAuth}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className='rgstrbtn'>
              {isRegister ? "Зарегистрироваться" : "Войти"}
            </button>
          </form>

          <p className="toggle" onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>

      <div className='container'>
        <div className='header'>
          <h2>&lt;CodeTool&gt;</h2>
        </div>

        <div className='logo'/>
        <div className='uppContainer'>
        <div className='buttonContainer'>

          <button type='submit' onClick={setGuideState}>Справочник
            
          </button>
          <button type='submit' onClick={setCutState}>Сниппеты</button>
        </div>


        <div className='user'>
          <button type='submit' onClick={handleLogout}>Выйти
          </button>
        </div>
        </div>
        <div className='containerContainer'>
        <div className='secondContainer'>
          {views[state]}
        </div>
        <div className='deepContainer'>
          <div className='respContainer'>
            <h5>{resp}</h5>
          </div>
          <input className="DeepText" type='text' placeholder='запрос' value ={req} onChange={(e) => setReq(e.currentTarget.value)} onKeyDown={async (e) => {if (e.key === "Enter"){setResp('Загрузка ответа...');setResp(await getAnswer(e.currentTarget.value));}}} ></input>
        </div>


        </div>

      </div>
    </>
  )
}

export default App
 