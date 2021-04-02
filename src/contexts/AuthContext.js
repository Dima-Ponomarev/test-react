import React, { Component } from 'react'

const AuthContext = React.createContext()

class AuthContext extends Component {

    render() {
        return (
            <AuthContext.Provider>
            </AuthContext.Provider>
        )
    }
}

export default AuthContext
