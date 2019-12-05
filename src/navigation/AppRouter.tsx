
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router-dom'
import Login from '@/Pages/Login'
import AddPodcast from '@/Pages/AddPodcast'
import { useUser } from '@/store/user/hooks'
import { ReactComponent } from '*.svg'



const PrivateRoute: React.FC<{
    component: React.ComponentType<any>,
    [prop: string]: any
}> = ({ component, ...rest }) => {
    const user = useUser()
    return <Route {...rest} render={props => {
        const Component = component;
        // return user ? <Component {...props} /> : <Redirect to={'/login'} />
        return <Component {...props} />
    }} />
}



export const AppRouterContext: React.Context<{}> & {
    ref?: any
} = React.createContext<{}>({});


class RouterContext extends React.Component{

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

    return (
        <Router>
            <RouterContext>
                <Switch>
                    <Route path={'/login'} component={Login} />
                    <PrivateRoute path={'/'} component={AddPodcast} />
                </Switch>
            </RouterContext>
        </Router>
    )

}


export default AppRouter
