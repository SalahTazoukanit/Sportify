import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const LegalMentions = () => {
  return (
    <>
      <Header />
      <div className="genral-block">
        <h2 className="text-center mt-5">Mentions Légales de Sportify</h2>
        <div className="flex m-5">
          <div className="md:w-1/4 flex-col italic hidden md:block">
            <a href="#editor">
              <h3 className="w-1/3 rounded hover:bg-second-color hover:text-white">
                Éditeur du site
              </h3>
            </a>
            <a href="#hosting">
              <h3 className="w-1/3 rounded hover:bg-second-color hover:text-white">
                Hébergement
              </h3>
            </a>
            <a href="#propriety">
              <h3 className="w-1/2 rounded hover:bg-second-color hover:text-white">
                Propriété des contenus
              </h3>
            </a>
            <a href="#data">
              <h3 className="w-1/2 rounded hover:bg-second-color hover:text-white">
                Utilisation des données
              </h3>
            </a>
            <a href="#cookies">
              <h3 className="w-1/3 rounded hover:bg-second-color hover:text-white">
                Cookies
              </h3>
            </a>
            <a href="#goals">
              <h3 className="w-1/2 rounded hover:bg-second-color hover:text-white">
                Objectif du projet
              </h3>
            </a>
            <a href="#contact">
              <h3 className="w-1/3 rounded hover:bg-second-color hover:text-white">
                Contact
              </h3>
            </a>
          </div>
          <div className="md:w-2/4 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mt-5 flex flex-col gap-1">
                <h2 id="editor">Éditeur du site</h2>
                <h3>Le site Sportify a été conçu et développé par :</h3>
                <div className="flex flex-col">
                  <p>
                    <span className="font-medium">Nom :</span> Tazoukanit
                    Salaheddine
                  </p>
                  <p>
                    <span className="font-medium">Adresse :</span> Rue Exemple ,
                    Chamalieres 63400 FR
                  </p>
                  <p>
                    <span className="font-medium">Email : </span>
                    exemple@gmail.com
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-1">
                <h2 id="hosting">Hébergement</h2>
                <h3>Le site Sportify est hébergé par deux platformes :</h3>
                <div className="flex flex-col gap-5 mt-5">
                  <div className="flex flex-col">
                    <p>
                      <span className="font-medium">
                        Nom : O2Switch pour le backend.
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">
                        Adresse : RCS Clermont Ferrand
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">
                        Email : support@o2switch.fr
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      <span className="font-medium">
                        Nom : Netlify pour l'interface utilisateur.
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">
                        Adresse : Delaware , United States
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Email : </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <h2 id="propriety"> Propriété des contenus</h2>
              <p>
                Tous les contenus présents sur Sportify (textes, images, logos,
                etc.) ont été créés dans le cadre du développement de ce projet.
                Ils sont destinés à l'usage personnel et éducatif du site. Toute
                reproduction ou utilisation de ces éléments à d'autres fins
                nécessite une autorisation.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <h2 id="data">Utilisation des données</h2>
              <p>
                Les informations personnelles éventuellement collectées via ce
                site sont destinées à des tests d’inscription et de
                participation aux événements sportifs fictifs dans le cadre de
                ce projet. Ces données ne seront pas utilisées à des fins
                commerciales ni partagées avec des tiers.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <h2 id="cookies">Cookies</h2>
              <p>
                Le site peut utiliser des cookies pour améliorer l’expérience
                utilisateur. Les utilisateurs peuvent désactiver les cookies
                directement via les paramètres de leur navigateur, bien que cela
                puisse affecter certaines fonctionnalités du site.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <h2 id="goals">Objectif du projet</h2>
              <p>
                Sportify est un projet développé dans le cadre d'un examen et ne
                sera pas nécessairement mis en ligne. Il a pour but de démontrer
                des compétences en développement web et en gestion d’événements
                sportifs.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <h2 id="contact">Contact</h2>
              <p>
                Pour toute question concernant ce projet, vous pouvez nous
                contacter à :
              </p>
              <p>
                <span className="font-medium">Email :</span> exemple@gmail.com
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <h2></h2>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default LegalMentions;
