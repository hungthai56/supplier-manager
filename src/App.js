
import { Provider } from 'react-redux';
import MainRouter from 'router/MainRouter';
import initStore from './redux/store';

const store = initStore()
function App (props) {
    return (
        <Provider store={store}>
            <MainRouter />
        </Provider>
    )
}

export default App
