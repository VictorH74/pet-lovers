const Settings = () => (<h1>Redirecting</h1>)

export function getServerSideProps() {
    return {
        redirect: {
            destination: "settings/user",
            permanent: true
        } 
    }
}

export default Settings;