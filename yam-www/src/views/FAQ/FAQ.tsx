import React from 'react'
import styled from 'styled-components'

import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

const FAQ: React.FC = () => {
  return (
    <Page>
      <PageHeader icon="❓" title="About Us" />
      <Container>
        <Card>
          <CardContent>
            <p>Fishing Pool is not another 'food meme' yield farming as you knew before. What we are trying to achieve is to build a vivid ERC-721 non-fungible token collectible swap DEX where buyers and sellers are able to exchange or even stake collectibles for more token rewards. The FISH you can can be spent just like other cryptos, but can also be put together to breed (or mint) a unique ERC-721 FISH collectible which is essentially a 'FISH miner' and will be available on other NFT marketplaces like Opensea. Join today and good fishing!</p>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}

const StyledHeading = styled.h2`
  margin-bottom: 0;
  margin-top: ${props => props.theme.spacing[5]}px;;
`
const StyledList = styled.ul`
  margin: 0;
  padding: 0 ${props => props.theme.spacing[6]}px;;
`
const StyledListItem = styled.li`
  margin-top: ${props => props.theme.spacing[3]}px;
`

const StyledText = styled.p`
  font-style: italic;
  line-height: 2;
  text-indent: ${props => props.theme.spacing[4]}px;
`

export default FAQ