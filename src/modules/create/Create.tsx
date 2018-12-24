import React from 'react'
import axios from 'axios'

import MainView from './MainView'
import Menu from './Menu'
import Sidebar from './Sidebar'
import { pageContainer } from '../../containers/PageContainer-x'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
class Create extends React.Component {
    state = {
        request: '',
        data: '',
        type: 'POST',
        result: ''
    }
    componentDidMount() {
        const query = new URLSearchParams(location.search)
        const shop = query.get('shop')
        if (shop) {
            pageContainer.setState({ shop })
        }

    }

    handleChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <Menu />
                        <MainView />
             <ToastContainer/>
                    </main>

                  
                </div>
            </div>
        )
    }
}
export default Create 