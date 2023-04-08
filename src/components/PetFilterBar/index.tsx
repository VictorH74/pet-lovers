
const optionClassName = "text-custom-gray border-[1px] border-custom-emerald rounded-3xl px-5 py-1 cursor-pointer"

const PetFilterBar = () => {
    return (
        <div className=" flex flex-wrap w-fit gap-3 m-auto my-4 justify-center">
            <p className={optionClassName}>TODOS</p>
            <p className={optionClassName}>PREÇO</p>
            <p className={optionClassName}>PESQUISAR</p>
            <p className={optionClassName}>ESPÉCIE</p>
        </div>
    )
}

export default PetFilterBar