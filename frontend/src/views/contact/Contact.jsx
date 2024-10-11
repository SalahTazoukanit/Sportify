import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="general-block flex justify-center mt-20">
        <div className="flex w-2/3 flex-col md:flex-row justify-center gap-10 mt-24 mb-24">
          <div className="border md:w-1/2 flex flex-col justify-center items-center p-5 md:p-10 gap-5">
            <div>
              <img
                src="/src/assets/images/telephone.png"
                alt="logo contact"
                className="w-32"
              />
            </div>
            <div>
              <p className="text-center opacity-80">
                N’hésitez pas à nous appeler. Notre équipe se fera un plaisir de
                vous aider et de répondre à toutes vos interrogations.
              </p>
            </div>
            <div>
              <p className="text-blue-900 underline">+33 4 12345678</p>
            </div>
          </div>
          <div className="border md:w-1/2 flex flex-col justify-center items-center p-5 md:p-10 gap-5">
            <div>
              <img
                src="/src/assets/images/chat-icon.png"
                alt="logo message"
                className="w-32"
              />
            </div>
            <div>
              <p className="text-center opacity-80">
                Des questions ou des commentaires ? Envoyez-nous un message .
                Nous serons ravis de vous répondre dans les plus brefs délais !
              </p>
            </div>
            <div>
              <p className="text-blue-900 underline">admins@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
