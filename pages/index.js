import styled from 'styled-components'
import Main from '../components/Main'
import Education from '../components/Education'
import Footer from '../components/Footer'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export default function Home() {
  return (
    <Layout>
      <Main />
      <Education />
      <Footer />
    </Layout>
  )
}
