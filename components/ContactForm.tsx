"use client"

import {FormEvent} from "react";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from "react-google-recaptcha-v3";

const FormComponent = () => {
    const {executeRecaptcha} = useGoogleReCaptcha();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            console.log("Not available to execute reCAPTCHA");
            return;
        }

        const gRecaptchaToken = await executeRecaptcha("formSubmit");

        await fetch("/api/recaptcha", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({gRecaptchaToken}),
        }).catch(error => {
            console.error("Error submitting form", error)
        })
    };

    return (
        <div id={"contact"} className="pt-10">
            <form className="bg-orange rounded-3xl p-5 flex flex-col shadow-xl w-full h-full"
                  onSubmit={handleSubmit}>
                <h2 className="lg:text-3xl md:text-2xl font-extrabold mb-4 ">Контактирајте нѐ!</h2>
                <div className="flex flex-col lg:flex-row justify-between mb-6">
                    <input
                        type="text"
                        className="rounded-xl mb-3 lg:mb-0 lg:mr-3 p-5 w-full lg:w-1/3 border-black border shadow-xl placeholder-black focus:outline-none"
                        placeholder="Име и презиме"
                        required
                    />
                    <input
                        type="tel"
                        className="rounded-xl mb-3 lg:mb-0 lg:mr-3 p-5 w-full lg:w-1/3 border-black border shadow-xl placeholder-black  focus:outline-none"
                        placeholder="Телефонски број"
                        required
                    />
                    <input
                        type="text"
                        className="rounded-xl p-5 w-full lg:w-1/3 border-black border shadow-xl placeholder-black focus:outline-none"
                        placeholder="Наслов на порака"
                        required
                    />
                </div>
                <div className="mb-6 flex flex-col lg:flex-row h-full">
                    <textarea
                        className="rounded-xl p-5 w-full h-32 border-black border shadow-xl placeholder-black focus:outline-none mb-3 lg:mb-0"
                        placeholder="Вашата порака"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="rounded-xl bg-white p-3 w-full lg:w-1/3 shadow-xl">
                        Испратете
                    </button>
                </div>
            </form>
        </div>
    );
};

const ContactForm = () => {
    const recaptchaKey: string | undefined = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    return (
        <div className="flex flex-col h-full w-full mt-10 px-6 md:px-24 text-black">
            <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
                <FormComponent/>
            </GoogleReCaptchaProvider>
        </div>
    );
};

export default ContactForm;