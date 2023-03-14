import React from "react"
import Header from "../Header"

const Layout: React.FC<{ children: JSX.Element }> = ({children}) => {
    return (
        <>
        <Header />
        {children}
        footer
        </>
    )
}

export default Layout