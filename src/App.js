import React, {Component} from 'react';
import GlobalStyle from './styles/global'
import { Container, Content } from './styles'

class App extends Component {
  render() {
    return <Container>
              <Content>
                Teste de conteúdo de componente
              </Content>
              <GlobalStyle />
           </Container>
  }
}

export default App;
