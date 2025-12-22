import { FormEvent, useState } from "react";
import "./App.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

import logoImg from "./assets/gasolina-calc.png";

// Calculo dividir o alcool / gasolina
// se o resultado for menor de 0.7 compesa usar o alcool

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

  function calcular(event: FormEvent) {
    event.preventDefault();

    const gasolina = Number(gasolinaInput);
    const alcool = Number(alcoolInput);

    if (gasolina === 0 || alcool === 0 || isNaN(gasolina) || isNaN(alcool)) {
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
    const valorFormatado = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return valorFormatado;
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
        <h4 className="title_h4">
          Calcule qual combustível é mais vantajoso usar
        </h4>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="Digite um valor"
            min="1"
            step="0.01"
            required
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(e.target.value)}
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="Digite um valor"
            min="1"
            step="0.01"
            required
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(e.target.value)}
          />
          {title === false && (
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
          )}
          {title === true && (
            <input className="button" type="submit" value="Calcular" />
          )}
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>

            <span>Álcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )}
      </main>
      <footer className="footer">
        <p>
          Desenvolvido por <strong>Leo Gomes Developer</strong> &copy; 2025
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/leo-gomes-dev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/leo-gomes-dev/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/leogomes_dev/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
