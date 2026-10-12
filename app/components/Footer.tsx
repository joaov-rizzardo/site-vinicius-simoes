import Image from "next/image";
import { site } from "../config";
import { Instagram, RodapeClinica, RodapeHospital, RodapeMonitor, RodapePino, WhatsApp } from "./icons";

export default function Footer() {
  return (
    <footer id="contato" className="rodape">
      <div className="rodape__inner">
        <div className="rodape__topo">
          <div className="rodape__marca">
            <Image src="/img/logo.png" alt="Logo Vinicius Vicente Simões" width={317} height={378} />
            <span className="marca__textos">
              <span className="marca__nome">{site.nome}</span>
              <span className="marca__cargo">{site.cargo}</span>
            </span>
          </div>
          <p className="rodape__frase">
            Seu pet, seu aquário,
            <br />
            <span>meu compromisso.</span>
          </p>
          <div className="rodape__redes">
            <span>SIGA NAS REDES</span>
            <div>
              <a className="cta botao-redondo" href={site.instagram} target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
                <Instagram />
              </a>
              <a className="cta botao-redondo" href={site.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">
                <WhatsApp />
              </a>
            </div>
          </div>
        </div>
        <ul className="rodape__locais">
          <li>
            <RodapePino />
            Vale do Paraíba
          </li>
          <li>
            <RodapeClinica />
            Cachoeira Paulista
          </li>
          <li>
            <RodapeHospital />
            Cruzeiro
          </li>
          <li>
            <RodapeMonitor />
            Consultoria de Aquarismo (virtual)
          </li>
        </ul>
      </div>
    </footer>
  );
}
