import { FormEvent, useState } from "react";
import "./App.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaQuestionCircle,
} from "react-icons/fa"; // Adicionado ícone de ajuda

import logoImg from "./assets/gasolina-calc.png";

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState<string>("");
  const [alcoolInput, setAlcoolInput] = useState<string>("");
  const [info, setInfo] = useState<InfoProps>();
  const [title, setTitle] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para o modal

  function calcular(event: FormEvent) {
    event.preventDefault();

    const gasolina = Number(gasolinaInput);
    const alcool = Number(alcoolInput);

    if (gasolina <= 0 || alcool <= 0 || isNaN(gasolina) || isNaN(alcool)) {
      alert("Preencha os campos com valores válidos.");
      return;
    }

    const calculo = alcool / gasolina;

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usar álcool",
        gasolina: formatarMoeda(gasolina),
        alcool: formatarMoeda(alcool),
      });
    } else {
      setInfo({
        title: "Compensa usar gasolina",
        gasolina: formatarMoeda(gasolina),
        alcool: formatarMoeda(alcool),
      });
    }
    setTitle(false);
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div>
      <main className="container">
        <img
          className="logo"
          src={logoImg}
          alt="Logo da calculadora de gasolina ou alcool"
        />
        <h1 className="title">Calculadora de Combustível</h1>

        {/* Botão de Informação */}
        <button className="btn-info" onClick={() => setShowModal(true)}>
          <FaQuestionCircle size={18} /> Entenda o cálculo
        </button>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="Ex: 3.99"
            min="0.01"
            step="0.01"
            required
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(e.target.value)}
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="Ex: 5.89"
            min="0.01"
            step="0.01"
            required
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(e.target.value)}
          />

          {title === false ? (
            <input
              className="button-limpar"
              type="button"
              value="Limpar"
              onClick={() => {
                setGasolinaInput("");
                setAlcoolInput("");
                setInfo(undefined);
                setTitle(true);
              }}
            />
          ) : (
            <input className="button" type="submit" value="Calcular" />
          )}
        </form>

        {info && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>
            <span>Álcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )}

        {/* modal para mostrar informações sobre o cálculo */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Como funciona o cálculo?</h2>
              <p>Dividimos o preço do litro do Álcool pelo da Gasolina.</p>
              <ul>
                <li>
                  <strong>Abaixo de 0,70:</strong> Álcool compensa.
                </li>
                <li>
                  <strong>Acima de 0,70:</strong> Gasolina compensa.
                </li>
                <li>
                  <strong>Igual a 0,70:</strong> Indiferente.
                </li>
              </ul>
              <p>
                <small>
                  O fator 0,70 é usado porque o etanol rende, em média, 70% da
                  gasolina.
                </small>
              </p>

              <div className="modal-links">
                <strong>Fonte:</strong>
                <p>Simulador ANP, Calculadora G1</p>
              </div>

              <button
                className="button-close"
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="text-apoio">
          <h3>Gostou do projeto?</h3>
          <p>Se este trabalho te ajudou, considere me pagar um café!</p>

          <a
            href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=444f1eb39bc44922871a3d10b7350c81"
            target="_blank"
            className="ask-coffee"
          >
            <span>☕</span>
            Me paga um café?
          </a>
        </div>
        <p>
          By <strong>Leo Gomes Developer</strong> &copy; 2025
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/leo-gomes-dev"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/leo-gomes-dev/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/leogomes_dev/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
