
const optionClassName = "text-custom-gray border-[1px] border-custom-emerald rounded-3xl px-5 py-1 cursor-pointer"

const PetFilterBar = () => {
    return (
        <div className=" flex flex-wrap w-fit gap-3 m-auto my-4 justify-center">
            <p className={optionClassName}>TODOS</p>
            <p className={optionClassName}>MENOR PREÇO</p>
            <p className={optionClassName}>IDADE</p>
            <p className={optionClassName}>TIPO DE ANIMAL</p>
            <p className={optionClassName}>RAÇA</p>
        </div>
    )
}

export default PetFilterBar