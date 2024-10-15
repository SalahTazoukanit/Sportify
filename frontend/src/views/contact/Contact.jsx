import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import Swal from "sweetalert2";

const Contact = () => {
  const sendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const access_key = "0135bf93-67dc-4549-b873-5efb9dc01c77";

    formData.append("access_key", access_key);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Envoyé",
        text: "Message envoyé avec succès.",
        icon: "success",
      });
    }
  };
  return (
    <>
      <Header />
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <div className="general-block shadow-custom rounded-md bg-white">
            <form
              onSubmit={sendMessage}
              className="flex flex-col md:flex-row justify-center p-10 max-sm:gap-10"
            >
              <div className="md:w-1/2 flex flex-col gap-5 md:gap-10">
                <h2 className="text-gray-800 text-3xl font-extrabold">
                  Parlons-en
                </h2>
                <p className="text-sm text-gray-500 w-11/12">
                  Vous avez une question ou un sport à ajouter ? N'hésitez pas à
                  nous contacter, nous serions ravis d'en entendre parler et de
                  vous apporter notre aide.
                </p>
                <div className="mt-3">
                  <h2 className="text-gray-800 text-base font-bold">Email</h2>
                  <ul className="mt-4">
                    <li className="flex items-center">
                      <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="#007bff"
                          viewBox="0 0 479.058 479.058"
                        >
                          <path
                            d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                            data-original="#000000"
                          />
                        </svg>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="text-third-color text-sm ml-4"
                      >
                        <small className="block">Mail</small>
                        <strong>info@example.com</strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col gap-5">
                <div>
                  <label htmlFor=""></label>
                  <input
                    placeholder="Nom"
                    className="input-text border"
                    type="text"
                    name="name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor=""></label>
                  <input
                    placeholder="Votre mail"
                    className="input-text border"
                    type="email"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor=""></label>
                  <input
                    placeholder="Objet"
                    className="input-text border"
                    type="text"
                    name="objet"
                    required
                  />
                </div>
                <div>
                  <label htmlFor=""></label>
                  <textarea
                    placeholder="Message"
                    className="w-full h-48 rounded border py-3 px-4"
                    id=""
                    name="message"
                    required
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <input id="check" type="checkbox" name="check" required />
                  <label htmlFor="check">
                    J'ai lu et j'accepte la politique de confidentialité
                  </label>
                </div>
                <div
                  className="bg-third-color h-8 rounded-md text-white flex justify-center items-center"
                  type="submit"
                >
                  <button className="w-full" type="submit">
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
