import Header from "../../components/header/Header";
import "./About.css";

const About = () => {
  return (
    <>
      <Header />
      {/* images */}
      <div className="flex m-5 justify-center items-center">
        <div className="flex justify-center">
          <div className="flex flex-col md:w-11/12 justify-center">
            <div className="general-block flex w-full">
              <div className="flex flex-col md:w-1/2">
                <h2 className="font-semibold">À Propos de Sportify</h2>
                <p className="text-third-color opacity-70 italic">
                  Sportify est une application conçue pour tous les passionnés
                  de sport qui aiment pratiquer en groupe, mais qui n'ont pas
                  forcément des amis ou des proches disponibles pour chaque
                  match ou événement sportif. L'application permet de trouver
                  facilement des partenaires de jeu, organiser des rencontres et
                  participer à des événements sportifs de manière simple et
                  rapide, tout en favorisant une expérience conviviale et
                  fluide. <br />
                </p>
              </div>
              <div className="about md:w-1/3">
                <img
                  src="/src/assets/images/close-up-athlete-running.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="font-semibold">
                Pourquoi Sportify est née ? <br />
              </h2>
              <p className="text-third-color opacity-70 italic">
                L'idée de Sportify est née d'un constat simple, mais récurrent :
                organiser un match de football entre amis ou trouver des
                partenaires pour tout autre sport peut devenir un véritable
                casse-tête. Très souvent, il faut contacter individuellement
                chaque personne, vérifier leurs disponibilités, et même une fois
                l'équipe formée, des imprévus peuvent survenir à la dernière
                minute. Cela conduit à des équipes déséquilibrées, obligeant à
                chercher des remplaçants en urgence, et rendant l'organisation
                stressante et peu efficace. C'est suite à ces difficultés
                personnelles que l'idée de créer Sportify a émergé. En tant
                qu'amateur de football, il m'est souvent arrivé de vouloir
                organiser un match, mais de me retrouver face à des
                complications pour réunir assez de joueurs ou équilibrer les
                équipes. Je me suis dit qu'il devait exister une solution plus
                simple et pratique pour permettre à tous les amateurs de sport
                de s'organiser facilement et de trouver des partenaires
                rapidement, sans avoir à gérer manuellement toute la logistique.{" "}
                <br />
              </p>
            </div>
            <div className="mt-2">
              <h2 className="font-semibold">
                Notre Mission <br />
              </h2>
              <p className="text-third-color opacity-70 italic">
                L'objectif de Sportify est de faciliter la vie des sportifs en
                leur offrant une plateforme dédiée où ils peuvent non seulement
                créer ou rejoindre des événements sportifs, mais aussi entrer en
                contact avec d'autres personnes partageant la même passion pour
                le sport. Que vous soyez un footballeur, un basketteur, un
                joueur de tennis ou d’un autre sport, l'application vous permet
                de trouver rapidement des partenaires disponibles et motivés,
                afin que vous puissiez vous concentrer sur ce qui compte
                vraiment : jouer et profiter du moment. <br />
              </p>
            </div>
            <div className="mt-2">
              <h2 className="font-semibold">
                Une Communauté de Sportifs <br />
              </h2>
              <p className="text-third-color opacity-70 italic">
                Au-delà de l'organisation, Sportify se veut être une véritable
                communauté de sportifs. Que vous soyez un athlète confirmé ou un
                simple amateur, l'application vous permet de rencontrer d'autres
                personnes qui partagent vos intérêts, de tisser des liens, et de
                participer à des événements, qu'ils soient compétitifs ou
                simplement pour le plaisir. Chaque utilisateur peut créer ou
                rejoindre des événements, échanger via la messagerie interne, et
                organiser des matchs équilibrés en toute simplicité. <br />
              </p>
            </div>
            <div className="mt-2">
              <h2 className="font-semibold">
                Un Concept Innovant <br />
              </h2>
              <p className="text-third-color opacity-70 italic">
                Sportify se distingue par son concept novateur. En centralisant
                la création d'événements sportifs, la recherche de partenaires,
                et la gestion des communications, l'application offre une
                expérience complète et intuitive. Que vous souhaitiez simplement
                jouer au foot après le travail ou organiser une compétition plus
                structurée, Sportify vous fournit tous les outils nécessaires
                pour le faire de manière simple et efficace. <br />
              </p>
            </div>
            <div className="mt-2">
              <h2 className="font-semibold">
                En Résumé <br />
              </h2>
              <p className="text-third-color opacity-70 italic">
                Sportify est l'application idéale pour tous ceux qui aiment
                pratiquer le sport en groupe, mais qui ont besoin de partenaires
                ou d'une solution pour simplifier l'organisation de leurs
                événements. Notre mission est de permettre à chaque utilisateur
                de vivre pleinement sa passion sportive, sans les tracas liés à
                la logistique ou à la recherche de coéquipiers. Avec Sportify,
                vous n'avez plus besoin de vous soucier de savoir qui est
                disponible : il vous suffit de créer ou de rejoindre un
                événement, et de commencer à jouer. Rejoignez la communauté
                Sportify et vivez le sport autrement, en toute convivialité et
                simplicité !
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
