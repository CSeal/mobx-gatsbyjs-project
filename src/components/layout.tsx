import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'
import 'typeface-work-sans'
import theme from '../../config/theme'
import reset from '../styles/reset'
import SEO from './SEO'
import MainHeader from './mainHeader'
import { UserLoginSignupModal } from './user-login-signup'

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: white;
    background-color: #f6993f;
  }
  html {
    box-sizing: border-box;
    border: 0;
    margin: 0;

    h1, h2, h3, h4, h5, h6 {
      font-weight: ${theme.fontWeights.bold};
    }
    
    h1 {
      font-size: ${theme.fontSizes[5]};
    }
    h2 {
      font-size: ${theme.fontSizes[4]};
    }
    h3 {
      font-size: ${theme.fontSizes[3]};
    }
    h4 {
      font-size: ${theme.fontSizes[2]};
    }
    h5 {
      font-size: ${theme.fontSizes[1]};
    }
    h6 {
      font-size: ${theme.fontSizes[0]};
    }
    
    @media (max-width: 600px) {
      font-size: 16px;
      
      h1 {
        font-size: ${theme.fontSizes[4]};
      }
      h2 {
        font-size: ${theme.fontSizes[3]};
      }
      h3 {
        font-size: ${theme.fontSizes[2]};
      }
      h4 {
        font-size: ${theme.fontSizes[1]};
      }
      h5 {
        font-size: ${theme.fontSizes[0]};
      }
      h6 {
        font-size: ${theme.fontSizes[0]};
      }
    }
  }
  #___gatsby {
    min-height: 100vh;
  }
  #___gatsby > div {
    min-height: 100vh;
  }
  body {
    border: 0;
    margin: 0;
    padding: 0;
    color: black;
    font-family: 'Open Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: ${theme.colors.white};
    font-size: 18px;
    min-width: 320px;
  }
  a {
    transition: all 0.3s ease-in-out;
    color: black;
    text-decoration: underline;
    &:hover,
    &:focus {
      color: ${theme.colors.mfuschia};
    }
  }
  
  ${reset}
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Footer = styled(Menu)`
  &&& {
    background-color: ${props => props.theme.colors.mlightgrey};
  }
`

const MainContent = styled.div`
  flex: 1 0 auto;
`

type LayoutProps = { children: React.ReactNode; activeUri: string } & typeof defaultProps

const defaultProps = {
  seotitle: 'Merchacha',
}

const Layout = ({ children, seotitle, activeUri }: LayoutProps) => (
  <ThemeProvider theme={theme}>
    <PageWrapper>
      <SEO title={seotitle} />
      <GlobalStyles />
      <MainHeader activeUri={activeUri} />
      <MainContent>{children}</MainContent>
      <Footer attached="bottom" borderless>
        <Menu.Item disabled>&copy; Merchacha Inc.</Menu.Item>
        <Menu.Item href="#">Terms</Menu.Item>
        <Menu.Item href="#">Privacy</Menu.Item>
      </Footer>
    </PageWrapper>
    <UserLoginSignupModal />
  </ThemeProvider>
)

Layout.defaultProps = defaultProps

export default Layout
