import Image from "next/image";

const Form = () => {
  return (
    <div className="flex flex-col h-full w-full mt-10 pl-24 pr-24 text-black">
      <div className="bg-form rounded-3xl p-5 flex-col flex shadow-xl">
        <h2 className="text-3xl font-extrabold mb-4">Контактирајте нѐ!</h2>
        <p className="mb-6">Поставете прашање или она што Ве интересира</p>
        <div className="flex justify-between mb-6">
          <input
            type="text"
            className="rounded-xl mr-3 p-5 w-1/3 border bg-form placeholder-gray"
            placeholder="Име и презиме"
            required
          />
          <input
            type="tel"
            className="rounded-xl mr-3 p-5 w-1/3 border bg-form placeholder-gray"
            placeholder="Телефонски број"
            required
          />
          <input
            type="text"
            className="rounded-xl p-5 w-1/3 border bg-form placeholder-gray"
            placeholder="Наслов на порака"
            required
          />
        </div>
        <div className="mb-6 flex">
          <textarea
            className="rounded-xl p-5 w-2/3 h-70 bg-form border placeholder-gray"
            placeholder="Вашата порака"
            required
          ></textarea>
          <div className="p-3 w-1/3 h-full flex ">
         
            <Image
             src="/Form images/Rectangle 22.png"
              alt="Dog picture"
              width={500}
              height={500}
            ></Image>
             <Image
             src="/Form images/Rectangle 23.png"
              alt="Dog picture"
              width={500}
              height={500}
            ></Image>
          </div>
        </div>
        <form className="flex flex-col justify-between items-start h-full w-full">
          <button
            type="submit"
            className="rounded-xl bg-white p-3 w-1/3 shadow-xl"
          >
            Испратете
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
