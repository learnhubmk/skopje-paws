import StepsCard from './StepsCard'
import Image from 'next/image';
import Paw from "/public/paw.svg";
import PawTwo from "/public/paw2.svg";



const Steps = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-16 justify-items-center lg:justify-items-end'>
            <div className='col-span-1'>
                <h2 className='text-black font-bold text-3xl lg:text-4xl mb-5 lg:text-left text-center sm:text-center'>Чекори до успешни прошетки</h2>
                <p className='text-black font-medium text-xl lg:text-xl lg:text-left text-center sm:text-center'>Прочитајте како да постигнете успешни прошетки за вашиот миленик. Ние занеме дека секој миленик си е свој на негов начин, сите се со различен карактер.
                    Па затоа закажете термин за да дознаете каква радост го чека</p>
            </div>
            <div className=" grid md:grid grid-cols-1 sm:grid-cols-2 gap-10 sm:flex sm:flex-col">
                <StepsCard
                    title="Закажување"
                    description="Закажи бесплатен термин за запознавање со вашето милениче"
                    color="cream"
                    image={
                        <Image
                            alt="paw"
                            src={Paw}
                        />}
                />
                <StepsCard
                    title="Прва средба"
                    description="На првата средба сикутираме за вашето милениче предности и мани и се договараме за цена"
                    color="orange"
                    image={
                        <Image
                            alt="paw"
                            src={PawTwo}
                        />}
                />
                <StepsCard
                    title="Први прошетки"
                    description="Првите прошетки се најбитните за да се формира „врската“ помеѓу кучето и тој што го шета"
                    color="cream"
                    image={
                        <Image
                            alt="paw"
                            src={Paw}
                        />}
                />
                <StepsCard
                    title="Среќа секој ден"
                    description="Вашето милениче со нетрпение и радост ќе го чека својот термин за прошетка секој ден"
                    color="orange"
                    image={
                        <Image
                            alt="paw"
                            src={PawTwo}
                        />}
                />
            </div>
        </div>
    );
};

export default Steps