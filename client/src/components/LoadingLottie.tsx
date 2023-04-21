import { Box } from '@mui/material'
import React from 'react'

import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import lottieJson from '../assets/lottie/data.json'

export default function LoadingLottie() {
    return (
        <Box sx={{
            postion: 'relative',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                postion: 'absolute'
            }}>
                <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    style={{ width: 300, height: 300 }}
                />
            </Box>
        </Box>)
}