
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router-dom'
import Login from '@/Pages/Login'
import AddPodcast from '@/Pages/AddPodcast'
import { useUser } from '@/store/user/hooks'
import PodcastList from '@/Pages/PodcastList'
import { useEffectOnce } from 'react-use'
import { getPodcasts } from '@/store/podcast/functions'
import { getUser } from '@/store/user/functions'
import UserList from '@/Pages/UserList'
import Test from '@/Pages/Test'


const PrivateRoute: React.FC<{
    component: React.ComponentType<any>,
    [prop: string]: any
}> = ({ component, ...rest }) => {
    const user = useUser()
    return <Route {...rest} render={props => {
        const Component = component;

        console.log(user && (user.role === 'admin' || user.role === 'root'), user)
        return user && (user.role === 'admin' || user.role === 'root') ? <Component {...props} /> : <Redirect to={'/login'} />
        return <Component {...props} />
    }} />
}


const RootRoute: React.FC<{
    component: React.ComponentType<any>,
    [prop: string]: any
}> = ({ component, ...rest }) => {
    const user = useUser()
    return <Route {...rest} render={props => {
        const Component = component;
        if (user) {
            console.log('check user', user.role, user)
        }

        return (user && user.role !== 'root') ? <Redirect to={'/login'} /> : <Component {...props} />
        // return <Component {...props} />
    }} />
}



export const AppRouterContext: React.Context<{}> & {
    ref?: any
} = React.createContext<{}>({});


class RouterContext extends React.Component {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {};
        AppRouterContext.ref = this;
    }

    // noinspection JSUnusedGlobalSymbols
    static getDerivedStateFromProps(props: any) {
        return props;
    }

    render() {
        return <AppRouterContext.Provider value={this.state}>
            {this.props.children}
        </AppRouterContext.Provider>;
    }
}

//@ts-ignore
RouterContext = withRouter(RouterContext);

AppRouterContext.ref = RouterContext

window.router = AppRouterContext

const AppRouter = () => {

    const [isFullyLoaded, setFullyLoaded] = useState(false)

    useEffectOnce(() => {
        (async () => {
            await getPodcasts()
            await getUser()



            await setFullyLoaded(true)
        })()
    })

    return (
        <Router>
            <RouterContext>
                {
                    isFullyLoaded ?
                        // <div>Test</div>
                        <Switch>
                            <Route path={'/login'} component={Login} />
                            <Route path={'/add'} component={AddPodcast} />
                            <Route path={'/userlist'} component={UserList} />
                            <Route path={'/test'} component={Test} />
                            <Route path={'/'} component={PodcastList} />
                        </Switch>
                        : <div></div>
                }

            </RouterContext>
        </Router>
    )

}


export default AppRouter
