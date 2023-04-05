import { sessionOptions } from "@/lib/session";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { User } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext } from "next";

const data = [
  {label: "Nome", value: "name"},
  {label: "Email", value: "email"},
  {label: "Telefone", value: "phone"},
  {label: "Criado Em", value: "createdAt"},
];

const UserSettings = ({ user }: { user: User }) => {
  const setData = () => alert("Em desenvolvimento");
  const deleteAccount = () => alert("Em desenvolvimento");

  return (
    <main>
      <div className=" bg-custom-blue w-[1146px] p-10 m-auto mt-12 rounded-xl">
        <div className="flex gap-4 items-center h-[200px]">
          <AccountCircleIcon sx={{ color: "white", fontSize: 90 }} />
          <div className="bg-white w-[2px] h-[100%]" />
          <div className="grid gap-4">
            {data.map((d) => (
              <p key={d.label} className="text-white">
                {`${d.label}: ${user[d.value as keyof typeof user] || "-"}`}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={setData}
          className="bg-custom-blue text-white px-8 py-3 rounded-md mx-2 uppercase"
        >
          Editar dados
        </button>
        <button
          onClick={deleteAccount}
          className="bg-custom-red text-white px-8 py-3 rounded-md mx-2 uppercase"
        >
          Excluir conta
        </button>
      </div>
    </main>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}: GetServerSidePropsContext) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);

export default UserSettings;
