import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { yam as yamAddress } from '../../constants/tokenAddresses'
import useYam from '../../hooks/useYam'

import { bnToDec } from '../../utils'
import { getPoolContracts, getEarned } from '../../yamUtils'

import Context from './context'
import { Farm } from './types'

import tinyfish from '../../assets/img/tinyfish.jpg'
import fishing from '../../assets/img/fishing.png'
import shrimp from '../../assets/img/shrimp.jpeg'
import shark from '../../assets/img/shark.jpeg'

const NAME_FOR_POOL: { [key: string]: string } = {
  ycrv_pool: 'Seed Pool',
  ampl_pool: 'Fish Pond',
  eth_pool: 'Shrimp Buffet',
  yfi_pool: 'Shark Tank',
}

const ICON_FOR_POOL: { [key: string]: string } = {
  ycrv_pool: '🐟',
  ampl_pool: '🎣',
  eth_pool: '🦐',
  yfi_pool: '🦈',
}

const SORT_FOR_POOL: { [key: string]: number } = {
  ycrv_pool: 4,
  ampl_pool: 3,
  eth_pool: 2,
  yfi_pool: 1,
}

const Farms: React.FC = ({ children }) => {

  const [farms, setFarms] = useState<Farm[]>([])
  const [unharvested, setUnharvested] = useState(0)
  
  const yam = useYam()
  const { account } = useWallet()

  const fetchPools = useCallback(async () => {
    const pools: { [key: string]: Contract} = await getPoolContracts(yam)
    const farmsArr: Farm[] = []
    const poolKeys = Object.keys(pools)

    for (let i = 0; i < 4; i++) {
      const poolKey = poolKeys[i]
      const pool = pools[poolKey]
      console.log(pool);
      let tokenKey = poolKey.replace('_pool', '')
      if (tokenKey === 'ampl') {
        tokenKey = 'fish_eth_univ2_lp'
      } else if (tokenKey === 'ycrv') {
        tokenKey = 'usdt'
      } else if (tokenKey === 'yfi') {
      tokenKey = 'shirmp_eth_univ2_lp'
      } else if (tokenKey === 'eth') {
        tokenKey = 'usdc_eth_univ2_lp'
      }

      const method = pool.methods[tokenKey]
      try {
        let tokenAddress = ''
        if (method) {
          tokenAddress = await method().call()
        } else if (tokenKey === 'ycrv_yam_uni_lp') {
          tokenAddress = '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8'
        }
        farmsArr.push({
          contract: pool,
          name: NAME_FOR_POOL[poolKey],
          depositToken: tokenKey,
          depositTokenAddress: tokenAddress,
          earnToken: 'FISH',
          earnTokenAddress: yamAddress,
          icon: ICON_FOR_POOL[poolKey],
          id: tokenKey,
          sort: SORT_FOR_POOL[poolKey]
        })
      } catch (e) {
        console.log(e)
      }
    }
    farmsArr.sort((a, b) => a.sort < b.sort ? 1 : -1)
    setFarms(farmsArr)
  }, [yam, setFarms])

  useEffect(() => {
    if (yam) {
      fetchPools()
    }
  }, [yam, fetchPools])

  useEffect(() => {
    async function fetchUnharvested () {
      const unharvestedBalances = await Promise.all(farms.map(async (farm: Farm) => {
        const earnings = await getEarned(yam, farm.contract, account)
        return bnToDec(earnings)
      }))
      const totalBal = unharvestedBalances.reduce((acc, val) => acc + val)
      setUnharvested(totalBal)
    }
    if (account && farms.length && yam) {
      fetchUnharvested()
    }
  }, [account, farms, setUnharvested, yam])
  
  return (
    <Context.Provider value={{
      farms,
      unharvested,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Farms