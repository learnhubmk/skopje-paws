import Image from "next/image";
import DogImage from "../public/Form images/dog_form.png";
import CatImage from "../public/Form images/cat_form.png";

const Form = () => {
  return (
    <div className="flex flex-col h-full w-full mt-10 px-6 md:px-24 text-black">
      <div className="bg-orange rounded-3xl p-5 flex flex-col shadow-xl">
        <h2 className="text-3xl font-extrabold mb-4">Контактирајте нѐ!</h2>
        <p className="mb-6">Поставете прашање или она што Ве интересира</p>
        <div className="flex flex-col lg:flex-row justify-between mb-6">
          <input
            type="text"
            className="rounded-xl mb-3 lg:mb-0 lg:mr-3 p-5 w-full lg:w-1/3 border bg-orange placeholder-grey focus:outline-none"
            placeholder="Име и презиме"
            required
          />
          <input
            type="tel"
            className="rounded-xl mb-3 lg:mb-0 lg:mr-3 p-5 w-full lg:w-1/3 border bg-orange placeholder-grey focus:outline-none"
            placeholder="Телефонски број"
            required
          />
          <input
            type="text"
            className="rounded-xl p-5 w-full lg:w-1/3 border bg-orange placeholder-grey focus:outline-none"
            placeholder="Наслов на порака"
            required
          />
        </div>
        <div className="mb-6 flex flex-col lg:flex-row  h-full">
          <textarea
            className="rounded-xl p-5 w-full lg:w-2/3 h-60 bg-orange border placeholder-grey focus:outline-none mb-3 lg:mb-0"
            placeholder="Вашата порака"
            required
          ></textarea>
          <div className="p-3 w-full lg:w-1/3 h-full flex flex-col md:flex-row justify-center items-center">
            <Image src={DogImage} alt="Dog image"></Image>
            <Image src={CatImage} alt="Cat image"></Image>
          </div>
        </div>
        <form className="flex flex-col justify-between items-start h-full w-full">
          <button
            type="submit"
            className="rounded-xl bg-white p-3 w-full lg:w-1/3 shadow-xl"
          >
            Испратете
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
