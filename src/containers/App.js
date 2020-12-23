import { Router, Route } from 'react-router-dom'

import { history } from '../helpers/history'

import { NewTodo } from '../containers/NewTodo'
import { TodoList } from '../containers/TodoList'

function App() {
  return (
    <div className="App">
      <div id="wrapper">
        <Router history={history}>
          <Route component={TodoList} path="/" exact/>
          <Route component={NewTodo} path="/new" />
        </Router>
      </div>
    </div>
  );
}

export default App;
