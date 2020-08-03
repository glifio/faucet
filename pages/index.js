import styled from 'styled-components'
import Main from '../components/Main'
import Footer from '../components/Footer'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`

export default function Home() {
  return (
    <Layout>
      <Main />
      <Footer />
    </Layout>
  )
}
