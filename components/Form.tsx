const Form = () => {
  return (
    <form
      className={`flex flex-col justify-between items-center h-full w-full text-white mt-10`}
    >
      Contact us to book a slot
      <input className={`mt-2 mb-2`} />
      <input className={`mt-2 mb-2`} />
      <input className={`mt-2 mb-2`} />
      <input className={`mt-2 mb-2`} />
      <button
        type="submit"
        className={`text-orange rounded bg-black pt-2 pb-2 pl-2 pr-2`}
      >
        Paw us
      </button>
    </form>
  );
};
export default Form;
