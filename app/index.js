import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Popular from './components/Popular'
import Battle from './components/Battle'

//Components
//-State
//-Lifecycle
//-UI

class App extends React.Component{
    render(){
        return (
            <div className='container'>
                <Battle />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,//React Element
    document.getElementById('app')//Where to render the element to
)