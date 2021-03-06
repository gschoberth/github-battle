import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Popular from './components/Popular'
import Battle from './components/Battle'

import { ThemeProvider } from './contexts/theme'

//Components
//-State
//-Lifecycle
//-UI

class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            theme: 'light',
            themeToggle: () =>{
                this.setState(({theme}) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }

    render(){
        return (
            <ThemeProvider value ={this.state}>
                <div className='container'>
                    <Battle />
                </div>
            </ThemeProvider>
        )
    }
}

ReactDOM.render(
    <App />,//React Element
    document.getElementById('app')//Where to render the element to
)