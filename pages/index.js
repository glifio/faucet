import styled from 'styled-components'
import Main from '../components/Main'
import Footer from '../components/Footer'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1440px;
  margin: auto;
  justify-content: center;
`

export default function Home() {
  return (
    <Layout>
      <Main />
      <Footer />
    </Layout>
  )
}
