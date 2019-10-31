import { Container } from 'unstated-x'


interface State  {
    user: any
}

class UserContainer extends Container<State> {
    state = {
        user: null
    }
}

const userContainer = new UserContainer()

export default userContainer