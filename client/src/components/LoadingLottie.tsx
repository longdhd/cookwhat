import { Box } from '@mui/material'
import React from 'react'

import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import lottieJson from '../assets/lottie/loading.json'

export default function LoadingLottie() {
    return (
        <Box sx={{
            postion: 'relative',
            display: 'flex',
            height: 'fit-content',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexGrow: 1
        }}>
            <Box sx={{
                postion: 'absolute'
            }}>
                <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    style={{ width: 480, height: 480 }}
                />
            </Box>
        </Box>)
}