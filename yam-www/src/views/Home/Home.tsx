import React, { useCallback, useEffect, useState }  from 'react'
import styled from 'styled-components'

import farmer from '../../assets/img/fishing.png'
import fish from '../../assets/img/fish.png'

import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import Balances from './components/Balances'

import ReactDOM from 'react-dom';
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';

const Home: React.FC = () => {

  // const renderer = (countdownProps: CountdownRenderProps) => {
  //   const { hours, minutes, seconds } = countdownProps
  //   const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
  //   const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
  //   const paddedHours = hours < 10 ? `0${hours}` : hours
  //   return (
  //     <span style={{ width: '100%' }}>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
  //   )
  // }
  return (
    <Page>
      <PageHeader
        icon={<img src={fish} height="96" />}
        subtitle="The fishing season is coming! Your assets are secured here."
        title="Welcome"
      />
 
      
  <Countdown date={Date.now() + 70000000} />
  Until the fishing contest starts!
  
      <Spacer size="lg" />
        <div style={{
          margin: '0 auto'
        }}>

          <Button
            size="sm"
            text="Go to the Pool"
            to="/farms"
            variant="secondary"
           />
        </div>
    </Page>
  )
}

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledLink = styled.a`
  font-weight: 700l
  text-decoration: none;
  color: ${props => props.theme.color.primary.main};
`

export default Home